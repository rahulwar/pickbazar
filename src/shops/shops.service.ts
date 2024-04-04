import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './entities/shop.entity';
import shopsJson from '@db/shops.json';
import nearShopJson from '@db/near-shop.json';
import Fuse from 'fuse.js';
import { GetShopsDto } from './dto/get-shops.dto';
import { paginate } from 'src/common/pagination/paginate';
import { GetStaffsDto } from './dto/get-staffs.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ShopModel } from './schema/shop';
import mongoose from 'mongoose';
import * as geolib from 'geolib';
import { UsersModel } from 'src/users/schema/user';

const shops = plainToClass(Shop, shopsJson);
const nearShops = plainToClass(Shop, nearShopJson);
const options = {
  keys: ['name', 'type.slug', 'is_active'],
  threshold: 0.3,
};
const fuse = new Fuse(shops, options);

@Injectable()
export class ShopsService {
  private shops: Shop[] = shops;
  private nearShops: Shop[] = shops;
  constructor(
    @InjectModel(ShopModel.name)
    private Shopmodel: mongoose.Model<ShopModel>,

    @InjectModel(UsersModel.name)
    private userModel: mongoose.Model<UsersModel>,
  ) {}

  async create(createShopDto: CreateShopDto, request?: any) {
    try {
      const user = await this.userModel.findById(request.user.sub);
      const shop = new this.Shopmodel(createShopDto);
      shop.owner_id = user.id;
      shop.owner = user.id;
      await shop.save();
      const shopArray = [...user.shops];
      shopArray.push(shop.id);
      user.shops = [...shopArray];
      await user.save();
      return shop;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getShops({ search, limit, page }: GetShopsDto, request: any) {
    if (!page) page = 1;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // let data: Shop[] = this.shops;
    const query: any = {};
    if (!request.user.permissions.includes('super_admin')) {
      query['owner'] = request.user.sub;
    }

    if (search) {
      const searchParams = search.split(';');
      for (const searchParam of searchParams) {
        const [key, value] = searchParam.split(':');
        query[key] = value;
      }
    }
    const total = await this.Shopmodel.countDocuments(query);

    // if (text?.replace(/%/g, '')) {
    //   data = fuse.search(text)?.map(({ item }) => item);
    // }
    // const results = data.slice(startIndex, endIndex);
    const results = await this.Shopmodel.find(query)
      .populate([
        {
          path: 'staffs',
          model: UsersModel.name,
        },
        {
          path: 'owner',
          model: UsersModel.name,
        },
      ])
      .skip(startIndex)
      .limit(limit)
      .exec();

    const url = `/shops?search=${search}&limit=${limit}`;

    return {
      data: results,
      ...paginate(total, page, limit, results.length, url),
    };
  }

  async getStaffs({ shop_id, limit, page }: GetStaffsDto) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // let staffs: Shop['staffs'] = [];
    // if (shop_id) {
    //   staffs = this.shops.find((p) => p.id === Number(shop_id))?.staffs ?? [];
    // }
    // const results = staffs?.slice(startIndex, endIndex);
    const results = await this.Shopmodel.findOne({ _id: shop_id })
      .populate({
        path: 'staffs',
        model: UsersModel.name,
      })
      .select('staffs');
    const totalCount = results.staffs.length;
    const staffs = results.staffs.slice(startIndex, endIndex);
    const url = `/staffs?limit=${limit}`;

    return {
      data: staffs,
      ...paginate(totalCount, page, limit, staffs?.length, url),
    };
  }

  async getShop(slug: string, request: any): Promise<ShopModel> {
    let shop;
    if (request.user.permissions.includes('super_admin')) {
      shop = await this.Shopmodel.findOne({ slug: slug }).populate([
        {
          path: 'staffs',
          model: UsersModel.name,
        },
        {
          path: 'owner',
          model: UsersModel.name,
        },
      ]);
    } else {
      shop = await this.Shopmodel.findOne({
        slug: slug,
        owner: request.user.sub,
      }).populate([
        {
          path: 'staffs',
          model: UsersModel.name,
        },
        {
          path: 'owner',
          model: UsersModel.name,
        },
      ]);
    }

    // return this.shops.find((p) => p.slug === slug);
    return shop;
  }

  async getNearByShop(lat: string, lng: string): Promise<ShopModel[]> {
    // return nearShops
    // const radiusInKilometers = 5;
    // const shops = await this.Shopmodel.find({
    //   location: {
    //     $nearSphere: {
    //       $geometry: {
    //         type: 'Point',
    //         coordinates: [parseFloat(lng), parseFloat(lat)],
    //       },
    //       $maxDistance: radiusInKilometers * 1000,
    //     },
    //   },
    // });

    //without given the distance
    // const radiusInKilometers = 5;

    // const latFloat = parseFloat(lat);
    // const lngFloat = parseFloat(lng);

    // const shops = await this.Shopmodel.find({
    //   lat: {
    //     $gte: (latFloat - (1 / 111.12) * radiusInKilometers).toString(),
    //     $lte: (latFloat + (1 / 111.12) * radiusInKilometers).toString(),
    //   },
    //   lng: {
    //     $gte: (
    //       lngFloat -
    //       (1 / (111.12 * Math.cos(latFloat * (Math.PI / 180)))) *
    //         radiusInKilometers
    //     ).toString(),
    //     $lte: (
    //       lngFloat +
    //       (1 / (111.12 * Math.cos(latFloat * (Math.PI / 180)))) *
    //         radiusInKilometers
    //     ).toString(),
    //   },
    // });
    const userLocation = {
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
    };

    const shops = await this.Shopmodel.find().lean();
    const nearbyShops = shops.filter((shop) => {
      const shopLocation = {
        latitude: parseFloat(shop.lat),
        longitude: parseFloat(shop.lng),
      };
      const distance = geolib.getDistance(userLocation, shopLocation);
      return distance <= shop.distance;
    });

    return nearbyShops;
  }

  async update(id: string, updateShopDto: UpdateShopDto, request: any) {
    if (request.user.permissions.includes('super_admin')) {
      await this.Shopmodel.updateOne({ _id: id }, { $set: updateShopDto });
    } else {
      await this.Shopmodel.updateOne(
        { _id: id, owner: request.user.sub },
        { $set: updateShopDto },
      );
    }
    return await this.Shopmodel.findById(id).populate([
      {
        path: 'staffs',
        model: UsersModel.name,
      },
      {
        path: 'owner',
        model: UsersModel.name,
      },
    ]);
  }

  approve(id: string, request: any) {
    return `This action removes a #${id} shop`;
  }

  async remove(id: string, request: any) {
    // Determine if the user is an admin or shop owner
    const isAdmin = request.user.permissions.includes('super_admin');
    const isShopOwner = !isAdmin;

    // Find the shop
    const shop = await this.Shopmodel.findById(id);

    if (!shop) {
      throw new Error('Shop not found');
    }

    if (isAdmin) {
      await this.userModel.updateMany(
        { shops: { $in: [shop.id] } },
        { $pull: { shops: shop.id } },
      );
    } else if (isShopOwner) {
      await this.userModel.findByIdAndUpdate(request.user.sub, {
        $pull: { shops: shop.id },
      });
    } else {
      throw new Error('Unauthorized');
    }

    await this.Shopmodel.deleteOne({ _id: id });
  }

  async disapproveShop(id: string, request: any) {
    // const shop = this.shops.find((s) => s.id === Number(id));
    // shop.is_active = false;

    if (request.user.permissions.includes('super_admin')) {
      const shop = await this.Shopmodel.findById(id).populate([
        {
          path: 'staffs',
          model: UsersModel.name,
        },
        {
          path: 'owner',
          model: UsersModel.name,
        },
      ]);
      shop.is_active = false;
      await shop.save();

      return shop;
    }
  }

  async approveShop(id: string, request: any) {
    // const shop = this.shops.find((s) => s.id === Number(id));
    // shop.is_active = true;
    if (request.user.permissions.includes('super_admin')) {
      const shop = await this.Shopmodel.findById(id).populate([
        {
          path: 'staffs',
          model: UsersModel.name,
        },
        {
          path: 'owner',
          model: UsersModel.name,
        },
      ]);
      shop.is_active = true;
      await shop.save();
      return shop;
    }
  }
  async getNewShops({ search, limit, page }: GetShopsDto, request: any) {
    if (!page) page = 1;
    if (request.user.permissions.includes('super_admin')) {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      let query = {};
      if (search) {
        const searchParams = search.split(';');
        for (const searchParam of searchParams) {
          const [key, value] = searchParam.split(':');
          query[key] = value;
        }
      }

      const totalDocs = await this.Shopmodel.countDocuments({
        ...query,
        is_active: false,
      });

      const newShops = await this.Shopmodel.find({
        is_active: false,
        ...query,
      })
        .populate([
          {
            path: 'staffs',
            model: UsersModel.name,
          },
          {
            path: 'owner',
            model: UsersModel.name,
          },
        ])
        .skip(startIndex)
        .limit(limit);
      const url = `/new-shops?search=${search}&limit=${limit}`;

      return {
        data: newShops,
        ...paginate(totalDocs, page, limit, newShops.length, url),
      };
    }
  }
}
