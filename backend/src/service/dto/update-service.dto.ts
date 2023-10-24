import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @IsNotEmpty({
    message: '服务ID不可为空',
  })
  service_id: number;
}
