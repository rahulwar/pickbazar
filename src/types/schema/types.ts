import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Attachment } from 'src/common/entities/attachment.entity';
import { v4 as uuidv4 } from 'uuid';
import { Banner, TypeSettings } from '../entities/type.entity';

@Schema({ timestamps: true })
export class TypesModel extends Document {
  @Prop({ default: uuidv4 })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;

  @Prop()
  image: Attachment;

  @Prop()
  icon: string;

  @Prop()
  banners: Banner[];

  @Prop()
  promotional_sliders: Attachment[];

  @Prop()
  settings?: TypeSettings;

  @Prop()
  language: string;

  @Prop()
  translated_languages: string[];
}

export const TypesSchema = SchemaFactory.createForClass(TypesModel);
