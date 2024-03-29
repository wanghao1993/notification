import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class MyValidatePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata) {
      return value;
    }
    const object = plainToInstance(metadata.metatype, value);

    const errors = await validate(object);

    if (errors.length > 0) {
      const errormsg = errors
        .map((item) => Object.values(item.constraints))
        .join(',');
      throw new BadRequestException(errormsg);
    }
    return value;
  }
}
