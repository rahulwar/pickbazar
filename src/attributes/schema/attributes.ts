import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, model, Types } from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class AttributesModel extends Document {}

export const AttributesSchema = SchemaFactory.createForClass(AttributesModel);
