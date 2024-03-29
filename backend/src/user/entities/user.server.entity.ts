import { Service } from 'src/service/entities/service.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 't_user_service',
})
export class UserServer {
  @PrimaryGeneratedColumn({
    comment: '服务ID',
  })
  service_id: number;

  @Column()
  service_name: string;

  @Column()
  user_names: string;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
