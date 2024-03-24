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
exports.TypesService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const type_entity_1 = require("./entities/type.entity");
const types_json_1 = __importDefault(require("../db/pickbazar/types.json"));
const fuse_js_1 = __importDefault(require("fuse.js"));
const mongoose_1 = require("@nestjs/mongoose");
const types_1 = require("./schema/types");
const mongoose_2 = __importDefault(require("mongoose"));
const types = (0, class_transformer_1.plainToClass)(type_entity_1.Type, types_json_1.default);
const options = {
    keys: ['name'],
    threshold: 0.3,
};
const fuse = new fuse_js_1.default(types, options);
let TypesService = class TypesService {
    constructor(Typesmodel) {
        this.Typesmodel = Typesmodel;
        this.types = types;
    }
    async getTypes({ text, search }) {
        try {
            let query = {};
            if (search) {
                const searchParams = search.split(';');
                for (const searchParam of searchParams) {
                    const [key, value] = searchParam.split(':');
                    query[key] = value;
                }
            }
            const data = await this.Typesmodel.find(query);
            return data;
        }
        catch (error) {
            console.error('Error finding products:', error);
            throw error;
        }
    }
    async getTypeBySlug(slug) {
        return await this.Typesmodel.findOne({ slug: slug });
    }
    async create(createTypeDto) {
        return await this.Typesmodel.create(createTypeDto);
    }
    findAll() {
        return `This action returns all types`;
    }
    findOne(id) {
        return `This action returns a #${id} type`;
    }
    async update(id, updateTypeDto) {
        await this.Typesmodel.updateOne({ id }, { $set: updateTypeDto });
        return this.Typesmodel.findOne({ id });
    }
    async remove(id) {
        return await this.Typesmodel.deleteOne({ id });
    }
};
TypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(types_1.TypesModel.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], TypesService);
exports.TypesService = TypesService;
//# sourceMappingURL=types.service.js.map