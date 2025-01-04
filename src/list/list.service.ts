import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from 'src/schema/Patient.schema';
import { Model } from 'mongoose';

@Injectable()
export class ListService {
  constructor(@InjectModel(Patient.name) private patientModel:Model<Patient>){}
  create(createListDto: CreateListDto) {
    return 'This action adds a new list';
  }

  async findAll() {
    const data = await this.patientModel.find();
    if (!data || data.length == 0) {
        //throw new NotFoundException('Students data not found!');
        console.log('Student data not found');
    }
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} list`;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
