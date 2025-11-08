import { SchemaFactory } from '@nestjs/mongoose';
import { Schema, Model, model } from 'mongoose';

export const apartmentModelName = 'Apartment';

export interface IApartment extends Document {
  id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  rooms: number;
  baths: number;
  area: number;
  furnishingStatus: string;
  amenities: string[];
  photos: string[];
}

export const apartmentSchema = new Schema<IApartment>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  rooms: { type: Number, required: true },
  baths: { type: Number, required: true },
  furnishingStatus: { type: String, required: true },
  amenities: { type: [String], required: true },
  photos: { type: [String], required: true },
});

apartmentSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export type ApartmentModelType = Model<IApartment>;
