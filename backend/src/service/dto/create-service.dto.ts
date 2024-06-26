import { IsNotEmpty } from 'class-validator';
import { ServiceStatus } from 'src/enum/service';

export class CreateServiceDto {
  @IsNotEmpty({
    message: '服务名不可为空',
  })
  service_name: string;

  administrator: string;

  @IsNotEmpty({
    message: '服务状态',
  })
  service_status: ServiceStatus;
}
