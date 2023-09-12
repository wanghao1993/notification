import { Injectable } from '@nestjs/common';
import {
  CreateNoticeDto,
  GetMyNoticeListDto,
  updateNoticeDto,
} from './dto/notice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NoticeList } from './entities/notice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeService {
  @InjectRepository(NoticeList)
  private noticeRepository: Repository<NoticeList>;
  // 新增通知
  async createNotice(reqBody: CreateNoticeDto) {
    const notice = new NoticeList();
    notice.content = reqBody.content;
    notice.title = reqBody.title;
    notice.notice_type = reqBody.notice_type || 'notifacation';
    await this.noticeRepository.save(notice);
    return '新增成功';
  }

  // 获取所有通知
  async getNoticeList(query: GetMyNoticeListDto) {
    const skipCount = (+query.page - 1) * +query.pageSize;
    const [noticeList, totalCount] = await this.noticeRepository.findAndCount({
      skip: skipCount,
      take: +query.pageSize,
    });
    return {
      data: noticeList,
      totalCount,
    };
  }

  // 更新通知
  async updateNotice(reqBody: updateNoticeDto) {
    const foundNotice = await this.noticeRepository.findOneBy({
      id: +reqBody.id,
    });
    if (foundNotice) {
      foundNotice.notice_type = reqBody.notice_type;
      foundNotice.title = reqBody.title;
      foundNotice.content = reqBody.content;
      await this.noticeRepository.save(foundNotice);
      return {
        msg: '更新成功',
      };
    } else {
      throw Error('id不正确，没有此通知');
    }
  }

  // 删除通知
  async deleteNotice(id: number) {
    const foundNotice = await this.noticeRepository.findOneBy({
      id: +id,
    });

    console.log(foundNotice);
    if (foundNotice) {
      await this.noticeRepository.remove(foundNotice);
      return {
        msg: '删除成功',
      };
    } else {
      throw Error('id不正确，没有此通知');
    }
  }
}
