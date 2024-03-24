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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesSchema = exports.TypesModel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attachment_entity_1 = require("../../common/entities/attachment.entity");
const uuid_1 = require("uuid");
const type_entity_1 = require("../entities/type.entity");
let TypesModel = class TypesModel extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ default: uuid_1.v4 }),
    __metadata("design:type", String)
], TypesModel.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TypesModel.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TypesModel.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", attachment_entity_1.Attachment)
], TypesModel.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TypesModel.prototype, "icon", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], TypesModel.prototype, "banners", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], TypesModel.prototype, "promotional_sliders", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", type_entity_1.TypeSettings)
], TypesModel.prototype, "settings", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TypesModel.prototype, "language", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], TypesModel.prototype, "translated_languages", void 0);
TypesModel = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], TypesModel);
exports.TypesModel = TypesModel;
exports.TypesSchema = mongoose_1.SchemaFactory.createForClass(TypesModel);
//# sourceMappingURL=types.js.map