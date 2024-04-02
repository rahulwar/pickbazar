import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { AttributesModel } from './schema/attributes';
import mongoose from 'mongoose';
export declare class AttributesService {
    private attributesModel;
    private attributes;
    constructor(attributesModel: mongoose.Model<AttributesModel>);
    create(createAttributeDto: CreateAttributeDto): Promise<mongoose.Document<unknown, {}, AttributesModel> & AttributesModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    findAll(): Promise<(mongoose.Document<unknown, {}, AttributesModel> & AttributesModel & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    findOne(param: string): Promise<mongoose.Document<unknown, {}, AttributesModel> & AttributesModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    update(id: string, updateAttributeDto: UpdateAttributeDto): Promise<mongoose.Document<unknown, {}, AttributesModel> & AttributesModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    remove(id: string): Promise<mongoose.mongo.DeleteResult>;
}
