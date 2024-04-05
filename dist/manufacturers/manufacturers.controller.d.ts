/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ManufacturersService } from './manufacturers.service';
import { GetTopManufacturersDto } from './dto/get-top-manufacturers.dto';
import { GetManufacturersDto, ManufacturerPaginator } from './dto/get-manufactures.dto';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { ManufacturerModel } from './schema/manufacturer';
export declare class ManufacturersController {
    private readonly manufacturersService;
    constructor(manufacturersService: ManufacturersService);
    createProduct(request: any, createManufactureDto: CreateManufacturerDto): Promise<import("mongoose").Document<unknown, {}, ManufacturerModel> & ManufacturerModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getManufactures(query: GetManufacturersDto): Promise<ManufacturerPaginator>;
    getManufactureBySlug(slug: string): Promise<ManufacturerModel>;
    update(id: string, updateManufacturerDto: UpdateManufacturerDto): Promise<import("mongoose").Document<unknown, {}, ManufacturerModel> & ManufacturerModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("mongodb").DeleteResult>;
}
export declare class TopManufacturersController {
    private readonly manufacturersService;
    constructor(manufacturersService: ManufacturersService);
    getTopManufactures(query: GetTopManufacturersDto): Promise<ManufacturerModel[]>;
}
