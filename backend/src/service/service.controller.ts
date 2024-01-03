import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
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

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.remove(id);
  }

  @Get('detail/:id')
  getServiceDetailById(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.getDetail(id);
  }

  @Put('update')
  updateService(@Body(MyValidatePipe) data: UpdateServiceDto) {
    return this.serviceService.update(data);
  }
}
