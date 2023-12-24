import { Module } from '@nestjs/common';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeList } from './entities/notice.entity';
import { NoticeType } from './entities/notice_type.entity';
import { Service } from 'src/service/entities/service.entity';
import { WebsocketGatewayGateway } from 'src/websocket-gateway/websocket-gateway.gateway';
import { NoticeReadStatus } from './entities/notice_read_status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NoticeList, NoticeType, Service], 'mysql'),
    TypeOrmModule.forFeature([NoticeReadStatus], 'mongodbconnection'),
  ],
  controllers: [NoticeController],
  providers: [NoticeService, WebsocketGatewayGateway],
})
export class NoticeModule {}
