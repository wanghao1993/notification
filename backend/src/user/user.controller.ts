import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Req,
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
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';
import { jwtConstants } from 'src/auth';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post('register_service')
  async register(@Body(MyValidatePipe) data: UserRegisterService) {
    return await this.userService.register(data);
  }

  @ApiOperation({ summary: '获取用户列表' })
  @ApiQuery({
    name: 'page',
    type: String,
    required: true,
    description: '当前第几页',
  })
  @ApiQuery({
    name: 'pageSize',
    type: String,
    required: true,
    description: '当前第每页多少条',
  })
  @ApiQuery({
    name: 'keyword',
    type: String,
    required: false,
    description: '关键字搜索',
  })
  @Get('list')
  async getUserList(@Query(MyValidatePipe) data: GetUserListDto) {
    return await this.userService.getUserList(data);
  }

  @Post('login')
  async userLogin(@Body(MyValidatePipe) data: UserLoginDto) {
    const user = await this.userService.userLogin(data);
    const token = this.jwtService.sign({
      user: user.user_name,
    });

    if (user) {
      return 'bearer ' + token;
    } else {
      return '登录失败';
    }
  }

  @Get('profile')
  async getUserProfile(@Req() request: Request) {
    const authorization = request.headers['authorization'];

    const token = authorization.split(' ')[1];

    const res = this.jwtService.verify(token, jwtConstants);
    console.log(res);
    return await this.userService.getProfile(res.user);
  }

  // @Post('remove_service')
  // async removeRegister() {}
}
