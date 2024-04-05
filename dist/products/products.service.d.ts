import * as mongoose from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto, ProductPaginator } from './dto/get-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductModel } from './schema/products';
import { GetPopularProductsDto } from './dto/get-popular-products.dto';
import { GetBestSellingProductsDto } from './dto/get-best-selling-products.dto';
import { ShopModel } from 'src/shops/schema/shop';
import { UsersModel } from 'src/users/schema/user';
export declare class ProductsService {
    private Productmodel;
    private usersModel;
    private shopModel;
    constructor(Productmodel: mongoose.Model<ProductModel>, usersModel: mongoose.Model<UsersModel>, shopModel: mongoose.Model<ShopModel>);
    private products;
    private popularProducts;
    private bestSellingProducts;
    create(createProductDto: CreateProductDto, request: any): Promise<mongoose.Document<unknown, {}, ProductModel> & ProductModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    getProducts({ limit, page, search, }: GetProductsDto): Promise<ProductPaginator>;
    getProductByid(slug: string): Promise<ProductModel>;
    getPopularProducts({ limit, type_slug, }: GetPopularProductsDto): Promise<Product[]>;
    getBestSellingProducts({ limit, type_slug, }: GetBestSellingProductsDto): Promise<Product[]>;
    getProductsStock({ limit, page, search, }: GetProductsDto): Promise<ProductPaginator>;
    getDraftProducts({ limit, page, search, }: GetProductsDto): Promise<ProductPaginator>;
    updateProduct(id: string, updateProductDto: UpdateProductDto, request: any): Promise<mongoose.Document<unknown, {}, ProductModel> & ProductModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    deleteProduct(id: string, request: any): Promise<mongoose.mongo.DeleteResult>;
}
