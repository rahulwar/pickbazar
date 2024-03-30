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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const messages_json_1 = __importDefault(require("../db/pickbazar/messages.json"));
const message_entity_1 = require("./entities/message.entity");
const mongoose_1 = require("@nestjs/mongoose");
const message_1 = require("./schema/message");
const mongoose_2 = __importDefault(require("mongoose"));
const paginate_1 = require("../common/pagination/paginate");
const messages = (0, class_transformer_1.plainToClass)(message_entity_1.Message, messages_json_1.default);
let MessagesService = class MessagesService {
    constructor(messageModel) {
        this.messageModel = messageModel;
        this.messages = messages;
    }
    createMessage(createMessageDto) {
        return this.messageModel.create(createMessageDto);
    }
    async getMessages({ search, limit, page }) {
        let query = {};
        if (search) {
            const parseSearchParams = search.split(';');
            for (const searchParam of parseSearchParams) {
                const [key, value] = searchParam.split(':');
                if (key === 'conversation_id') {
                    query['conversation_id'] = value;
                }
                else {
                    query[key] = value;
                }
            }
        }
        const messages = await this.messageModel
            .find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        const totalMessages = await this.messageModel.countDocuments(query);
        const url = `messages/conversations?limit=${limit}`;
        return Object.assign({ data: messages }, (0, paginate_1.paginate)(totalMessages, page, limit, messages.length, url));
    }
};
MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(message_1.MessageModel.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map