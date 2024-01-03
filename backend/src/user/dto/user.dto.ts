import { IsNotEmpty } from 'class-validator';

export class UserRegisterService {
  @IsNotEmpty({
    message: '服务名不可为空',
  })
  service_name: string;

  @IsNotEmpty({
    message: '管理员',
  })
  user_name: string;
}

export class GetUserListDto {
  @IsNotEmpty({
    message: '分页必填',
  })
  page: string;

  @IsNotEmpty({
    message: '每页数量必填',
  })
  pageSize: string;

  keyword: string;
}

export class UserLoginDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  user_name: string;

  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
}
