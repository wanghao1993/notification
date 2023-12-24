import { Injectable } from '@nestjs/common';
import { GetUserListDto, UserRegisterService } from './dto/user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  @InjectRepository(User, 'mysql')
  private userRepository: Repository<User>;
  // 用户注册服务
  // 用户-服务
  async register(data: UserRegisterService) {
    const serviceUsers = await this.userRepository.findOneBy({
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

    return await this.userRepository.update(serviceUsers.service_id, {
      user_names: users,
    });
  }

  // 获取用户列表

  async getUserList(query: GetUserListDto) {
    const skipCount = (+query.page - 1) * +query.pageSize;
    const [userList, totalCount] = await this.userRepository.findAndCount({
      skip: skipCount,
      take: +query.pageSize,
      order: {
        update_time: 'ASC',
      },
    });

    return {
      list: userList,
      total_count: totalCount,
    };
  }
}
