import { UserStatus } from 'src/enum/userStatus';

export class UserVo {
  user_name: string;
  status: UserStatus;
  password: string;
}

export class UserProfile {
  user_name: string;
  status: UserStatus;
  is_admin: boolean;
  created_time: string;
  update_time: string;
}
