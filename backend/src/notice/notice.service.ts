import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import {
  CreateNoticeDto,
  GetMyNoticeListDto,
  updateNoticeDto,
} from './dto/notice.dto';
import { NoticeList } from './entities/notice.entity';
import { NoticeType } from './entities/notice_type.entity';
import { NoticeStatus } from './enum/notice_enum';
import { Service } from 'src/service/entities/service.entity';
import { NoticeItemVo } from './vo/notice.vo';
import * as dayjs from 'dayjs';
import { WebsocketGatewayGateway } from 'src/websocket-gateway/websocket-gateway.gateway';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(NoticeList)
    private noticeRepository: Repository<NoticeList>,

    @InjectRepository(Service)
    private ServiceRep: Repository<Service>,

    @InjectRepository(NoticeType)
    private noticeTypeRepository: Repository<NoticeType>,

    private readonly webSocketGateway: WebsocketGatewayGateway,
  ) {}

  // 新增通知
  async createNotice(reqBody: CreateNoticeDto) {
    const notice = new NoticeList();
    notice.service_id = reqBody.service_id.join(',');
    notice.content = reqBody.content;
    notice.content_html = reqBody.content_html;
    notice.title = reqBody.title;
    notice.notice_type = reqBody.notice_type || 'notification';
    notice.notice_status = NoticeStatus.no_release;
    // todo
    notice.creator = 'isaac.wang1';
    notice.updator = 'isaac.wang1';
    await this.noticeRepository.save(notice);

    return '新增成功';
  }

  // 获取所有通知
  async getNoticeList(query: GetMyNoticeListDto) {
    const skipCount = (+query.page - 1) * +query.pageSize;
    const [noticeList, totalCount] = await this.noticeRepository.findAndCount({
      skip: skipCount,
      take: +query.pageSize,
      order: {
        update_time: 'ASC',
      },
    });

    // 获取通知类型的中文
    const { list } = await this.getNoticeTypeList();
    const listMap = {};
    list.forEach((item) => {
      listMap[item.notice_type] = item.notice_type_label;
    });

    let serviceIds: number[] = [];

    noticeList.forEach((item) => {
      serviceIds = serviceIds.concat(
        item.service_id.split(',').map((item) => +item),
      );
    });

    // 获取服务的中文

    const serviceList = await this.ServiceRep.find({
      where: {
        service_id: In([...new Set(serviceIds)]),
      },
    });

    const serviceIdNameMap = {};
    serviceList.forEach((item) => {
      serviceIdNameMap[item.service_id] = item;
    });

    const res: NoticeItemVo[] = [];
    noticeList.forEach((item) => {
      const obj = new NoticeItemVo();

      obj.content = item.content;
      obj.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss');
      obj.creator = item.creator;
      obj.id = item.id;
      obj.notice_status = item.notice_status;
      obj.notice_type = item.notice_type;
      obj.notice_type_zh = listMap[item.notice_type];
      obj.service_id = item.service_id.split(',').map((id) => +id);
      obj.service_name = serviceIdNameMap[item.service_id]?.service_name;
      obj.title = item.title;
      obj.update_time = dayjs(item.update_time).format('YYYY-MM-DD HH:mm:ss');
      obj.updator = item.updator;
      res.push(obj);
    });

    return {
      list: res,
      total_count: totalCount,
    };
  }

  // 更新通知
  async updateNotice(reqBody: updateNoticeDto) {
    const foundNotice = await this.noticeRepository.findOneBy({
      id: reqBody.id,
    });

    if (foundNotice) {
      foundNotice.notice_type = reqBody.notice_type;
      foundNotice.title = reqBody.title;
      foundNotice.content = reqBody.content;
      foundNotice.content_html = reqBody.content_html;
      foundNotice.service_id = reqBody.service_id.join(',');

      await this.noticeRepository.update(reqBody.id, foundNotice);

      return {
        msg: '更新成功',
      };
    } else {
      throw new HttpException('id不正确，没有此通知', HttpStatus.OK);
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
      throw new HttpException('id不正确，没有此通知', HttpStatus.OK);
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
      const obj = new NoticeItemVo();

      obj.content = res.content;
      obj.create_time = dayjs(res.create_time).format('YYYY-MM-DD HH:mm:ss');
      obj.creator = res.creator;
      obj.id = res.id;
      obj.notice_status = res.notice_status;
      obj.notice_type = res.notice_type;
      obj.service_id = res.service_id.split(',').map((id) => +id);
      obj.title = res.title;
      obj.update_time = dayjs(res.update_time).format('YYYY-MM-DD HH:mm:ss');
      obj.updator = res.updator;

      return obj;
    } else {
      throw new HttpException('id不正确，没有此通知', HttpStatus.OK);
    }
  }

  // 发送通知
  sendNotice = () => {
    this.webSocketGateway.sendMessage('sxx');
  };
}
