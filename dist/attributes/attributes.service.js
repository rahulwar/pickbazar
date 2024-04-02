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
exports.AttributesService = void 0;
const common_1 = require("@nestjs/common");
const attributes_json_1 = __importDefault(require("../db/pickbazar/attributes.json"));
const attribute_entity_1 = require("./entities/attribute.entity");
const class_transformer_1 = require("class-transformer");
const mongoose_1 = require("@nestjs/mongoose");
const attributes_1 = require("./schema/attributes");
const mongoose_2 = __importDefault(require("mongoose"));
const attributes = (0, class_transformer_1.plainToClass)(attribute_entity_1.Attribute, attributes_json_1.default);
let AttributesService = class AttributesService {
    constructor(attributesModel) {
        this.attributesModel = attributesModel;
        this.attributes = attributes;
    }
    async create(createAttributeDto) {
        return await this.attributesModel.create(createAttributeDto);
    }
    async findAll() {
        return await this.attributesModel.find();
    }
    async findOne(param) {
        let attr = await this.attributesModel.findOne({ slug: param });
        if (!attr) {
            attr = await this.attributesModel.findById(param);
        }
        if (!attr) {
            throw new Error(`Attributes for id ${param} not found`);
        }
        return attr;
    }
    async update(id, updateAttributeDto) {
        await this.attributesModel.updateOne({ _id: id }, { $set: updateAttributeDto });
        return await this.attributesModel.findById(id);
    }
    async remove(id) {
        return await this.attributesModel.deleteOne({ _id: id });
    }
};
AttributesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attributes_1.AttributesModel.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], AttributesService);
exports.AttributesService = AttributesService;
//# sourceMappingURL=attributes.service.js.map