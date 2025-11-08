import { Body, Get, Param } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { ApartmentEntity } from './entity/apartment.entity';
import { Controller, Post } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FormDataRequest } from 'nestjs-form-data';
import { Readable } from 'stream';

@Controller('v1/apartment')
export class ApartmentController {
  constructor(
    private readonly apartmentService: ApartmentService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateApartmentDto })
  @ApiOkResponse({ type: ApartmentEntity })
  async createApartment(@Body() createApartmentDto: CreateApartmentDto) {
    const files: Express.Multer.File[] = createApartmentDto.photos.map(
      (photo) => ({
        fieldname: 'photos',
        stream: Readable.from(photo.buffer),
        originalname: photo.originalName,
        encoding: '7bit', // or the actual encoding
        mimetype: 'image/jpeg', // or the actual MIME type
        buffer: photo.buffer,
        size: photo.buffer.length,
        destination: '', // optional, if you have a destination
        filename: '', // optional, if you have a filename
        path: '', // optional, if you have a path
      }),
    );

    const res = await Promise.all(
      files.map((file) => this.cloudinaryService.uploadFile(file)),
    );
    const imagesUrls = res.map((item) => item.secure_url);

    return this.apartmentService.createApartment(
      createApartmentDto,
      imagesUrls,
    );
  }
  @ApiOkResponse({ type: ApartmentEntity, isArray: true })
  @Get()
  getApartments() {
    return this.apartmentService.getAllApartments();
  }
  @ApiOkResponse({ type: [ApartmentEntity] })
  @Get('/:id')
  getApartment(@Param('id') apartmentId: string) {
    return this.apartmentService.getApartmentById(apartmentId);
  }
}
