import { NoticeTypes } from '@/types/notice.types';
import { dfHttp } from '..';

export const getNoticeListApi = (params: NoticeTypes.getNoticeListModal) => {
  return dfHttp.get<string>('notice/list', {
    params,
  });
};
