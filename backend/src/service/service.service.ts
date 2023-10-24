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
import { updateNoticeDto } from 'src/notice/dto/notice.dto';

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

  async remove(id: number) {
    const service = await this.serviceRepository.findOneBy({
      service_id: id,
    });

    if (service) {
      await this.serviceRepository.remove(service);
    } else {
      throw new HttpException('服务不存在', HttpStatus.OK);
    }
  }

  async getDetail(id: number) {
    const service = await this.serviceRepository.findOneBy({
      service_id: id,
    });

    if (service) {
      return service;
    } else {
      throw new HttpException('服务不存在', HttpStatus.OK);
    }
  }

  async update(data: UpdateServiceDto) {
    const service = await this.serviceRepository.findOneBy({
      service_id: data.service_id,
    });

    if (service) {
      const updatedService = await this.serviceRepository.save({
        ...data,
      });

      return updatedService;
    } else {
      throw new HttpException('服务不存在', HttpStatus.OK);
    }
  }
}
