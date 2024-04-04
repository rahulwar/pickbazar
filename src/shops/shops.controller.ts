import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { GetShopsDto, ShopPaginator } from './dto/get-shops.dto';
import { GetStaffsDto } from './dto/get-staffs.dto';
import { UserPaginator } from 'src/users/dto/get-users.dto';
import { JwtAuthGuard } from 'src/middleware/JwtAuthGuard';
import { AdminShopKeeperAccess } from 'src/middleware/AdminShopOwnerGuard';
import { request } from 'http';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminShopKeeperAccess)
  async create(@Req() request: Request, @Body() createShopDto: CreateShopDto) {
    return await this.shopsService.create(createShopDto, request);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminShopKeeperAccess)
  async getShops(
    @Req() request: Request,
    @Query() query: GetShopsDto,
  ): Promise<ShopPaginator> {
    return await this.shopsService.getShops(query, request);
  }

  @Get(':slug')
  @UseGuards(JwtAuthGuard, AdminShopKeeperAccess)
  async getShop(@Req() request: Request, @Param('slug') slug: string) {
    return this.shopsService.getShop(slug, request);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminShopKeeperAccess)
  update(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() updateShopDto: UpdateShopDto,
  ) {
    return this.shopsService.update(id, updateShopDto, request);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminShopKeeperAccess)
  remove(@Req() request: Request, @Param('id') id: string) {
    return this.shopsService.remove(id, request);
  }

  @Post('approve')
  @UseGuards(JwtAuthGuard, AdminShopKeeperAccess)
  approveShop(@Req() request: Request, @Param('id') id: string) {
    return this.shopsService.approve(id, request);
  }

  @Post('disapprove')
  @UseGuards(JwtAuthGuard, AdminShopKeeperAccess)
  disapproveShop(@Req() request: Request, @Param('id') id: string) {
    return this.shopsService.approve(id, request);
  }
}

@Controller('staffs')
export class StaffsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminShopKeeperAccess)
  create(@Req() request, @Body() createShopDto: CreateShopDto) {
    return this.shopsService.create(createShopDto);
  }

  @Get()
  // async getStaffs(@Query() query: GetStaffsDto): Promise<UserPaginator> {
  //   return this.shopsService.getStaffs(query);
  // }
  @Get(':slug')
  @UseGuards(JwtAuthGuard, AdminShopKeeperAccess)
  async getShop(@Req() request, @Param('slug') slug: string) {
    return this.shopsService.getShop(slug, request);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminShopKeeperAccess)
  update(
    @Req() request,
    @Param('id') id: string,
    @Body() updateShopDto: UpdateShopDto,
  ) {
    return this.shopsService.update(id, updateShopDto, request);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminShopKeeperAccess)
  remove(@Req() request, @Param('id') id: string) {
    return this.shopsService.remove(id, request);
  }
}

@Controller('disapprove-shop')
export class DisapproveShopController {
  constructor(private shopsService: ShopsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminShopKeeperAccess)
  async disapproveShop(@Req() request, @Body('id') id) {
    return this.shopsService.disapproveShop(id, request);
  }
}

@Controller('approve-shop')
export class ApproveShopController {
  constructor(private shopsService: ShopsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminShopKeeperAccess)
  async approveShop(@Req() request, @Body('id') id) {
    return this.shopsService.approveShop(id, request);
  }
}

@Controller('near-by-shop')
export class NearByShopController {
  constructor(private shopsService: ShopsService) {}

  @Get(':lat/:lng')
  async getNearByShop(@Param('lat') lat: string, @Param('lng') lng: string) {
    return this.shopsService.getNearByShop(lat, lng);
  }
}

@Controller('new-shops')
export class NewShopsController {
  constructor(private shopsService: ShopsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, AdminShopKeeperAccess)
  async getNewShops(
    @Req() request: Request,
    @Query() query: GetShopsDto,
  ): Promise<ShopPaginator> {
    return this.shopsService.getNewShops(query, request);
  }
}
