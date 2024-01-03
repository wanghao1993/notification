import request from './index';
import { UserItem } from './user.modal';

// 获取用户列表
export const getUserListApi = (params: { page: number; pageSize: number }) => {
  return request.get<ListResType<UserItem>>('/user/list', {
    ...params,
  });
};

// 登陆注册
export const loginApi = (data: { user_name: string; password: string }) => {
  return request.post('/user/login', {
    ...data,
  });
};
