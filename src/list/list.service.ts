import { Injectable } from '@nestjs/common';
import { UserResponseDto } from './dto/create-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from 'src/schema/Patient.schema';
import { Model } from 'mongoose';

@Injectable()
export class ListService {
  constructor(@InjectModel(Patient.name) private patientModel: Model<Patient>) { }

  async findAll() {
    const data = await this.patientModel.find();
    if (!data || data.length == 0) {
      //throw new NotFoundException('Students data not found!');
      console.log('Student data not found');
    }
    console.log(data)
    return data.map((elt) => new UserResponseDto({
      firstName: elt.firstName,
      lastName: elt.lastName,
      lastVisit: elt.lastVisit,
      UHID: elt.UHID,
      age: elt.age,
      totalAppoinments: elt.totalAppointments
    }));
  }
}
