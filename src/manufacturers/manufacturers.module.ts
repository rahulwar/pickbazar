import { Module } from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service';
import {
  ManufacturersController,
  TopManufacturersController,
} from './manufacturers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ManufacturerModel, ManufacturerSchema } from './schema/manufacturer';
import { JwtModule } from '@nestjs/jwt';
import { ShopModel, ShopSchema } from 'src/shops/schema/shop';
import { UsersModel, UsersSchema } from 'src/users/schema/user';

@Module({
  controllers: [ManufacturersController, TopManufacturersController],
  providers: [ManufacturersService],
  imports: [
    MongooseModule.forFeature([
      { name: ManufacturerModel.name, schema: ManufacturerSchema },
      { name: ShopModel.name, schema: ShopSchema },
      { name: UsersModel.name, schema: UsersSchema },
    ]),
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class ManufacturersModule {}
