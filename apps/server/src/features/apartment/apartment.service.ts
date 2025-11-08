import { ApartmentModelType, IApartment } from '../../common/models/apartment';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { apartmentModelName } from 'src/common/models/apartment';
import { CreateApartmentDto } from './dto/create-apartment.dto';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectModel(apartmentModelName) private apartmentModel: ApartmentModelType,
  ) {}

  async createApartment(
    createApartmentDto: CreateApartmentDto,
    urls: string[],
  ): Promise<IApartment> {
    const createdApartment = new this.apartmentModel({
      ...createApartmentDto,
      photos: urls,
    });
    return createdApartment.save();
  }

  async getAllApartments(): Promise<IApartment[]> {
    const allApartments = await this.apartmentModel.find();
    if (!allApartments || allApartments.length == 0) {
      throw new NotFoundException('Apartments Data data not found!');
    }
    return allApartments;
  }

  async getApartmentById(id: string): Promise<IApartment> {
    const existingApartment = await this.apartmentModel.findById(id).exec();

    if (!existingApartment) {
      throw new NotFoundException(`Apartment #${id} not found`);
    }

    return existingApartment;
  }
}
