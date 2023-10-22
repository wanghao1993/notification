import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { MyValidatePipe } from 'src/my-validate-pipe/my-validate.pipe';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('create')
  async create(@Body(MyValidatePipe) createServiceDto: CreateServiceDto) {
    const service = await this.serviceService.create(createServiceDto);
    return service;
  }

  @Get('list')
  findAll() {
    return this.serviceService.findAll();
  }

  @Delete('delete/:serviceName')
  remove(@Param('serviceName') serviceName: string) {
    return this.serviceService.remove(serviceName);
  }
}
