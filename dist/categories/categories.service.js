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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const category_entity_1 = require("./entities/category.entity");
const fuse_js_1 = __importDefault(require("fuse.js"));
const categories_json_1 = __importDefault(require("../db/pickbazar/categories.json"));
const paginate_1 = require("../common/pagination/paginate");
const category_1 = require("./schema/category");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const types_1 = require("../types/schema/types");
const categories = (0, class_transformer_1.plainToClass)(category_entity_1.Category, categories_json_1.default);
const options = {
    keys: ['name', 'type.slug'],
    threshold: 0.3,
};
const fuse = new fuse_js_1.default(categories, options);
let CategoriesService = class CategoriesService {
    constructor(Categorymodel) {
        this.Categorymodel = Categorymodel;
        this.categories = categories;
    }
    async create(createCategoryDto) {
        const newdocs = Object.assign(Object.assign({}, createCategoryDto), { type: createCategoryDto.type_id });
        delete newdocs.type_id;
        const newCategory = await this.Categorymodel.create(newdocs);
        if (newdocs.parent) {
            const parent = await this.Categorymodel.findById(newdocs.parent);
            let child = [...parent.children];
            child.push(newCategory.id);
            parent.children = [...child];
            await parent.save();
        }
        return newCategory;
    }
    async getCategories({ limit, page, search, parent }) {
        const query = {};
        if (search) {
            const searchParams = search.split(';');
            for (const searchParam of searchParams) {
                const [key, value] = searchParam.split(':');
                query[key] = value;
            }
        }
        if (parent === 'null') {
            query['parent'] = null;
        }
        const total = await this.Categorymodel.countDocuments(query);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = await this.Categorymodel.find(query)
            .populate([
            { path: 'type', model: types_1.TypesModel.name },
            { path: 'children', model: category_1.CategoryModel.name },
            { path: 'parent', model: category_1.CategoryModel.name },
        ])
            .skip(startIndex)
            .limit(limit)
            .exec();
        const url = `/categories?search=${search}&limit=${limit}&parent=${parent}`;
        return Object.assign({ data: results }, (0, paginate_1.paginate)(total, page, limit, results.length, url));
    }
    async getCategory(param, language) {
        try {
            let category = await this.Categorymodel.findOne({ slug: param })
                .populate([
                { path: 'type', model: types_1.TypesModel.name },
                { path: 'children', model: category_1.CategoryModel.name },
                { path: 'parent', model: category_1.CategoryModel.name },
            ])
                .exec();
            if (!category) {
                category = await this.Categorymodel.findById(param)
                    .populate([
                    { path: 'type', model: types_1.TypesModel.name },
                    { path: 'children', model: category_1.CategoryModel.name },
                    { path: 'parent', model: category_1.CategoryModel.name },
                ])
                    .exec();
            }
            return category;
        }
        catch (error) {
            console.error('Error fetching category:', error);
            return null;
        }
    }
    async update(id, updateCategoryDto) {
        console.log(id);
        await this.Categorymodel.updateOne({ _id: id }, { $set: updateCategoryDto });
        return this.Categorymodel.findOne({ _id: id });
    }
    async remove(id) {
        return await this.Categorymodel.deleteOne({ _id: id });
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_1.CategoryModel.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map