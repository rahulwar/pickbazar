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
    getTypes({ text, search }: GetTypesDto): Type[];
    getTypeBySlug(slug: string): Type;
    create(createTypeDto: CreateTypeDto): Promise<mongoose.Document<unknown, {}, TypesModel> & TypesModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTypeDto: UpdateTypeDto): Type;
    remove(id: number): string;
}
