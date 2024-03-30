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
exports.FlashSaleService = void 0;
const common_1 = require("@nestjs/common");
const flash_sale_json_1 = __importDefault(require("../db/pickbazar/flash-sale.json"));
const products_by_flash_sale_json_1 = __importDefault(require("../db/pickbazar/products-by-flash-sale.json"));
const class_transformer_1 = require("class-transformer");
const fuse_js_1 = __importDefault(require("fuse.js"));
const paginate_1 = require("../common/pagination/paginate");
const flash_sale_entity_1 = require("./entities/flash-sale.entity");
const product_entity_1 = require("../products/entities/product.entity");
const mongoose_1 = require("@nestjs/mongoose");
const flashsale_1 = require("./schema/flashsale");
const mongoose_2 = __importDefault(require("mongoose"));
const products_1 = require("../products/schema/products");
const flashSale = (0, class_transformer_1.plainToClass)(flash_sale_entity_1.FlashSale, flash_sale_json_1.default);
const options = {
    keys: ['title'],
    threshold: 0.3,
};
const fuse = new fuse_js_1.default(flashSale, options);
const productsByFlashSale = (0, class_transformer_1.plainToClass)(product_entity_1.Product, products_by_flash_sale_json_1.default);
const productsByFlashSaleOptions = {
    keys: ['name'],
    threshold: 0.3,
};
const productsByFlashSaleFuse = new fuse_js_1.default(productsByFlashSale, productsByFlashSaleOptions);
let FlashSaleService = class FlashSaleService {
    constructor(flashSaleModel) {
        this.flashSaleModel = flashSaleModel;
        this.flashSale = flashSale;
        this.productsByFlashSale = productsByFlashSale;
    }
    async create(createFlashSaleDto) {
        return await this.flashSaleModel.create(createFlashSaleDto);
    }
    async findAllFlashSale({ search, limit, page }) {
        if (!page)
            page = 1;
        if (!limit)
            limit = 10;
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
        const data = await this.flashSaleModel.countDocuments(query);
        const results = await this.flashSaleModel
            .find(query)
            .populate({ path: 'products', model: products_1.ProductModel.name })
            .skip(startIndex)
            .limit(limit)
            .exec();
        const url = `/flash-sale?search=${search}&limit=${limit}`;
        return Object.assign({ data: results }, (0, paginate_1.paginate)(data, page, limit, results.length, url));
    }
    async getFlashSale(param, language) {
        return await this.flashSaleModel
            .findOne({ slug: param })
            .populate({ path: 'products', model: products_1.ProductModel.name });
    }
    async update(id, updateFlashSaleDto) {
        await this.flashSaleModel.updateOne({ _id: id }, { $set: updateFlashSaleDto });
        return (await this.flashSaleModel.findById(id)).populate({
            path: 'products',
            model: products_1.ProductModel.name,
        });
    }
    async remove(id) {
        return await this.flashSaleModel.deleteOne({ _id: id });
    }
    async findAllProductsByFlashSale({ search, limit, page }) {
        if (!page)
            page = 1;
        if (!limit)
            limit = 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const productQuery = {};
        if (search) {
            const parseSearchParams = search.split(';');
            for (const searchParam of parseSearchParams) {
                const [key, value] = searchParam.split(':');
                productQuery[key] = value;
            }
        }
        try {
            const flashSales = await this.flashSaleModel.find().populate({
                path: 'products',
                match: productQuery,
            });
            const allProducts = flashSales.reduce((products, flashSale) => {
                if (flashSale.products) {
                    products.push(...flashSale.products);
                }
                return products;
            }, []);
            const totalProducts = allProducts.length;
            const paginatedProducts = allProducts.slice(startIndex, endIndex);
            const url = `/products-by-flash-sale?search=${search}&limit=${limit}`;
            return Object.assign({ data: paginatedProducts }, (0, paginate_1.paginate)(totalProducts, page, limit, paginatedProducts.length, url));
        }
        catch (error) {
            console.error('Error fetching products by flash sale:', error);
            throw error;
        }
    }
};
FlashSaleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(flashsale_1.FlashSaleModel.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], FlashSaleService);
exports.FlashSaleService = FlashSaleService;
//# sourceMappingURL=flash-sale.service.js.map