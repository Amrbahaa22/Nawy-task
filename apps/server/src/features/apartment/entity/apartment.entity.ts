import { ApiProperty } from '@nestjs/swagger';

export class ApartmentEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  price!: number;

  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  rooms!: number;

  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  baths!: number;

  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  area!: number;

  @ApiProperty()
  furnishingStatus!: string;

  @ApiProperty({
    type: String,
    isArray: true,
  })
  amenities!: string[];

  @ApiProperty({
    type: String,
    isArray: true,
  })
  photos!: string[];
}
