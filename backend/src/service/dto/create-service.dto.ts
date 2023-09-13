import { IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty({
    message: '服务名不可为空',
  })
  service_name: string;
}
