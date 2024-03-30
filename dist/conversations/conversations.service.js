"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationsService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const conversations_json_1 = __importDefault(require("../db/pickbazar/conversations.json"));
const fuse_js_1 = __importDefault(require("fuse.js"));
const paginate_1 = require("../common/pagination/paginate");
const conversation_entity_1 = require("./entities/conversation.entity");
const mongoose_1 = require("@nestjs/mongoose");
const conversation_1 = require("./schema/conversation");
const mongoose_2 = __importDefault(require("mongoose"));
const conversations = (0, class_transformer_1.plainToClass)(conversation_entity_1.Conversation, conversations_json_1.default);
const options = {
    keys: ['shop.name'],
    threshold: 0.3,
};
const fuse = new fuse_js_1.default(conversations, options);
let ConversationsService = class ConversationsService {
    constructor(conversationModel) {
        this.conversationModel = conversationModel;
        this.conversations = conversations;
    }
    async create(createConversationDto) {
        return await this.conversationModel.create(createConversationDto);
    }
    async getAllConversations({ page, limit, search }) {
        let query = {};
        let aggregationPipeline = [];
        if (search) {
            const parseSearchParams = search.split(';');
            for (const searchParam of parseSearchParams) {
                const [key, value] = searchParam.split(':');
                if (key === 'shop') {
                    query['shop.name'] = value;
                }
                else if (key === 'user') {
                    query['user.name'] = value;
                }
                else {
                    query[key] = value;
                }
            }
            aggregationPipeline.push({ $match: query });
        }
        aggregationPipeline.push({
            $lookup: {
                from: 'UsersModel',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
            },
        }, {
            $lookup: {
                from: 'ShopModel',
                localField: 'shop',
                foreignField: '_id',
                as: 'shop',
            },
        }, { $unwind: '$user' }, { $unwind: '$shop' }, { $skip: (page - 1) * limit }, { $limit: limit }, {
            $group: {
                _id: null,
                totalItems: { $sum: 1 },
                data: { $push: '$$ROOT' },
            },
        }, {
            $project: {
                _id: 0,
                totalItems: 1,
                data: 1,
            },
        });
        const result = await this.conversationModel.aggregate(aggregationPipeline);
        const conversations = result.length > 0 ? result[0].data : [];
        const totalConversations = result.length > 0 ? result[0].totalItems : 0;
        const url = `/conversations?limit=${limit}`;
        return Object.assign({ data: conversations }, (0, paginate_1.paginate)(totalConversations, page, limit, conversations.length, url));
    }
    async getConversation(param) {
        const conversation = await this.conversationModel.findById(param);
        if (conversation) {
            return conversation;
        }
        return {};
    }
};
ConversationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(conversation_1.ConversationModel.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], ConversationsService);
exports.ConversationsService = ConversationsService;
//# sourceMappingURL=conversations.service.js.map