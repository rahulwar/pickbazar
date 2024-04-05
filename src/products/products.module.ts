import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ProductsController,
  PopularProductsController,
  ProductsStockController,
  DraftProductsController,
  BestSellingProductsController,
} from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schema/products';
import { ProductModel } from './schema/products';
import { JwtModule } from '@nestjs/jwt';
import { UsersModel, UsersSchema } from 'src/users/schema/user';
import { ShopModel, ShopSchema } from 'src/shops/schema/shop';

@Module({
  controllers: [
    ProductsController,
    PopularProductsController,
    BestSellingProductsController,
    ProductsStockController,
    DraftProductsController,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: ProductModel.name, schema: ProductSchema },
      { name: UsersModel.name, schema: UsersSchema },
      { name: ShopModel.name, schema: ShopSchema },
    ]),
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],

  providers: [ProductsService],
})
export class ProductsModule {}
