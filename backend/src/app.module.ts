import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoticeModule } from './notice/notice.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeList } from './notice/entities/notice.entity';
import { NoticeType } from './notice/entities/notice_type.entity';
import { Service } from './service/entities/service.entity';
import { ServiceModule } from './service/service.module';
import { UseerModule } from './useer/useer.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
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
      entities: [NoticeList, NoticeType, Service, User],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    ServiceModule,
    UseerModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
