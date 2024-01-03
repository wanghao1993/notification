import { UserStatus } from 'src/enum/userStatus';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 't_user',
})
export class User {
  @PrimaryColumn({
    comment: '用户名',
  })
  user_name: string;

  @Column({
    comment: '密码',
  })
  password: string;

  @Column({
    comment: '用户状态',
  })
  status: UserStatus;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
