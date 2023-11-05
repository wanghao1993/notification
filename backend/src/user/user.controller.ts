import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserListDto, UserRegisterService } from './dto/user.dto';
import { MyValidatePipe } from 'src/my-validate-pipe/my-validate.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register_service')
  async register(@Body(MyValidatePipe) data: UserRegisterService) {
    return await this.userService.register(data);
  }

  @Get('list')
  async getUserList(@Query(MyValidatePipe) data: GetUserListDto) {
    return await this.userService.getUserList(data);
  }

  // @Post('remove_service')
  // async removeRegister() {}
}
