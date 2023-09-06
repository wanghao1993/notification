import { Module } from '@nestjs/common';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeList } from './entities/notice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeList])],
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class NoticeModule {}
