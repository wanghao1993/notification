import { ServiceStatus } from 'src/enum/service';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity({
  name: 't_service_list',
})
export class Service {
  @PrimaryGeneratedColumn({
    comment: '服务ID.',
  })
  service_id: number;

  @Column({
    length: 100,
    comment: '服务名',
  })
  service_name: string;

  @OneToOne(() => User, (user) => user.subscrible_user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  subscrible_user: User;

  @Column({
    comment: '服务状态',
  })
  service_status: ServiceStatus;

  @Column({
    length: 300,
    comment: '负责人',
  })
  administrator: string;

  @CreateDateColumn()
  create_time: string;

  @UpdateDateColumn()
  update_time: string;
}
