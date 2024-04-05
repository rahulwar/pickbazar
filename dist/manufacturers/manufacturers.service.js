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
exports.ManufacturersService = void 0;
const common_1 = require("@nestjs/common");
const manufacturer_entity_1 = require("./entities/manufacturer.entity");
const manufacturers_json_1 = __importDefault(require("../db/pickbazar/manufacturers.json"));
const class_transformer_1 = require("class-transformer");
const fuse_js_1 = __importDefault(require("fuse.js"));
const paginate_1 = require("../common/pagination/paginate");
const mongoose_1 = require("@nestjs/mongoose");
const manufacturer_1 = require("./schema/manufacturer");
const mongoose_2 = __importDefault(require("mongoose"));
const user_1 = require("../users/schema/user");
const shop_1 = require("../shops/schema/shop");
const types_1 = require("../types/schema/types");
const manufacturers = (0, class_transformer_1.plainToClass)(manufacturer_entity_1.Manufacturer, manufacturers_json_1.default);
const options = {
    keys: ['name'],
    threshold: 0.3,
};
const fuse = new fuse_js_1.default(manufacturers, options);
let ManufacturersService = class ManufacturersService {
    constructor(manufacturerModel, usersModel, shopModel) {
        this.manufacturerModel = manufacturerModel;
        this.usersModel = usersModel;
        this.shopModel = shopModel;
        this.manufacturers = manufacturers;
    }
    async create(createManufactureDto, request) {
        const newDocs = Object.assign(Object.assign({}, createManufactureDto), { type: createManufactureDto.type_id });
        if (createManufactureDto.shop_id) {
            try {
                const user = await this.usersModel.findById(request.user.sub);
                const shopId = createManufactureDto.shop_id;
                const shop = await this.shopModel.findById(shopId);
                if (!shop || !user.shops.some((userShop) => userShop === shop.id)) {
                    throw new Error('User does not have access to the specified shop');
                }
            }
            catch (error) {
                throw new common_1.ForbiddenException('User does not have permission to create product for this shop');
            }
        }
        return await this.manufacturerModel.create(newDocs);
    }
    async getManufactures({ limit, page, search, }) {
        if (!page)
            page = 1;
        if (!limit)
            limit = 30;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let query = {};
        console.log(search);
        if (search) {
            const parseSearchParams = search.split(';');
            for (const searchParam of parseSearchParams) {
                const [key, value] = searchParam.split(':');
                query[key] = value;
            }
        }
        const docsCount = await this.manufacturerModel.countDocuments(query);
        const results = await this.manufacturerModel
            .find(query)
            .populate({ path: 'type', model: types_1.TypesModel.name })
            .skip(startIndex)
            .limit(limit);
        const url = `/manufacturers?search=${search}&limit=${limit}`;
        return Object.assign({ data: results }, (0, paginate_1.paginate)(docsCount, page, limit, results.length, url));
    }
    async getTopManufactures({ limit = 10, }) {
        return await this.manufacturerModel.find().limit(limit);
    }
    async getManufacturesBySlug(slug) {
        return await this.manufacturerModel
            .findOne({ slug })
            .populate({ path: 'type', model: types_1.TypesModel.name });
    }
    async update(id, updateManufacturesDto) {
        const manufacturer = await this.manufacturerModel.findById(id);
        if (manufacturer) {
            await this.manufacturerModel.updateOne({ _id: id }, { $set: updateManufacturesDto });
        }
        return await this.manufacturerModel
            .findById(id)
            .populate({ path: 'type', model: types_1.TypesModel.name });
    }
    async remove(id) {
        return await this.manufacturerModel.deleteOne({ _id: id });
    }
};
ManufacturersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(manufacturer_1.ManufacturerModel.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_1.UsersModel.name)),
    __param(2, (0, mongoose_1.InjectModel)(shop_1.ShopModel.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], ManufacturersService);
exports.ManufacturersService = ManufacturersService;
//# sourceMappingURL=manufacturers.service.js.map