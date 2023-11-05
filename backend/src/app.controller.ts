import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/status')
  getHello(): number {
    return 200;
  }

  @Get('/')
  home(): number {
    return 200;
  }
}
