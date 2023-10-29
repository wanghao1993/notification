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
import { ServiceItem } from './vo/service.vo';
import * as dayjs from 'dayjs';

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
      list: list.map((item) => {
        const vo = new ServiceItem();
        vo.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss');
        vo.administrator = item.administrator.split(',');
        vo.service_id = item.service_id;
        vo.service_name = item.service_name;
        vo.service_status = item.service_status;
        vo.update_time = dayjs(item.update_time).format('YYYY-MM-DD HH:mm:ss');
        return vo;
      }),
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
