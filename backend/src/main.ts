import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './my-http-exception-filter/my-http-exception-filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './transform/transform.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    origin: 'http://localhost:3003',
    credentials: true,
    optionsSuccessStatus: 200,
  });
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new TransformInterceptor());
  const options = new DocumentBuilder()
    .setTitle('通知系统')
    .setDescription('自定通知系统后台')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
