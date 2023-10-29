import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 't_user_list',
})
export class User {
  @PrimaryColumn()
  user_name: string;

  @Column()
  service: string;

  @CreateDateColumn()
  create_time: Date;
}
