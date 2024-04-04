import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import {
  ApproveShopController,
  DisapproveShopController,
  ShopsController,
  StaffsController,
  NearByShopController,
  NewShopsController,
} from './shops.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopModel, ShopSchema } from './schema/shop';
import { UsersModel, UsersSchema } from 'src/users/schema/user';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [
    ShopsController,
    StaffsController,
    DisapproveShopController,
    ApproveShopController,
    NearByShopController,
    NewShopsController,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: ShopModel.name, schema: ShopSchema },
      { name: UsersModel.name, schema: UsersSchema },
    ]),
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [ShopsService],
})
export class ShopsModule {}
