import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NoticeStatus } from '../enum/notice_enum';
import * as dayjs from 'dayjs';

@Entity({
  name: 't_notice_list',
})
export class NoticeList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '服务',
  })
  service_id: string;

  @Column({
    length: 200,
    comment: '标题',
  })
  title: string;

  @Column({
    comment: '内容',
  })
  content: string;

  @Column({
    comment: 'HMTL内容',
  })
  content_html: string;

  @Column({
    comment: '创建人',
  })
  creator: string;

  @Column({
    comment: '更新人',
  })
  updator: string;

  @Column({
    length: 50,
    comment: '类型 1.跑马灯 2.modal 3.message',
  })
  notice_type: string;

  @Column({
    comment: '0.未发送 1.已发送 2.撤回',
  })
  notice_status: NoticeStatus;

  @CreateDateColumn({
    default: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  })
  create_time: Date;

  @UpdateDateColumn({
    default: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  })
  update_time: Date;
}
