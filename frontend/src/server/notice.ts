import request from './index';
import {
  CreateNotice,
  NoticeItem,
  UpdateNotice,
  noticeTypeItem,
} from './notice.modal';

// 获取通知列表
export const getNoticeList = (params: { page: number; pageSize: number }) => {
  return request.get<ListResType<NoticeItem>>('/notice/list', {
    ...params,
  });
};

// 获取通知类型
export const getNoticeTypeList = () => {
  return request.get<ListResType<noticeTypeItem>>('/notice/notice_type_list');
};

// 获取通知详情
export const getNoticeDetailById = (id: number) => {
  return request.get<NoticeItem>(`/notice/detail?id=${id}`);
};

// 删除通知
export const deleteNoticeDetailById = (id: number) => {
  return request.delete<ListResType<NoticeItem>>(`/notice/${id}`);
};

// 新增通知
export const createNoticeApi = (data: CreateNotice) => {
  return request.post<ListResType<NoticeItem>>(`/notice/create`, data);
};

// 编辑通知
export const modifyNoticeApi = (data: UpdateNotice) => {
  return request.put<ListResType<NoticeItem>>(`/notice/update_notice`, data);
};

// 发送通知
export const sendNoticeApi = (id: number) => {
  return request.post<ListResType<NoticeItem>>(`/notice/send_notice/${id}`);
};

// 撤销通知
export const revokeNoticeApi = (id: number) => {
  return request.put<ListResType<NoticeItem>>(`/notice/revoke_notice/${id}`);
};

// 恢复通知
export const recoverNoticeApi = (id: number) => {
  return request.put<ListResType<NoticeItem>>(`/notice/recover_notice/${id}`);
};
