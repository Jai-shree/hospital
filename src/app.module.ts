import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListModule } from './list/list.module';
import { LoginModule } from './login/login.module';
import { JwtModule } from '@nestjs/jwt';
import { createProxyMiddleware, RequestHandler, Options } from 'http-proxy-middleware';

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
    // Team 1
      consumer
      .apply(
        createProxyMiddleware({
          target: 'https://cs-hospitals-book-appointment.onrender.com',
          changeOrigin: true,
          pathRewrite: (path) => {
            return `/v1/departments`; // Rewrite the path dynamically
          },
        })
      )
      .forRoutes({ path: '/v1/departments', method: RequestMethod.GET });

      
      consumer
      .apply(createProxyMiddleware({
        target: 'https://cs-hospitals-book-appointment.onrender.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '/api/appointment': '/v1/appointment' },
        on:{
          proxyReq: (proxyReq, req: any, res) => {
            if (req.method === "POST" && req.body) {
                const bodyData = JSON.stringify(req.body);
                proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
                proxyReq.write(bodyData);
                // console.log(proxyReq);
              }
            },
          }
        }) as RequestHandler)
        .forRoutes({ path: '/appointment', method: RequestMethod.POST });
        
        consumer
        .apply(createProxyMiddleware({
          target: 'https://cs-hospitals-book-appointment.onrender.com',
          changeOrigin: true,
          secure: false,
          pathRewrite: { '/api/registerPatient': '/v1/registerPatient' },
          on:{
            proxyReq: (proxyReq, req: any, res) => {
              if (req.method === "POST" && req.body) {
                const bodyData = JSON.stringify(req.body);
                proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
                proxyReq.write(bodyData);
                // console.log(proxyReq);
              }
            },
          }
        }) as RequestHandler)
        .forRoutes({ path: '/registerPatient', method: RequestMethod.POST });
        
        consumer
        .apply(createProxyMiddleware({
          target: 'https://cs-hospitals-book-appointment.onrender.com',
          changeOrigin: true,
          secure: false,
          pathRewrite: { '/api/searchPatient': '/v1/searchPatient' },
          on:{
            proxyReq: (proxyReq, req: any, res) => {
              if (req.method === "POST" && req.body) {
                const bodyData = JSON.stringify(req.body);
                proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
                proxyReq.write(bodyData);
                // console.log(proxyReq);
              }
            },
          }
        }) as RequestHandler)
        .forRoutes({ path: '/searchPatient', method: RequestMethod.POST });
        

        //Team 2
        consumer
        .apply(
          createProxyMiddleware({
            target: 'https://cloud-security-hospital-management.onrender.com',
            changeOrigin: true,
            pathRewrite: (path) => {
              return `/appointments`; // Rewrite the path dynamically
            },
          })
        )
        .forRoutes({ path: '/appointments', method: RequestMethod.GET });

        consumer
        .apply(
          createProxyMiddleware({
            target: 'https://cloud-security-hospital-management.onrender.com',
            changeOrigin: true,
            pathRewrite: (path) => {
              const parts = path.split('/'); // Split the path
              const uhid = parts.pop();
              return `/appointments/${uhid}`; // Rewrite the path dynamically
            },
          })
        )
        .forRoutes({ path: '/appointments/*', method: RequestMethod.GET });

      // Team 4
      consumer
        .apply(
          createProxyMiddleware({
            target: 'https://cloudsecurity.onrender.com',
            changeOrigin: true,
            pathRewrite: (path) => {
              // console.log(path);
              return `/record`; // Rewrite the path dynamically
            },
          })
        )
        .forRoutes({ path: '/record', method: RequestMethod.GET });

        consumer
        .apply(
          createProxyMiddleware({
            target: 'https://cloudsecurity.onrender.com',
            changeOrigin: true,
            pathRewrite: (path) => {
              const parts = path.split('/'); // Split the path
              const uhid = parts.pop();
              return `/record/${uhid}`; // Rewrite the path dynamically
            },
          })
        )
        .forRoutes({ path: '/record/*', method: RequestMethod.GET });
      

      // Team 5
      consumer
        .apply(
          createProxyMiddleware({
            target: 'https://billing-jgqf.onrender.com',
            changeOrigin: true,
            pathRewrite: (path) => {
              const parts = path.split('/'); // Split the path
              const uhid = parts.pop();
              return `/api/generatebill/${uhid}`; // Rewrite the path dynamically
            },
          })
        )
        .forRoutes({ path: '/generatebill/*', method: RequestMethod.GET });
      
        consumer
        .apply(
          createProxyMiddleware({
            target: 'https://billing-jgqf.onrender.com',
            changeOrigin: true,
            pathRewrite: (path) => {
              return `/api/getbills`; // Rewrite the path dynamically
            },
          })
        )
        .forRoutes({ path: '/getbills', method: RequestMethod.GET });
      
        consumer
        .apply(
          createProxyMiddleware({
            target: 'https://billing-jgqf.onrender.com',
            changeOrigin: true,
            pathRewrite: (path) => {
              return `/api/search/patients`; // Rewrite the path dynamically
            },
            on:{
              proxyReq: (proxyReq, req: any, res) => {
                if (req.query) {
                  const queryParams = new URLSearchParams(req.query).toString();
                  const newPath = `/api/search/patients?${queryParams}`;
                  // console.log(`Forwarding to: ${newPath}`);
                  proxyReq.path = newPath; 
                }
              }
          }
        }) as RequestHandler)
      .forRoutes({ path: '/search/patients', method: RequestMethod.GET });

      consumer
      .apply(createProxyMiddleware({
        target: 'https://billing-jgqf.onrender.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '/api/createbill': '/api/createbill' },
          on:{
            proxyReq: (proxyReq, req: any, res) => {
              if (req.method === "POST" && req.body) {
                const bodyData = JSON.stringify(req.body);
                proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
                proxyReq.write(bodyData);
                // console.log(proxyReq);
              }
            },
          }
      }) as RequestHandler)
      .forRoutes({ path: '/createbill', method: RequestMethod.POST });

      consumer
        .apply(
          createProxyMiddleware({
            target: 'https://billing-jgqf.onrender.com',
            changeOrigin: true,
            pathRewrite: (path) => {
              const parts = path.split('/'); // Split the path
              const uhid = parts.pop();
              return `/api/deletebill/${uhid}`; // Rewrite the path dynamically
            },
          })
        )
        .forRoutes({ path: '/deletebill/*', method: RequestMethod.DELETE });
      // consumer
      //   .apply(
      //     createProxyMiddleware({
      //       target: 'https://billing-jgqf.onrender.com',
      //       changeOrigin: true,
      //       pathRewrite: (path) => {
      //         // Replace /bills/ with /api/
      //         return path.replace('/bills/', '/');
      //       },
      //       on:{
      //         proxyReq: (proxyReq, req: any) => {
      //         if (req.body) {
      //           const bodyData = JSON.stringify(req.body);
      //           proxyReq.setHeader('Content-Type', 'application/json');
      //           proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      //           proxyReq.write(bodyData);
      //         }
      //       }}
      //     })
      //   )
      //   .forRoutes({ path: '/bills/*', method: RequestMethod.ALL });

      // Team 6
      consumer
      .apply(createProxyMiddleware({
        target: 'https://casenotes-backend.onrender.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '/api/patients': '/patients' },
          on:{
            proxyReq: (proxyReq, req: any, res) => {
              if (req.method === "POST" && req.body) {
                const bodyData = JSON.stringify(req.body);
                proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
                proxyReq.write(bodyData);
                console.log(proxyReq);
              }
            },
          }
      }) as RequestHandler)
      .forRoutes({ path: '/patients', method: RequestMethod.POST });

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

      // Team 7
      consumer
        .apply(
          createProxyMiddleware({
            target: 'https://cs-hospitals-team7.onrender.com',
            changeOrigin: true,
            pathRewrite: (path) => {
              return `/api/doctors`; // Rewrite the path dynamically
            },
          })
        )
        .forRoutes({ path: '/t7/doctors', method: RequestMethod.GET });

        consumer
        .apply(
          createProxyMiddleware({
            target: 'https://cs-hospitals-team7.onrender.com',
            changeOrigin: true,
            pathRewrite: (path) => {
              return `/api/departments`; // Rewrite the path dynamically
            },
          })
        )
        .forRoutes({ path: '/departments', method: RequestMethod.GET });


        consumer
      .apply(createProxyMiddleware({
        target: 'https://cs-hospitals-team7.onrender.com',
        changeOrigin: true,
        secure: false,
          on:{
            proxyReq: (proxyReq, req: any, res) => {
              if (req.method === "POST" && req.body) {
                const bodyData = JSON.stringify(req.body);
                proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
                proxyReq.write(bodyData);
                console.log(proxyReq);
              }
            },
          }
      }) as RequestHandler)
      .forRoutes({ path: '/addDoctors', method: RequestMethod.POST });


      consumer
      .apply(createProxyMiddleware({
        target: 'https://cs-hospitals-team7.onrender.com',
        changeOrigin: true,
        secure: false,
          on:{
            proxyReq: (proxyReq, req: any, res) => {
              if (req.method === "POST" && req.body) {
                const bodyData = JSON.stringify(req.body);
                proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
                proxyReq.write(bodyData);
                console.log(proxyReq);
              }
            },
          }
      }) as RequestHandler)
      .forRoutes({ path: '/addDepartment', method: RequestMethod.POST });

      // Team 8
      consumer
        .apply(
          createProxyMiddleware({
            target: 'https://backend-cs-051y.onrender.com',
            changeOrigin: true,
            pathRewrite: (path) => {
              return `/api/reports/total-patients`; // Rewrite the path dynamically
            },
          })
        )
        .forRoutes({ path: '/reports/total-patients', method: RequestMethod.GET });

        consumer
        .apply(
          createProxyMiddleware({
            target: 'https://backend-cs-051y.onrender.com',
            changeOrigin: true,
            pathRewrite: (path) => {
              return `/api/reports/total-patients`; // Rewrite the path dynamically
            },
          })
        )
        .forRoutes({ path: '/reports/total-patients', method: RequestMethod.GET });

        consumer
        .apply(
          createProxyMiddleware({
            target: 'https://backend-cs-051y.onrender.com',
            changeOrigin: true,
            pathRewrite: (path) => {
              return `/api/reports/total-appointments`; // Rewrite the path dynamically
            },
          })
        )
        .forRoutes({ path: '/reports/total-appointments', method: RequestMethod.GET });
  }
}
