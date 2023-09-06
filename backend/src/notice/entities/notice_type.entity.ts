import { Column, Entity, PrimaryColumn } from 'typeorm';

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
