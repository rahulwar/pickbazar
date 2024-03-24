import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './entities/type.entity';
import { GetTypesDto } from './dto/get-types.dto';
import { TypesModel } from './schema/types';
import mongoose from 'mongoose';
export declare class TypesService {
    private Typesmodel;
    private types;
    constructor(Typesmodel: mongoose.Model<TypesModel>);
    getTypes({ text, search }: GetTypesDto): Promise<(mongoose.Document<unknown, {}, TypesModel> & TypesModel & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    getTypeBySlug(slug: string): Promise<Type>;
    create(createTypeDto: CreateTypeDto): Promise<mongoose.Document<unknown, {}, TypesModel> & TypesModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: string, updateTypeDto: UpdateTypeDto): Promise<mongoose.Document<unknown, {}, TypesModel> & TypesModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    remove(id: string): Promise<mongoose.mongo.DeleteResult>;
}
