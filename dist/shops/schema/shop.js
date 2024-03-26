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
exports.ShopSchema = exports.ShopModel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../../users/entities/user.entity");
const shop_entity_1 = require("../entities/shop.entity");
const attachment_entity_1 = require("../../common/entities/attachment.entity");
const address_entity_1 = require("../../addresses/entities/address.entity");
let ShopModel = class ShopModel extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ShopModel.prototype, "owner_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", user_entity_1.User)
], ShopModel.prototype, "owner", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], ShopModel.prototype, "staffs", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], ShopModel.prototype, "is_active", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ShopModel.prototype, "orders_count", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ShopModel.prototype, "products_count", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", shop_entity_1.Balance)
], ShopModel.prototype, "balance", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ShopModel.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ShopModel.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ShopModel.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", attachment_entity_1.Attachment)
], ShopModel.prototype, "cover_image", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", attachment_entity_1.Attachment)
], ShopModel.prototype, "logo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", address_entity_1.UserAddress)
], ShopModel.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", shop_entity_1.ShopSettings)
], ShopModel.prototype, "settings", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ShopModel.prototype, "distance", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ShopModel.prototype, "lat", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ShopModel.prototype, "lng", void 0);
ShopModel = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    })
], ShopModel);
exports.ShopModel = ShopModel;
exports.ShopSchema = mongoose_1.SchemaFactory.createForClass(ShopModel);
//# sourceMappingURL=shop.js.map