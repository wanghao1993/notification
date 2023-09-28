import request from './index';
import { NoticeItem, noticeTypeItem } from './notice.modal';

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
  return request.get<ListResType<NoticeItem>>(`/notice/${id}`);
};

// 删除通知
export const deleteNoticeDetailById = (id: number) => {
  return request.delete<ListResType<NoticeItem>>(`/notice/${id}`);
};
