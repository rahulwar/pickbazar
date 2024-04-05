import { ForbiddenException, Injectable } from '@nestjs/common';
import { Manufacturer } from './entities/manufacturer.entity';
import manufacturersJson from '@db/manufacturers.json';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import { GetTopManufacturersDto } from './dto/get-top-manufacturers.dto';
import {
  GetManufacturersDto,
  ManufacturerPaginator,
} from './dto/get-manufactures.dto';
import { paginate } from '../common/pagination/paginate';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ManufacturerModel } from './schema/manufacturer';
import mongoose from 'mongoose';
import { UsersModel } from 'src/users/schema/user';
import { ShopModel } from 'src/shops/schema/shop';
import { TypesModel } from 'src/types/schema/types';

const manufacturers = plainToClass(Manufacturer, manufacturersJson);

const options = {
  keys: ['name'],
  threshold: 0.3,
};

const fuse = new Fuse(manufacturers, options);

@Injectable()
export class ManufacturersService {
  private manufacturers: Manufacturer[] = manufacturers;
  constructor(
    @InjectModel(ManufacturerModel.name)
    private manufacturerModel: mongoose.Model<ManufacturerModel>,
    @InjectModel(UsersModel.name)
    private usersModel: mongoose.Model<UsersModel>,
    @InjectModel(ShopModel.name)
    private shopModel: mongoose.Model<ShopModel>,
  ) {}

  async create(createManufactureDto: CreateManufacturerDto, request: any) {
    const newDocs = {
      ...createManufactureDto,
      type: createManufactureDto.type_id,
    };
    if (createManufactureDto.shop_id) {
      try {
        const user = await this.usersModel.findById(request.user.sub);
        const shopId = createManufactureDto.shop_id;
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

    return await this.manufacturerModel.create(newDocs);
  }

  async getManufactures({
    limit,
    page,
    search,
  }: GetManufacturersDto): Promise<ManufacturerPaginator> {
    if (!page) page = 1;
    if (!limit) limit = 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // let data: Manufacturer[] = this.manufacturers;
    let query = {};
    console.log(search);
    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // data = fuse.search(value)?.map(({ item }) => item);
        query[key] = value;
      }
    }

    const docsCount = await this.manufacturerModel.countDocuments(query);
    const results = await this.manufacturerModel
      .find(query)
      .populate({ path: 'type', model: TypesModel.name })
      .skip(startIndex)
      .limit(limit);
    // const results = data.slice(startIndex, endIndex);
    const url = `/manufacturers?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(docsCount, page, limit, results.length, url),
    };
  }

  async getTopManufactures({
    limit = 10,
  }: GetTopManufacturersDto): Promise<ManufacturerModel[]> {
    // return manufacturers.slice(0, limit);
    return await this.manufacturerModel.find().limit(limit);
  }

  async getManufacturesBySlug(slug: string): Promise<ManufacturerModel> {
    // return this.manufacturers.find(
    //   (singleManufacture) => singleManufacture.slug === slug,
    // );
    return await this.manufacturerModel
      .findOne({ slug })
      .populate({ path: 'type', model: TypesModel.name });
  }

  async update(id: string, updateManufacturesDto: UpdateManufacturerDto) {
    // const manufacturer = this.manufacturers.find((p) => p.id === Number(id));

    // // Update author
    // manufacturer.is_approved = updateManufacturesDto.is_approved ?? true;

    // return manufacturer;
    const manufacturer = await this.manufacturerModel.findById(id);
    if (manufacturer) {
      await this.manufacturerModel.updateOne(
        { _id: id },
        { $set: updateManufacturesDto },
      );
    }
    return await this.manufacturerModel
      .findById(id)
      .populate({ path: 'type', model: TypesModel.name });
  }

  async remove(id: string) {
    return await this.manufacturerModel.deleteOne({ _id: id });
  }
}
