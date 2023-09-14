import { BadRequestException, Injectable } from '@nestjs/common';
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
    const founceService = this.serviceRepository.findOneBy({
      service_name: createServiceDto.service_name,
    });

    if (founceService) {
      throw new BadRequestException('当前服务已存在');
    } else {
      return await this.serviceRepository.save(createServiceDto);
    }
  }

  findAll() {
    return `This action returns all service`;
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
