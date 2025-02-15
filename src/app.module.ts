import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListModule } from './list/list.module';
import { LoginModule } from './login/login.module';
import { JwtModule } from '@nestjs/jwt';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://CS_HOSPITALS:Gq1ixBRGVMb8BdH7@cluster0.tt3fg.mongodb.net/hospital?retryWrites=true&w=majority&appName=Cluster0', { dbName: 'hospital' }),
    ListModule,
    LoginModule,
    JwtModule.register({
      global: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        createProxyMiddleware({
          target: 'https://grindtechs.in', 
          changeOrigin: true,
        })
      )
      .forRoutes('/proxy1','/hello'); // Proxy requests to /proxy_path_one
      

      consumer
      .apply(
        createProxyMiddleware({
          target: 'https://casenotes-backend.onrender.com',
          changeOrigin: true,
          pathRewrite: (path) => {
            const parts = path.split('/'); // Split the path
            const uhid = parts.pop(); // Extract the last part as UHID
            // console.log(`Original Path: ${path}`);
            // console.log(`Extracted UHID: ${uhid}`);
            return `/patients/${uhid}`; // Rewrite the path dynamically
          },
        })
      )
      .forRoutes({ path: '/patients/*', method: RequestMethod.GET });

      consumer
      .apply(
        createProxyMiddleware({
          target: 'https://casenotes-backend.onrender.com',
          changeOrigin: true,
          pathRewrite: (path) => {
            console.log(path);// Split the path
            return `/patients`; // Rewrite the path dynamically
          },
        })
      )
      .forRoutes({ path: '/patients', method: RequestMethod.POST });


      consumer
      .apply(
        createProxyMiddleware({
          target: 'https://blogspot-g6zd.onrender.com', // Custom target for this path
          changeOrigin: true,
        })
      )
      .forRoutes('/proxy2');
  }
}
