import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({
  name: 't_notice_read_status',
})
export class NoticeReadStatus {
  @ObjectIdColumn()
  id: number;

  @Column()
  notice_id: number;

  @Column()
  read_user_list: string[];
}
