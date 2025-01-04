import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { IPatient } from 'src/interface/patient.interface';
import { Model } from 'mongoose';

@Injectable()
export class ListService {
  create(createListDto: CreateListDto) {
    return 'This action adds a new list';
  }

  async findAll() {
    const studentData =await this.patientModel.find();
    if (!studentData || studentData.length == 0) {
        throw 'Student data not found';
    }
    return studentData;
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
