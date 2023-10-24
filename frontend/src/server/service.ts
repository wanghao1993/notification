import request from './index';
import { CreateServiceData, ServiceItem } from './service.modal';

// 获取服务列表
export const getServiceList = () => {
  return request.get<ListResType<ServiceItem>>('/service/list');
};

// 创建服务
export const createService = (data: CreateServiceData) => {
  return request.post<ServiceItem>('/service/create', data);
};

// 编辑服务
export const updateService = (data: CreateServiceData) => {
  return request.put<ServiceItem>('/service/update', data);
};

// 删除服务
export const deleteServiceApi = (service_name: string) => {
  return request.delete('/service/delete/' + service_name);
};

// 通过id获取服务
export const getServiceById = (service_id: number) => {
  return request.get<ServiceItem>('/service/detail/' + service_id);
};
