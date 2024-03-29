import { Column, Entity, PrimaryColumn } from 'typeorm';
export const InitNoticeData = [
  {
    notice_type: '1',
    notice_type_label: '跑马灯',
  },
  {
    notice_type: '2',
    notice_type_label: 'Modal弹窗',
  },
  {
    notice_type: '3',
    notice_type_label: '通知',
  },
];

@Entity({
  name: 't_notice_type',
})
export class NoticeType {
  @PrimaryColumn({
    length: 50,
    comment: '类型 1.跑马灯 2.modal弹窗 3.notification',
  })
  notice_type: string;

  @Column({
    length: 50,
    comment: '类型 1.跑马灯 2.modal弹窗 3.notification',
  })
  notice_type_label: string;
}
