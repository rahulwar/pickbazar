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
exports.UsersSchema = exports.UsersModel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const shop_1 = require("../../shops/schema/shop");
let UsersModel = class UsersModel extends mongoose_2.Document {
    constructor() {
        super(...arguments);
        this.is_active = true;
    }
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UsersModel.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UsersModel.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UsersModel.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'UsersModel' }),
    __metadata("design:type", Object)
], UsersModel.prototype, "profile", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'ShopModel' }] }),
    __metadata("design:type", Array)
], UsersModel.prototype, "shops", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'ShopModel' }),
    __metadata("design:type", shop_1.ShopModel)
], UsersModel.prototype, "managed_shop", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], UsersModel.prototype, "is_active", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: { type: mongoose_2.Types.ObjectId, ref: 'UsersModel' } }),
    __metadata("design:type", Array)
], UsersModel.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], UsersModel.prototype, "permissions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'UsersModel' }),
    __metadata("design:type", Object)
], UsersModel.prototype, "wallet", void 0);
UsersModel = __decorate([
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
], UsersModel);
exports.UsersModel = UsersModel;
exports.UsersSchema = mongoose_1.SchemaFactory.createForClass(UsersModel);
//# sourceMappingURL=user.js.map