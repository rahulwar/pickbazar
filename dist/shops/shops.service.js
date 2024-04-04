"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.ShopsService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const shop_entity_1 = require("./entities/shop.entity");
const shops_json_1 = __importDefault(require("../db/pickbazar/shops.json"));
const near_shop_json_1 = __importDefault(require("../db/pickbazar/near-shop.json"));
const fuse_js_1 = __importDefault(require("fuse.js"));
const paginate_1 = require("../common/pagination/paginate");
const mongoose_1 = require("@nestjs/mongoose");
const shop_1 = require("./schema/shop");
const mongoose_2 = __importDefault(require("mongoose"));
const geolib = __importStar(require("geolib"));
const user_1 = require("../users/schema/user");
const shops = (0, class_transformer_1.plainToClass)(shop_entity_1.Shop, shops_json_1.default);
const nearShops = (0, class_transformer_1.plainToClass)(shop_entity_1.Shop, near_shop_json_1.default);
const options = {
    keys: ['name', 'type.slug', 'is_active'],
    threshold: 0.3,
};
const fuse = new fuse_js_1.default(shops, options);
let ShopsService = class ShopsService {
    constructor(Shopmodel, userModel) {
        this.Shopmodel = Shopmodel;
        this.userModel = userModel;
        this.shops = shops;
        this.nearShops = shops;
    }
    async create(createShopDto, request) {
        try {
            const user = await this.userModel.findById(request.user.sub);
            const shop = new this.Shopmodel(createShopDto);
            shop.owner_id = user.id;
            shop.owner = user.id;
            await shop.save();
            const shopArray = [...user.shops];
            shopArray.push(shop.id);
            user.shops = [...shopArray];
            await user.save();
            return shop;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getShops({ search, limit, page }, request) {
        if (!page)
            page = 1;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const query = {};
        if (!request.user.permissions.includes('super_admin')) {
            query['owner'] = request.user.sub;
        }
        if (search) {
            const searchParams = search.split(';');
            for (const searchParam of searchParams) {
                const [key, value] = searchParam.split(':');
                query[key] = value;
            }
        }
        const total = await this.Shopmodel.countDocuments(query);
        const results = await this.Shopmodel.find(query)
            .populate([
            {
                path: 'staffs',
                model: user_1.UsersModel.name,
            },
            {
                path: 'owner',
                model: user_1.UsersModel.name,
            },
        ])
            .skip(startIndex)
            .limit(limit)
            .exec();
        const url = `/shops?search=${search}&limit=${limit}`;
        return Object.assign({ data: results }, (0, paginate_1.paginate)(total, page, limit, results.length, url));
    }
    async getStaffs({ shop_id, limit, page }) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = await this.Shopmodel.findOne({ _id: shop_id })
            .populate({
            path: 'staffs',
            model: user_1.UsersModel.name,
        })
            .select('staffs');
        const totalCount = results.staffs.length;
        const staffs = results.staffs.slice(startIndex, endIndex);
        const url = `/staffs?limit=${limit}`;
        return Object.assign({ data: staffs }, (0, paginate_1.paginate)(totalCount, page, limit, staffs === null || staffs === void 0 ? void 0 : staffs.length, url));
    }
    async getShop(slug, request) {
        let shop;
        if (request.user.permissions.includes('super_admin')) {
            shop = await this.Shopmodel.findOne({ slug: slug }).populate([
                {
                    path: 'staffs',
                    model: user_1.UsersModel.name,
                },
                {
                    path: 'owner',
                    model: user_1.UsersModel.name,
                },
            ]);
        }
        else {
            shop = await this.Shopmodel.findOne({
                slug: slug,
                owner: request.user.sub,
            }).populate([
                {
                    path: 'staffs',
                    model: user_1.UsersModel.name,
                },
                {
                    path: 'owner',
                    model: user_1.UsersModel.name,
                },
            ]);
        }
        return shop;
    }
    async getNearByShop(lat, lng) {
        const userLocation = {
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
        };
        const shops = await this.Shopmodel.find().lean();
        const nearbyShops = shops.filter((shop) => {
            const shopLocation = {
                latitude: parseFloat(shop.lat),
                longitude: parseFloat(shop.lng),
            };
            const distance = geolib.getDistance(userLocation, shopLocation);
            return distance <= shop.distance;
        });
        return nearbyShops;
    }
    async update(id, updateShopDto, request) {
        if (request.user.permissions.includes('super_admin')) {
            await this.Shopmodel.updateOne({ _id: id }, { $set: updateShopDto });
        }
        else {
            await this.Shopmodel.updateOne({ _id: id, owner: request.user.sub }, { $set: updateShopDto });
        }
        return await this.Shopmodel.findById(id).populate([
            {
                path: 'staffs',
                model: user_1.UsersModel.name,
            },
            {
                path: 'owner',
                model: user_1.UsersModel.name,
            },
        ]);
    }
    approve(id, request) {
        return `This action removes a #${id} shop`;
    }
    async remove(id, request) {
        const isAdmin = request.user.permissions.includes('super_admin');
        const isShopOwner = !isAdmin;
        const shop = await this.Shopmodel.findById(id);
        if (!shop) {
            throw new Error('Shop not found');
        }
        if (isAdmin) {
            await this.userModel.updateMany({ shops: { $in: [shop.id] } }, { $pull: { shops: shop.id } });
        }
        else if (isShopOwner) {
            await this.userModel.findByIdAndUpdate(request.user.sub, {
                $pull: { shops: shop.id },
            });
        }
        else {
            throw new Error('Unauthorized');
        }
        await this.Shopmodel.deleteOne({ _id: id });
    }
    async disapproveShop(id, request) {
        if (request.user.permissions.includes('super_admin')) {
            const shop = await this.Shopmodel.findById(id).populate([
                {
                    path: 'staffs',
                    model: user_1.UsersModel.name,
                },
                {
                    path: 'owner',
                    model: user_1.UsersModel.name,
                },
            ]);
            shop.is_active = false;
            await shop.save();
            return shop;
        }
    }
    async approveShop(id, request) {
        if (request.user.permissions.includes('super_admin')) {
            const shop = await this.Shopmodel.findById(id).populate([
                {
                    path: 'staffs',
                    model: user_1.UsersModel.name,
                },
                {
                    path: 'owner',
                    model: user_1.UsersModel.name,
                },
            ]);
            shop.is_active = true;
            await shop.save();
            return shop;
        }
    }
    async getNewShops({ search, limit, page }, request) {
        if (!page)
            page = 1;
        if (request.user.permissions.includes('super_admin')) {
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            let query = {};
            if (search) {
                const searchParams = search.split(';');
                for (const searchParam of searchParams) {
                    const [key, value] = searchParam.split(':');
                    query[key] = value;
                }
            }
            const totalDocs = await this.Shopmodel.countDocuments(Object.assign(Object.assign({}, query), { is_active: false }));
            const newShops = await this.Shopmodel.find(Object.assign({ is_active: false }, query))
                .populate([
                {
                    path: 'staffs',
                    model: user_1.UsersModel.name,
                },
                {
                    path: 'owner',
                    model: user_1.UsersModel.name,
                },
            ])
                .skip(startIndex)
                .limit(limit);
            const url = `/new-shops?search=${search}&limit=${limit}`;
            return Object.assign({ data: newShops }, (0, paginate_1.paginate)(totalDocs, page, limit, newShops.length, url));
        }
    }
};
ShopsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(shop_1.ShopModel.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_1.UsersModel.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, mongoose_2.default.Model])
], ShopsService);
exports.ShopsService = ShopsService;
//# sourceMappingURL=shops.service.js.map