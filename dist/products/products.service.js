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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = __importStar(require("mongoose"));
const product_entity_1 = require("./entities/product.entity");
const products_1 = require("./schema/products");
const paginate_1 = require("../common/pagination/paginate");
const products_json_1 = __importDefault(require("../db/pickbazar/products.json"));
const popular_products_json_1 = __importDefault(require("../db/pickbazar/popular-products.json"));
const best_selling_products_json_1 = __importDefault(require("../db/pickbazar/best-selling-products.json"));
const types_1 = require("../types/schema/types");
const category_1 = require("../categories/schema/category");
const shop_1 = require("../shops/schema/shop");
const user_1 = require("../users/schema/user");
const products = (0, class_transformer_1.plainToInstance)(product_entity_1.Product, products_json_1.default);
const popularProducts = (0, class_transformer_1.plainToInstance)(product_entity_1.Product, popular_products_json_1.default);
const bestSellingProducts = (0, class_transformer_1.plainToInstance)(product_entity_1.Product, best_selling_products_json_1.default);
const options = {
    keys: [
        'name',
        'type.slug',
        'categories.slug',
        'status',
        'shop_id',
        'author.slug',
        'tags',
        'manufacturer.slug',
    ],
    threshold: 0.3,
};
let ProductsService = class ProductsService {
    constructor(Productmodel, usersModel, shopModel) {
        this.Productmodel = Productmodel;
        this.usersModel = usersModel;
        this.shopModel = shopModel;
        this.products = products;
        this.popularProducts = popularProducts;
        this.bestSellingProducts = bestSellingProducts;
    }
    async create(createProductDto, request) {
        if (request.user.permissions.includes('store_owner')) {
            try {
                const user = await this.usersModel.findById(request.user.sub);
                const shopId = createProductDto.shop_id;
                const shop = await this.shopModel.findById(shopId);
                if (!shop || !user.shops.some((userShop) => userShop === shop.id)) {
                    throw new Error('User does not have access to the specified shop');
                }
            }
            catch (error) {
                throw new common_1.ForbiddenException('User does not have permission to create product for this shop');
            }
        }
        const newDocs = Object.assign(Object.assign({}, createProductDto), { type: createProductDto.type_id, shop: createProductDto.shop_id, in_stock: createProductDto.quantity });
        return await this.Productmodel.create(newDocs);
    }
    async getProducts({ limit, page, search, }) {
        console.log(search);
        if (!page)
            page = 1;
        if (!limit)
            limit = 30;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let query = {};
        if (search) {
            const parseSearchParams = search.split(';');
            for (const searchParam of parseSearchParams) {
                const [key, value] = searchParam.split(':');
                query[key] = value;
            }
        }
        const totalProducts = await this.Productmodel.countDocuments(query);
        const products = await this.Productmodel.find(query)
            .populate([
            { path: 'type', model: types_1.TypesModel.name },
            { path: 'categories', model: category_1.CategoryModel.name },
            { path: 'shop', model: shop_1.ShopModel.name },
        ])
            .skip(startIndex)
            .limit(limit);
        const url = `/products?search=${search}&limit=${limit}`;
        return Object.assign({ data: products }, (0, paginate_1.paginate)(totalProducts, page, limit, products.length, url));
    }
    async getProductByid(slug) {
        const product = await this.Productmodel.findOne({ slug: slug })
            .populate([
            { path: 'type', model: types_1.TypesModel.name },
            { path: 'categories', model: category_1.CategoryModel.name },
            { path: 'shop', model: shop_1.ShopModel.name },
        ])
            .exec();
        return product;
    }
    async getPopularProducts({ limit, type_slug, }) {
        let query = {};
        if (type_slug) {
            query['type.slug'] = type_slug;
        }
        const documents = await this.Productmodel.find(query)
            .populate([
            { path: 'type', model: types_1.TypesModel.name },
            { path: 'categories', model: category_1.CategoryModel.name },
            { path: 'shop', model: shop_1.ShopModel.name },
        ])
            .limit(limit)
            .exec();
        const products = documents.map((doc) => doc.toObject());
        return products;
    }
    async getBestSellingProducts({ limit, type_slug, }) {
        let query = {};
        if (type_slug) {
            query['type.slug'] = type_slug;
        }
        const documents = await this.Productmodel.find(query)
            .populate([
            { path: 'type', model: types_1.TypesModel.name },
            { path: 'categories', model: category_1.CategoryModel.name },
            { path: 'shop', model: shop_1.ShopModel.name },
        ])
            .limit(limit)
            .exec();
        const products = documents.map((doc) => doc.toObject());
        return products;
    }
    async getProductsStock({ limit, page, search, }) {
        if (!page)
            page = 1;
        if (!limit)
            limit = 30;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let query = {};
        if (search) {
            const parseSearchParams = search.split(';');
            for (const searchParam of parseSearchParams) {
                const [key, value] = searchParam.split(':');
                if (key !== 'slug') {
                    query[key] = value;
                }
            }
        }
        query['quantity'] = { $lte: 10 };
        const results = await this.Productmodel.find(query)
            .populate([
            { path: 'type', model: types_1.TypesModel.name },
            { path: 'categories', model: category_1.CategoryModel.name },
            { path: 'shop', model: shop_1.ShopModel.name },
        ])
            .skip(startIndex)
            .limit(limit);
        const totalDocs = await this.Productmodel.countDocuments(query);
        const url = `/products-stock?search=${search}&limit=${limit}`;
        return Object.assign({ data: results }, (0, paginate_1.paginate)(totalDocs, page, limit, results.length, url));
    }
    async getDraftProducts({ limit, page, search, }) {
        console.log(search);
        if (!page)
            page = 1;
        if (!limit)
            limit = 30;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const query = {};
        if (search) {
            const parseSearchParams = search.split(';');
            const searchText = [];
            for (const searchParam of parseSearchParams) {
                const [key, value] = searchParam.split(':');
                if (key !== 'slug') {
                    query[key] = value;
                }
            }
        }
        const totalDocs = await this.Productmodel.countDocuments(query);
        const results = await this.Productmodel.find(query)
            .populate([
            { path: 'type', model: types_1.TypesModel.name },
            { path: 'categories', model: category_1.CategoryModel.name },
            { path: 'shop', model: shop_1.ShopModel.name },
        ])
            .skip(startIndex)
            .limit(limit)
            .exec();
        const url = `/draft-products?search=${search}&limit=${limit}`;
        return Object.assign({ data: results }, (0, paginate_1.paginate)(totalDocs, page, limit, results.length, url));
    }
    async updateProduct(id, updateProductDto, request) {
        if (request.user.permissions.includes('store_owner')) {
            try {
                const user = await this.usersModel.findById(request.user.sub);
                const shopId = updateProductDto.shop_id;
                const shop = await this.shopModel.findById(shopId);
                if (!shop || !user.shops.some((userShop) => userShop === shop.id)) {
                    throw new Error('User does not have access to the specified shop');
                }
            }
            catch (error) {
                throw new common_1.ForbiddenException('User does not have permission to create product for this shop');
            }
        }
        const updatedProduct = await this.Productmodel.updateOne({ _id: id }, { $set: updateProductDto });
        return await this.Productmodel.findById(id);
    }
    async deleteProduct(id, request) {
        const deletedProduct = await this.Productmodel.deleteOne({ _id: id });
        return deletedProduct;
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(products_1.ProductModel.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_1.UsersModel.name)),
    __param(2, (0, mongoose_1.InjectModel)(shop_1.ShopModel.name)),
    __metadata("design:paramtypes", [mongoose.Model, mongoose.Model, mongoose.Model])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map