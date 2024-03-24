import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryModel } from './schema/category';
import mongoose from 'mongoose';
export declare class CategoriesService {
    private Categorymodel;
    private categories;
    constructor(Categorymodel: mongoose.Model<CategoryModel>);
    create(createCategoryDto: CreateCategoryDto): Promise<mongoose.Document<unknown, {}, CategoryModel> & CategoryModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    getCategories({ limit, page, search, parent }: GetCategoriesDto): {
        count: number;
        current_page: number;
        firstItem: number;
        lastItem: number;
        last_page: number;
        per_page: number;
        total: number;
        first_page_url: string;
        last_page_url: string;
        next_page_url: string;
        prev_page_url: string;
        data: Category[];
    };
    getCategory(param: string, language: string): Category;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Category;
    remove(id: number): string;
}
