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
  name: 't_service_user_list',
})
export class User {
  @PrimaryGeneratedColumn({
    comment: '服务ID',
  })
  service_id: number;

  @Column()
  service_name: string;

  @OneToOne(() => Service, (service) => service.subscrible_user)
  subscrible_user: Service;

  @Column()
  user_names: string;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
