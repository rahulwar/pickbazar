import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

import { Types, Document } from 'mongoose';
import { Attachment } from 'src/common/entities/attachment.entity';
import { ShopSocials } from 'src/settings/entities/setting.entity';
import { TypesModel } from 'src/types/schema/types';

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
export class ManufacturerModel extends Document {
  @Prop()
  cover_image: Attachment;

  @Prop()
  description: string;

  @Prop()
  image: Attachment;

  @Prop({ default: false })
  is_approved: boolean;

  @Prop()
  name: string;

  @Prop({ default: 0 })
  products_count: number;

  @Prop()
  slug: string;

  @Prop()
  socials: ShopSocials;

  @Prop({ type: Types.ObjectId, ref: 'TypesModel' })
  type: TypesModel;

  @Prop()
  type_id: string;

  @Prop()
  website: string;

  @Prop()
  language: string;

  @Prop()
  translated_languages: string[];
}

export const ManufacturerSchema =
  SchemaFactory.createForClass(ManufacturerModel);
