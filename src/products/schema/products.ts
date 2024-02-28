import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({timestamps:true})
export class Product extends Document {
  @Prop({ default: uuidv4 })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: uuidv4 })
  type_id: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  sale_price: number;

  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  min_price: number;

  @Prop({ required: true })
  max_price: number;

  @Prop({ required: true })
  sku: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  in_stock: number;

  @Prop({ required: true })
  is_taxable: number;

  @Prop()
  shipping_class_id: number;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  product_type: string;

  @Prop({ required: true })
  unit: string;

  @Prop()
  height: number;

  @Prop()
  width: number;

  @Prop()
  length: number;

  @Prop({ required: true })
  image: {
    id: string;
    original: string;
    thumbnail: string;
  };

  @Prop()
  video: string;

  @Prop()
  gallery: {
    id: string;
    original: string;
    thumbnail: string;
  }[];

  @Prop()
  deleted_at: Date;

  @Prop()
  author_id: number;

  @Prop()
  manufacturer_id: number;

  @Prop({ required: true })
  is_digital: number;

  @Prop({ required: true })
  is_external: number;

  @Prop()
  external_product_url: string;

  @Prop()
  external_product_button_text: string;

  @Prop({ required: true })
  ratings: number;

  @Prop({ required: true })
  total_reviews: number;

  @Prop()
  my_review: any;

  @Prop({ required: true })
  in_wishlist: boolean;

  @Prop()
  blocked_dates: Date[];

  @Prop({ required: true })
  translated_languages: string[];

  @Prop()
  categories: {
    id: number;
    name: string;
    slug: string;
    language: string;
    icon: string;
    image: any[];
    details: any;
    parent: any;
    type_id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    parent_id: any;
    translated_languages: string[];
    pivot: {
      product_id: number;
      category_id: number;
    };
  }[];

  @Prop()
  shop: {
    id: number;
    owner_id: number;
    name: string;
    slug: string;
    description: string;
    cover_image: {
      id: string;
      original: string;
      thumbnail: string;
    };
    logo: {
      id: string;
      original: string;
      thumbnail: string;
    };
    is_active: number;
    address: {
      zip: string;
      city: string;
      state: string;
      country: string;
      street_address: string;
    };
    settings: {
      contact: string;
      socials: {
        url: string;
        icon: string;
      }[];
      website: string;
      location: {
        lat: number;
        lng: number;
        city: string;
        state: string;
        country: string;
        formattedAddress: string;
      };
    };
    created_at: Date;
    updated_at: Date;
  };

  @Prop()
  type: {
    id: number;
    name: string;
    settings: {
      isHome: boolean;
      layoutType: string;
      productCard: string;
    };
    slug: string;
    language: string;
    icon: string;
    promotional_sliders: {
      id: string;
      original: string;
      thumbnail: string;
    }[];
    created_at: Date;
    updated_at: Date;
    translated_languages: string[];
  };

  @Prop()
  variations: any[];

  @Prop()
  metas: any[];

  @Prop()
  manufacturer: any;

  @Prop()
  variation_options: any[];

  @Prop()
  tags: any[];

  @Prop()
  author: any;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
