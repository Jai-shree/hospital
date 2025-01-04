import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientSchema } from 'src/schema/Patient.schema';
import { Patient } from 'src/schema/Patient.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name: Patient.name,
      schema: PatientSchema
    }])
  ],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
