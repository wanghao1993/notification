import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  GetUserListDto,
  UserLoginDto,
  UserRegisterService,
} from './dto/user.dto';
import { MyValidatePipe } from 'src/my-validate-pipe/my-validate.pipe';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post('register_service')
  async register(@Body(MyValidatePipe) data: UserRegisterService) {
    return await this.userService.register(data);
  }

  @Get('list')
  async getUserList(@Query(MyValidatePipe) data: GetUserListDto) {
    return await this.userService.getUserList(data);
  }

  @Post('login')
  async userLogin(
    @Body(MyValidatePipe) data: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.userLogin(data);
    const token = await this.jwtService.signAsync({
      user: {
        user_name: user.user_name,
      },
    });

    if (user) {
      res.setHeader('token', token);
      return '登录成功';
    } else {
      return '登录失败';
    }
  }

  // @Post('remove_service')
  // async removeRegister() {}
}
