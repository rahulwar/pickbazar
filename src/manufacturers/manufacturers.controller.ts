import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service';
import { GetTopManufacturersDto } from './dto/get-top-manufacturers.dto';
import { Manufacturer } from './entities/manufacturer.entity';
import {
  GetManufacturersDto,
  ManufacturerPaginator,
} from './dto/get-manufactures.dto';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { JwtAuthGuard } from 'src/middleware/JwtAuthGuard';
import { AdminShopKeeperAccess } from 'src/middleware/AdminShopOwnerGuard';
import { AdminOnly } from 'src/middleware/AdminOnly';
import { ManufacturerModel } from './schema/manufacturer';

@Controller('manufacturers')
export class ManufacturersController {
  constructor(private readonly manufacturersService: ManufacturersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminShopKeeperAccess)
  createProduct(
    @Req() request,
    @Body() createManufactureDto: CreateManufacturerDto,
  ) {
    return this.manufacturersService.create(createManufactureDto, request);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminShopKeeperAccess)
  async getManufactures(
    @Query() query: GetManufacturersDto,
  ): Promise<ManufacturerPaginator> {
    return this.manufacturersService.getManufactures(query);
  }

  @Get(':slug')
  @UseGuards(JwtAuthGuard, AdminShopKeeperAccess)
  async getManufactureBySlug(
    @Param('slug') slug: string,
  ): Promise<ManufacturerModel> {
    return this.manufacturersService.getManufacturesBySlug(slug);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminOnly)
  update(
    @Param('id') id: string,
    @Body() updateManufacturerDto: UpdateManufacturerDto,
  ) {
    return this.manufacturersService.update(id, updateManufacturerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminOnly)
  remove(@Param('id') id: string) {
    return this.manufacturersService.remove(id);
  }
}

@Controller('top-manufacturers')
export class TopManufacturersController {
  constructor(private readonly manufacturersService: ManufacturersService) {}

  @Get()
  async getTopManufactures(
    @Query() query: GetTopManufacturersDto,
  ): Promise<ManufacturerModel[]> {
    return this.manufacturersService.getTopManufactures(query);
  }
}
