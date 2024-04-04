"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopsModule = void 0;
const common_1 = require("@nestjs/common");
const shops_service_1 = require("./shops.service");
const shops_controller_1 = require("./shops.controller");
const mongoose_1 = require("@nestjs/mongoose");
const shop_1 = require("./schema/shop");
const user_1 = require("../users/schema/user");
const jwt_1 = require("@nestjs/jwt");
let ShopsModule = class ShopsModule {
};
ShopsModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            shops_controller_1.ShopsController,
            shops_controller_1.StaffsController,
            shops_controller_1.DisapproveShopController,
            shops_controller_1.ApproveShopController,
            shops_controller_1.NearByShopController,
            shops_controller_1.NewShopsController,
        ],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: shop_1.ShopModel.name, schema: shop_1.ShopSchema },
                { name: user_1.UsersModel.name, schema: user_1.UsersSchema },
            ]),
            jwt_1.JwtModule.register({
                secret: 'your_secret_key',
                signOptions: { expiresIn: '1h' },
            }),
        ],
        providers: [shops_service_1.ShopsService],
    })
], ShopsModule);
exports.ShopsModule = ShopsModule;
//# sourceMappingURL=shops.module.js.map