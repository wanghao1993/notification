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
  @PrimaryGeneratedColumn()
  service_id: number;

  @Column({
    length: 100,
    comment: '服务名',
  })
  service_name: string;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
