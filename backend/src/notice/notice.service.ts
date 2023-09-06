import { Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/notice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NoticeList } from './entities/notice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeService {
  @InjectRepository(NoticeList)
  private noticeRepository: Repository<NoticeList>;
  async createNotice(reqBody: CreateNoticeDto) {
    const notice = new NoticeList();
    notice.content = reqBody.content;
    notice.title = reqBody.title;
    notice.notice_type = reqBody.notice_type || 'notifacation';
    await this.noticeRepository.save(notice);
    return '新增成功';
  }
}
