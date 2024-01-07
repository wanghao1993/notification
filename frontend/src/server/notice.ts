/// refe
import request from './index';
import { NoticeType } from './../types/notice.type';
// 获取通知列表
export const getNoticeList = (params: { page: number; pageSize: number }) => {
  return request.get<ListResType<NoticeType.NoticeItem>>('/notice/list', {
    ...params,
  });
};

// 获取通知类型
export const getNoticeTypeList = () => {
  return request.get<ListResType<NoticeType.noticeTypeItem>>(
    '/notice/notice_type_list'
  );
};

// 获取通知详情
export const getNoticeDetailById = (id: number) => {
  return request.get<NoticeType.NoticeItem>(`/notice/detail?id=${id}`);
};

// 删除通知
export const deleteNoticeDetailById = (id: number) => {
  return request.delete<ListResType<NoticeItem>>(`/notice/${id}`);
};

// 新增通知
export const createNoticeApi = (data: NoticeType.CreateNotice) => {
  return request.post<ListResType<NoticeType.NoticeItem>>(
    `/notice/create`,
    data
  );
};

// 编辑通知
export const modifyNoticeApi = (data: NoticeType.UpdateNotice) => {
  return request.put<ListResType<NoticeType.NoticeItem>>(
    `/notice/update_notice`,
    data
  );
};

// 发送通知
export const sendNoticeApi = (id: number) => {
  return request.post<ListResType<NoticeType.NoticeItem>>(
    `/notice/send_notice/${id}`
  );
};

// 撤销通知
export const revokeNoticeApi = (id: number) => {
  return request.put<ListResType<NoticeType.NoticeItem>>(
    `/notice/revoke_notice/${id}`
  );
};

// 恢复通知
export const recoverNoticeApi = (id: number) => {
  return request.put<ListResType<NoticeType.NoticeItem>>(
    `/notice/recover_notice/${id}`
  );
};
