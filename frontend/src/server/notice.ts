import request from './index'
import { NoticeItem } from './notice.modal';

export const getNoticeList = (params: {
    page: number;
    pageSize: number
}) => {
    return request.get<ListResType<NoticeItem>>('/notice/list', {
        ...params
    })
}