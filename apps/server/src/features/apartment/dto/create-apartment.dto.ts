import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  HasMimeType,
  IsFile,
  IsFiles,
  MemoryStoredFile,
} from 'nestjs-form-data';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateApartmentDto {
  @ApiProperty({ description: 'Title of the apartment', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ description: 'Description of the apartment', maxLength: 200 })
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ description: 'Type of the apartment', maxLength: 30, example: 'Apartment' })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty({ description: 'Price per month', example: '1500' })
  @IsString()
  @IsNotEmpty()
  readonly price: string;

  @ApiProperty({ description: 'Number of rooms', example: '2' })
  @IsString()
  @IsNotEmpty()
  readonly rooms: string;

  @ApiProperty({ description: 'Number of bathrooms', example: '1' })
  @IsString()
  @IsNotEmpty()
  readonly baths: string;

  @ApiProperty({ description: 'Area in square feet', example: '1500' })
  @IsString()
  @IsNotEmpty()
  readonly area: string;

  @ApiProperty({ description: 'Furnishing status', example: 'furnished', maxLength: 30 })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly furnishingStatus: string;

  @ApiProperty({
    description: 'List of amenities (can be sent as multiple values or JSON string)',
    type: [String],
    example: ['Wifi', 'Full kitchen', 'Washer & Dryer'],
    isArray: true
  })
  @Transform(({ value }) => {
    // Handle if amenities comes as a JSON string
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed.map(String) : [String(value)];
      } catch {
        return [String(value)];
      }
    }
    // Handle if it's already an array
    if (Array.isArray(value)) {
      return value.map(String);
    }
    // Default case
    return [];
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly amenities: string[];

  @ApiProperty({
    description: 'Photos of the apartment',
    type: 'array',
    items: { type: 'string', format: 'binary' }
  })
  @IsNotEmpty()
  @IsFiles()
  @HasMimeType(['image/jpeg', 'image/png'], { each: true })
  readonly photos: MemoryStoredFile[];
}
