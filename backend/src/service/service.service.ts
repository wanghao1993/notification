import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceItem } from './vo/service.vo';
import { UserServer } from 'src/user/entities/user.server.entity';
import { formateDate } from 'src/shared/date_format';
import { JwtUtil } from 'src/utils';
@Injectable()
export class ServiceService {
  constructor(private readonly jwtUtil: JwtUtil) {}
  @InjectRepository(Service, 'mysql')
  private serviceRepository: Repository<Service>;

  async create(createServiceDto: CreateServiceDto, authorization: string) {
    const isExist = await this.serviceRepository.findOneBy({
      service_name: createServiceDto.service_name,
    });

    if (isExist) {
      throw new HttpException('服务名重复', HttpStatus.OK);
    }
    const service = new Service();

    // 默认为登陆人
    service.administrator =
      createServiceDto.administrator ||
      this.jwtUtil.getUserFromToken(authorization).user;
    service.service_name = createServiceDto.service_name;
    service.service_status = createServiceDto.service_status;
    if (!service.administrator) {
      throw new HttpException('管理员不能为空', HttpStatus.OK);
    }
    const user = new UserServer();

    user.service_name = createServiceDto.service_name;
    user.user_names = createServiceDto.administrator;

    return await this.serviceRepository.save(service);
  }

  async findAll() {
    const [list, count] = await this.serviceRepository.findAndCount();

    return {
      list: list.map((item) => {
        const vo = new ServiceItem();
        vo.create_time = formateDate(item.create_time);
        vo.administrator = item.administrator.split(',');
        vo.service_id = item.service_id;
        vo.service_name = item.service_name;
        vo.service_status = item.service_status;
        vo.update_time = formateDate(item.update_time);
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
