import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpAdapterHost,Reflector } from '@nestjs/core';
import { AllExceptionsFilter } from './allException.filter';
import { ClassSerializerInterceptor} from '@nestjs/common';
import { SwaggerTheme, SwaggerThemeNameEnum} from 'swagger-themes';
import { DocumentBuilder , SwaggerModule} from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    app.setGlobalPrefix('/api');
    app.enableCors()
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector), {
        strategy: 'excludeAll',
        excludeExtraneousValues: true,
      }),
    );
    const swaggerTheme = new SwaggerTheme();
    const swaggerConfig = new DocumentBuilder()
    .setTitle('CS Hospitals')
    .setDescription("Api documentation")
    .setVersion('1.0.0')
    .addTag('login', 'Login Routes')
    .addTag('list', 'Paient Listing Routes')
    .build();
    
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('swagger', app, document, {
      customCss: swaggerTheme.getBuffer(SwaggerThemeNameEnum.DARK),
    });
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
