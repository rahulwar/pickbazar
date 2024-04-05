import { ForbiddenException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto, ProductPaginator } from './dto/get-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductSchema, ProductModel } from './schema/products';
import { paginate } from 'src/common/pagination/paginate';
import productsJson from '@db/products.json';
import popularProductsJson from '@db/popular-products.json';
import bestSellingProductsJson from '@db/best-selling-products.json';
import Fuse from 'fuse.js';
import { GetPopularProductsDto } from './dto/get-popular-products.dto';
import { GetBestSellingProductsDto } from './dto/get-best-selling-products.dto';
import { UploadsService } from 'src/uploads/uploads.service';
import { Document } from 'mongoose';
import { TypesModel } from 'src/types/schema/types';
import { CategoryModel } from 'src/categories/schema/category';
import { ShopModel } from 'src/shops/schema/shop';
import { UsersModel } from 'src/users/schema/user';
const products = plainToInstance(Product, productsJson);
const popularProducts = plainToInstance(Product, popularProductsJson);
const bestSellingProducts = plainToInstance(Product, bestSellingProductsJson);

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
// const fuse = new Fuse(products, options);

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductModel.name)
    private Productmodel: mongoose.Model<ProductModel>,

    @InjectModel(UsersModel.name)
    private usersModel: mongoose.Model<UsersModel>,
    @InjectModel(ShopModel.name)
    private shopModel: mongoose.Model<ShopModel>,
  ) {}
  private products: any = products;
  private popularProducts: any = popularProducts;
  private bestSellingProducts: any = bestSellingProducts;

  async create(createProductDto: CreateProductDto, request: any) {
    if (request.user.permissions.includes('store_owner')) {
      try {
        const user = await this.usersModel.findById(request.user.sub);
        const shopId = createProductDto.shop_id;
        const shop = await this.shopModel.findById(shopId);

        if (!shop || !user.shops.some((userShop) => userShop === shop.id)) {
          throw new Error('User does not have access to the specified shop');
        }
      } catch (error) {
        throw new ForbiddenException(
          'User does not have permission to create product for this shop',
        );
      }
    }

    const newDocs = {
      ...createProductDto,
      type: createProductDto.type_id,
      shop: createProductDto.shop_id,
      in_stock: createProductDto.quantity,
    };

    return await this.Productmodel.create(newDocs);
  }

  async getProducts({
    limit,
    page,
    search,
  }: GetProductsDto): Promise<ProductPaginator> {
    console.log(search);
    if (!page) page = 1;
    if (!limit) limit = 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let query: any = {};
    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // Add search conditions to the query object
        query[key] = value;
      }
    }
    const totalProducts = await this.Productmodel.countDocuments(query);
    const products = await this.Productmodel.find(query)
      .populate([
        { path: 'type', model: TypesModel.name },
        { path: 'categories', model: CategoryModel.name },
        { path: 'shop', model: ShopModel.name },
      ])
      .skip(startIndex)
      .limit(limit);
    // const products: Product[] = documents.map(
    //   (doc: Document<any, any, Product>) => doc.toObject(),
    // );

    const url = `/products?search=${search}&limit=${limit}`;
    return {
      data: products,
      ...paginate(totalProducts, page, limit, products.length, url),
    };
  }

  //  async getProductBySlug(slug: string): Promise<ProductModel> {
  //      const productSlug = await this.Productmodel.findOne({slug : slug}).exec();
  //      return productSlug;
  //   }

  async getProductByid(slug: string): Promise<ProductModel> {
    const product = await this.Productmodel.findOne({ slug: slug })
      .populate([
        { path: 'type', model: TypesModel.name },
        { path: 'categories', model: CategoryModel.name },
        { path: 'shop', model: ShopModel.name },
      ])
      .exec();
    return product;
  }

  async getPopularProducts({
    limit,
    type_slug,
  }: GetPopularProductsDto): Promise<Product[]> {
    let query: any = {};
    if (type_slug) {
      query['type.slug'] = type_slug; // Adjust the query based on type_slug
    }

    const documents = await this.Productmodel.find(query)
      .populate([
        { path: 'type', model: TypesModel.name },
        { path: 'categories', model: CategoryModel.name },
        { path: 'shop', model: ShopModel.name },
      ])
      .limit(limit)
      .exec();
    const products: Product[] = documents.map(
      (doc: Document<any, any, Product>) => doc.toObject(),
    );
    return products;
  }
  async getBestSellingProducts({
    limit,
    type_slug,
  }: GetBestSellingProductsDto): Promise<Product[]> {
    let query: any = {};
    if (type_slug) {
      query['type.slug'] = type_slug; // Adjust the query based on type_slug
    }

    const documents = await this.Productmodel.find(query)
      .populate([
        { path: 'type', model: TypesModel.name },
        { path: 'categories', model: CategoryModel.name },
        { path: 'shop', model: ShopModel.name },
      ])
      .limit(limit)
      .exec();
    const products: Product[] = documents.map(
      (doc: Document<any, any, Product>) => doc.toObject(),
    );
    return products;
  }
  async getProductsStock({
    limit,
    page,
    search,
  }: GetProductsDto): Promise<ProductPaginator> {
    if (!page) page = 1;
    if (!limit) limit = 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let query: any = {};
    if (search) {
      const parseSearchParams = search.split(';');

      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // TODO: Temp Solution
        if (key !== 'slug') {
          query[key] = value;
        }
      }

      // data = fuse
      //   .search({
      //     $and: searchText,
      //   })
      //   ?.map(({ item }) => item);
    }
    query['quantity'] = { $lte: 10 };

    // const results = data.slice(startIndex, endIndex);
    const results = await this.Productmodel.find(query)
      .populate([
        { path: 'type', model: TypesModel.name },
        { path: 'categories', model: CategoryModel.name },
        { path: 'shop', model: ShopModel.name },
      ])
      .skip(startIndex)
      .limit(limit);
    const totalDocs = await this.Productmodel.countDocuments(query);
    const url = `/products-stock?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(totalDocs, page, limit, results.length, url),
    };
  }

  async getDraftProducts({
    limit,
    page,
    search,
  }: GetProductsDto): Promise<ProductPaginator> {
    console.log(search);
    if (!page) page = 1;
    if (!limit) limit = 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // let data: Product[] = this.products.filter(
    //   (item) => item.status === 'draft',
    // );

    const query = {};

    if (search) {
      const parseSearchParams = search.split(';');
      const searchText: any = [];
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // TODO: Temp Solution
        if (key !== 'slug') {
          query[key] = value;
        }
      }

      // data = fuse
      //   .search({
      //     $and: searchText,
      //   })
      //   ?.map(({ item }) => item);
    }
    const totalDocs = await this.Productmodel.countDocuments(query);
    const results = await this.Productmodel.find(query)
      .populate([
        { path: 'type', model: TypesModel.name },
        { path: 'categories', model: CategoryModel.name },
        { path: 'shop', model: ShopModel.name },
      ])
      .skip(startIndex)
      .limit(limit)
      .exec();

    // const results = data.slice(startIndex, endIndex);
    const url = `/draft-products?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(totalDocs, page, limit, results.length, url),
    };
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
    request: any,
  ) {
    // console.log(id);
    // const product = await this.Productmodel.find({ id: id });
    // console.log(product);
    if (request.user.permissions.includes('store_owner')) {
      try {
        const user = await this.usersModel.findById(request.user.sub);
        const shopId = updateProductDto.shop_id;
        const shop = await this.shopModel.findById(shopId);

        if (!shop || !user.shops.some((userShop) => userShop === shop.id)) {
          throw new Error('User does not have access to the specified shop');
        }
      } catch (error) {
        throw new ForbiddenException(
          'User does not have permission to create product for this shop',
        );
      }
    }
    const updatedProduct = await this.Productmodel.updateOne(
      { _id: id },
      { $set: updateProductDto },
    );
    // return product;
    // console.log(updatedProduct);
    return await this.Productmodel.findById(id);
  }

  async deleteProduct(id: string, request: any) {
    const deletedProduct = await this.Productmodel.deleteOne({ _id: id });
    return deletedProduct;
  }
}
