import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListModule } from './list/list.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://CS_HOSPITALS:Gq1ixBRGVMb8BdH7@cluster0.tt3fg.mongodb.net/hospital?retryWrites=true&w=majority&appName=Cluster0', { dbName: 'hospital' }),
    ListModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
