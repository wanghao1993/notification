import { Module } from '@nestjs/common';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeList } from './entities/notice.entity';
import { NoticeType } from './entities/notice_type.entity';
import { Service } from 'src/service/entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeList, NoticeType, Service])],
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class NoticeModule {}
