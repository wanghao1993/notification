import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateNoticeDto,
  GetMyNoticeListDto,
  updateNoticeDto,
} from './dto/notice.dto';
import { NoticeList } from './entities/notice.entity';
import { NoticeType } from './entities/notice_type.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(NoticeList)
    private noticeRepository: Repository<NoticeList>,

    @InjectRepository(NoticeType)
    private noticeTypeRepository: Repository<NoticeType>,
  ) {}

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

    const { list } = await this.getNoticeTypeList();
    const listMap = {};
    list.forEach((item) => {
      listMap[item.notice_type] = item.notice_type_label;
    });

    noticeList.forEach((item) => {
      item['notice_type'] = listMap[item.notice_type];
    });
    return {
      list: noticeList,
      total_count: totalCount,
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
      id,
    });

    if (foundNotice) {
      await this.noticeRepository.remove(foundNotice);

      return {
        msg: '删除成功',
      };
    } else {
      throw Error('id不正确，没有此通知');
    }
  }

  // 获取通知类型
  async getNoticeTypeList() {
    const res = await this.noticeTypeRepository.find();

    return {
      list: res,
    };
  }

  // 通过id获取通知

  async getNoticeById(id: number) {
    const res = await this.noticeRepository.findOneBy({
      id,
    });

    if (res) {
      return res;
    } else {
      throw new HttpException('id不正确', 500);
    }
  }
}
