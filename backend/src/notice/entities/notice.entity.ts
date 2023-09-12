import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 't_notice_list',
})
export class NoticeList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 200,
    comment: '标题',
  })
  title: string;

  @Column({
    length: 5000,
    comment: '内容',
  })
  content: string;

  @Column({
    length: 50,
    comment: '类型 1.跑马灯 2.modal 3.message',
  })
  notice_type: string;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
