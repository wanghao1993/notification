import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServer } from './entities/user.server.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserServer, User], 'mysql')],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
