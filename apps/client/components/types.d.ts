export interface PropertyType {
  id?: string;
  title: string;
  description: string;
  type: string;
  price: number;
  rooms: number;
  baths: number;
  area: number;
  amenities: string[];
  furnishingStatus: string;
  photos: string[];
}
