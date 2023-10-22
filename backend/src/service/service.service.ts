import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  @InjectRepository(Service)
  private serviceRepository: Repository<Service>;

  async create(createServiceDto: CreateServiceDto) {
    return await this.serviceRepository.save(createServiceDto);
  }

  async findAll() {
    const [list, count] = await this.serviceRepository.findAndCount();
    return {
      list: list,
      total_count: count,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  async remove(serviceName: string) {
    const service = await this.serviceRepository.findOneBy({
      service_name: serviceName,
    });

    if (service) {
      await this.serviceRepository.remove(service);
    } else {
      throw new HttpException('服务不存在', HttpStatus.OK);
    }
  }
}
