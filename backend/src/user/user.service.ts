import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import {
  GetUserListDto,
  UserLoginDto,
  UserRegisterService,
} from './dto/user.dto';
import { UserServer } from './entities/user.server.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStatus } from 'src/enum/userStatus';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(UserServer, 'mysql')
  private userServerRepository: Repository<UserServer>;

  @InjectRepository(User, 'mysql')
  private userRepository: Repository<User>;
  // 用户注册服务
  // 用户-服务
  async register(data: UserRegisterService) {
    const serviceUsers = await this.userServerRepository.findOneBy({
      service_name: data.service_name,
    });

    let users = '';
    if (serviceUsers) {
      const usersList = serviceUsers.user_names
        ? serviceUsers.user_names.split(',')
        : [];
      usersList.push(data.user_name);

      users = [...new Set(usersList)].join(',');
    } else {
      users = data.user_name;
    }

    return await this.userServerRepository.update(serviceUsers.service_id, {
      user_names: users,
    });
  }

  // 获取用户列表

  async getUserList(query: GetUserListDto) {
    const skipCount = (+query.page - 1) * +query.pageSize;
    const [userList, totalCount] = await this.userServerRepository.findAndCount(
      {
        skip: skipCount,
        take: +query.pageSize,
        order: {
          update_time: 'ASC',
        },
      },
    );

    return {
      list: userList,
      total_count: totalCount,
    };
  }

  // 登陆
  async userLogin(data: UserLoginDto) {
    const user = await this.userRepository.findOneBy({
      user_name: data.user_name,
    });

    if (!user) {
      try {
        return await this.userRegister(data);
      } catch (e) {
        throw new HttpException(e, HttpStatus.OK);
      }
    } else {
      return user;
    }
  }

  // 注册

  async userRegister(data: UserLoginDto) {
    const newUser = new User();
    newUser.user_name = data.user_name;
    newUser.password = data.password;
    newUser.status = UserStatus.normal;

    try {
      await this.userRepository.save(newUser);
      return newUser;
    } catch (e) {
      throw new HttpException(e, HttpStatus.OK);
    }
  }
}
