import { Controller, Get, Inject, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Inject(JwtService)
  private jwtService: JwtService;

  @Get('/status')
  getHello(): number {
    return 200;
  }

  @Get('/')
  home(): number {
    return 200;
  }
}
