import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import { PatientSchema } from './schema/patient.schema';
import { ListModule } from './list/list.module';

@Module({
  imports: [LoginModule, MongooseModule.forRoot('mongodb+srv://CS_HOSPITALS:Gq1ixBRGVMb8BdH7@cluster0.tt3fg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { dbName: 'hospital' }),
    MongooseModule.forFeature([{ name: 'patient', schema: PatientSchema }]),
    ListModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
