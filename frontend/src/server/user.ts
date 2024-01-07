import request from './index';
import { UserType } from './../types/user.type';

// 获取用户列表
export const getUserListApi = (params: { page: number; pageSize: number }) => {
  return request.get<ListResType<UserType.UserItem>>('/user/list', {
    ...params,
  });
};

// 登陆注册
export const loginApi = (data: { user_name: string; password: string }) => {
  return request.post('/user/login', {
    ...data,
  });
};

// 获取用户信息
export const getProfile = () => {
  return request.get<UserType.UserItem>('/user/profile');
};
