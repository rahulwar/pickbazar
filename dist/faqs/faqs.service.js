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
exports.FaqsService = void 0;
const common_1 = require("@nestjs/common");
const faqs_json_1 = __importDefault(require("../db/pickbazar/faqs.json"));
const faq_entity_1 = require("./entities/faq.entity");
const class_transformer_1 = require("class-transformer");
const fuse_js_1 = __importDefault(require("fuse.js"));
const paginate_1 = require("../common/pagination/paginate");
const mongoose_1 = require("@nestjs/mongoose");
const faq_1 = require("./schema/faq");
const mongoose_2 = __importDefault(require("mongoose"));
const shop_1 = require("../shops/schema/shop");
const user_1 = require("../users/schema/user");
const faqs = (0, class_transformer_1.plainToClass)(faq_entity_1.Faq, faqs_json_1.default);
const options = {
    keys: ['faq_title'],
    threshold: 0.3,
};
const fuse = new fuse_js_1.default(faqs, options);
let FaqsService = class FaqsService {
    constructor(faqModel) {
        this.faqModel = faqModel;
        this.faqs = faqs;
    }
    async create(createFaqDto) {
        try {
            return await this.faqModel.create(createFaqDto);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async findAllFaqs({ search, limit, page, shop_id }) {
        if (!page)
            page = 1;
        if (!limit)
            limit = 10;
        let query = {};
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        if (shop_id) {
            query['shop_id'] = shop_id;
        }
        if (search) {
            const parseSearchParams = search.split(';');
            for (const searchParam of parseSearchParams) {
                const [key, value] = searchParam.split(':');
                query[key] = value;
            }
        }
        const totalResult = await this.faqModel.countDocuments(query);
        let results = await this.faqModel
            .find(query)
            .populate([
            {
                path: 'shop_id',
                model: shop_1.ShopModel.name,
            },
            { path: 'issued_by', model: user_1.UsersModel.name },
            { path: 'user_id', model: user_1.UsersModel.name },
        ])
            .skip(startIndex)
            .limit(limit);
        if (results.length == 0) {
            results = await this.faqModel
                .find(query)
                .populate([
                {
                    path: 'shop_id',
                    model: shop_1.ShopModel.name,
                },
                { path: 'issued_by', model: user_1.UsersModel.name },
                { path: 'user_id', model: user_1.UsersModel.name },
            ])
                .skip(0)
                .limit(limit);
        }
        const url = `/faqs?search=${search}&limit=${limit}`;
        return Object.assign({ data: results }, (0, paginate_1.paginate)(totalResult, page, limit, results.length, url));
    }
    async getFaq(param, language) {
        const faq = (await this.faqModel.findById(param)).populate([
            {
                path: 'shop_id',
                model: shop_1.ShopModel.name,
            },
            { path: 'issued_by', model: user_1.UsersModel.name },
            { path: 'user_id', model: user_1.UsersModel.name },
        ]);
        if (!faq) {
            throw new Error(`Faq for ${param} not found`);
        }
        return faq;
    }
    async update(id, updateFaqDto) {
        const Faq = await this.faqModel.findById(id);
        if (!Faq) {
            throw new Error(`Faq for ${id} not found`);
        }
        await this.faqModel.updateOne({ _id: id }, { $set: updateFaqDto });
        return await this.faqModel.findById(id).populate([
            {
                path: 'shop_id',
                model: shop_1.ShopModel.name,
            },
            { path: 'issued_by', model: user_1.UsersModel.name },
            { path: 'user_id', model: user_1.UsersModel.name },
        ]);
    }
    async remove(id) {
        return await this.faqModel.deleteOne({ _id: id });
    }
};
FaqsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(faq_1.FaqModel.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], FaqsService);
exports.FaqsService = FaqsService;
//# sourceMappingURL=faqs.service.js.map