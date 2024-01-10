import { ServiceStatus } from 'src/enum/service';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
