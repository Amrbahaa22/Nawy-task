import { ConfigModule } from '@nestjs/config';
import { ApartmentController } from './apartment.controller';
import { Module } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { defaultConfiguration } from 'src/common/config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import {
  apartmentModelName,
  apartmentSchema,
} from 'src/common/models/apartment';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CloudinaryProvider } from '../cloudinary/cloudinary.provider';


@Module({
  imports: [
    NestjsFormDataModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '../../.env'],
      load: [() => defaultConfiguration],
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([
      { name: apartmentModelName, schema: apartmentSchema },
    ]),
  ],
  providers: [ApartmentService, CloudinaryService, CloudinaryProvider],
  controllers: [ApartmentController],
})
export class ApartmentModule {}
