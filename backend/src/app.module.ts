import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoticeModule } from './notice/notice.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeList } from './notice/entities/notice.entity';
import { NoticeType } from './notice/entities/notice_type.entity';
import { Service } from './service/entities/service.entity';
import { ServiceModule } from './service/service.module';
import { ResponseMiddleware } from './response/response.middleware';
@Module({
  imports: [
    NoticeModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '123456',
      database: 'notice',
      synchronize: true,
      logging: true,
      entities: [NoticeList, NoticeType, Service],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService, ResponseMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseMiddleware).forRoutes('*');
  }
}
