import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import {
  ChangeReadStatusDto,
  CreateNoticeDto,
  GetMyNoticeListDto,
  updateNoticeDto,
} from './dto/notice.dto';
import { NoticeList } from './entities/notice.entity';
import { NoticeType } from './entities/notice_type.entity';
import { NoticeStatus, NoticeStatusText } from './enum/notice_enum';
import { Service } from 'src/service/entities/service.entity';
import { NoticeItemVo } from './vo/notice.vo';
import { WebsocketGatewayGateway } from 'src/websocket-gateway/websocket-gateway.gateway';
import { NoticeReadStatus } from './entities/notice_read_status.entity';
import { NoticeErrorMsg } from './notice.errormsg';
import { formateDate } from 'src/shared/date_format';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(NoticeList, 'mysql')
    private readonly noticeRepository: Repository<NoticeList>,

    @InjectRepository(Service, 'mysql')
    private readonly ServiceRep: Repository<Service>,

    @InjectRepository(NoticeReadStatus, 'mongodbconnection')
    private readonly NoticeReadRep: Repository<NoticeReadStatus>,

    @InjectRepository(NoticeType, 'mysql')
    private readonly noticeTypeRepository: Repository<NoticeType>,
    private readonly webSocketGateway: WebsocketGatewayGateway,
  ) {}

  // 返回给前端的
  getNoticeItem(
    item: NoticeList,
    listMap = {},
    serviceIdNameMap = {},
  ): NoticeItemVo {
    const obj = new NoticeItemVo();
    obj.title = item.title;
    obj.content = item.content;
    obj.create_time = formateDate(item.create_time);
    obj.creator = item.creator;
    obj.id = item.id;
    obj.notice_status = item.notice_status;
    obj.notice_type = item.notice_type;
    obj.notice_type_zh = listMap[item.notice_type];
    obj.service_id = item.service_id.split(',').map((id) => +id);
    obj.service_name = serviceIdNameMap[item.service_id]?.service_name;
    obj.title = item.title;
    obj.update_time = formateDate(item.update_time);
    obj.updator = item.updator;
    obj.notice_status_text = NoticeStatusText.toString(item.notice_status);

    return obj;
  }

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
        update_time: 'desc',
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
      const obj = this.getNoticeItem(item, listMap, serviceIdNameMap);
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
      throw new HttpException(NoticeErrorMsg.NO_EXIST, HttpStatus.OK);
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
      throw new HttpException(NoticeErrorMsg.NO_EXIST, HttpStatus.OK);
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
      return this.getNoticeItem(res);
    } else {
      throw new HttpException(NoticeErrorMsg.NO_EXIST, HttpStatus.OK);
    }
  }

  // 发送通知
  sendNotice = async (notice_id: number) => {
    const noticeDetail = await this.noticeRepository.findOneBy({
      id: notice_id,
    });

    if (noticeDetail.notice_status !== NoticeStatus.revoke) {
      if (noticeDetail) {
        // 判断是否已经有发布的记录了
        const isExist = await this.NoticeReadRep.findOneBy({
          notice_id,
        });

        // 如果存在就重置通知和用户的已读的关系
        let noticeRead;
        if (isExist) {
          this.NoticeReadRep.update(isExist.notice_id, {
            read_user_list: [],
          });
        } else {
          noticeRead = this.NoticeReadRep.create({
            notice_id,
            read_user_list: [],
          });
        }
        this.webSocketGateway.sendMessage('sxx');
        this.noticeRepository.update(notice_id, {
          notice_status: NoticeStatus.released,
        });

        await this.NoticeReadRep.save(noticeRead);

        return noticeRead;
      } else {
        throw new HttpException(NoticeErrorMsg.NO_EXIST, HttpStatus.OK);
      }
    } else {
      throw new HttpException(
        `${NoticeErrorMsg.ALREADY_REVOKE}`,
        HttpStatus.OK,
      );
    }
  };

  // 撤销通知
  revokeNotice = async (notice_id: number) => {
    const noticeDetail = await this.noticeRepository.findOneBy({
      id: notice_id,
    });

    if (noticeDetail) {
      const res = await this.noticeRepository.update(notice_id, {
        notice_status: NoticeStatus.revoke,
      });

      return res;
    } else {
      throw new HttpException(NoticeErrorMsg.NO_EXIST, HttpStatus.OK);
    }
  };

  // 恢复
  recoverNotice = async (notice_id: number) => {
    const noticeDetail = await this.noticeRepository.findOneBy({
      id: notice_id,
    });

    if (noticeDetail) {
      await this.noticeRepository.update(notice_id, {
        notice_status: NoticeStatus.no_release,
      });
    } else {
      throw new HttpException(NoticeErrorMsg.NO_EXIST, HttpStatus.OK);
    }
  };

  // 修改通知的阅读状态
  changeReadStatus = async (data: ChangeReadStatusDto) => {
    const { notice_id, user_id } = data;
    const noticeDetail = await this.noticeRepository.findOneBy({
      id: notice_id,
    });

    if (noticeDetail) {
      await this.noticeRepository.update(notice_id, {
        notice_status: NoticeStatus.no_release,
      });
      const noticeRead = await this.NoticeReadRep.findOneBy({
        notice_id,
      });

      const { read_user_list = [] } = noticeRead;

      if (read_user_list.includes(user_id)) return;

      read_user_list.push(user_id);
      this.NoticeReadRep.update(noticeRead.id, {
        read_user_list,
      });
    } else {
      throw new HttpException(NoticeErrorMsg.NO_EXIST, HttpStatus.OK);
    }
  };
}
