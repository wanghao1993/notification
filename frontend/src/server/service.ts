import request from './index';
import { ServerType } from '../types/server.type';

// 获取服务列表
export const getServiceList = () => {
  return request.get<ListResType<ServerType.ServiceItem>>('/service/list');
};

// 创建服务
export const createService = (data: ServerType.CreateServiceData) => {
  return request.post<ServerType.ServiceItem>('/service/create', data);
};

// 编辑服务
export const updateService = (data: ServerType.CreateServiceData) => {
  return request.put<ServerType.ServiceItem>('/service/update', data);
};

// 删除服务
export const deleteServiceApi = (service_name: string) => {
  return request.delete('/service/delete/' + service_name);
};

// 通过id获取服务
export const getServiceById = (service_id: number) => {
  return request.get<ServerType.ServiceItem>('/service/detail/' + service_id);
};
