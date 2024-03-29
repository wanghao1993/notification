import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoticeModule } from './notice/notice.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeList } from './notice/entities/notice.entity';
import { NoticeType } from './notice/entities/notice_type.entity';
import { Service } from './service/entities/service.entity';
import { JwtModule } from '@nestjs/jwt';
import { ServiceModule } from './service/service.module';
import { UserServer } from './user/entities/user.server.entity';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { NoticeReadStatus } from './notice/entities/notice_read_status.entity';
import { jwtConstants } from './auth';
import { UtilsModule } from './utils/index.module';
@Module({
  imports: [
    NoticeModule,
    UtilsModule,

    TypeOrmModule.forRoot({
      name: 'mysql',
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '123456',
      database: 'notice',
      synchronize: true,
      logging: false,
      entities: [NoticeList, NoticeType, UserServer, User, Service],
      poolSize: 10,
      connectorPackage: 'mysql2',
    }),

    TypeOrmModule.forRoot({
      name: 'mongodbconnection',
      type: 'mongodb',
      host: 'localhost',
      port: 9000,
      logging: true,
      database: 't_notice_read_status',
      entities: [NoticeReadStatus],
      synchronize: true,
    }),

    ServiceModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
