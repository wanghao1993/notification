export interface NoticeItem extends CreateNotice {
  create_time: string;
  update_time: string;
  notice_type_zh: string;
}

export interface noticeTypeItem {
  notice_type: string;
  notice_type_label: string;
}

export interface CreateNotice {
  notice_type: string;
  title: string;
  content: string;
  creator: string;
}

export interface UpdateNotice extends CreateNotice {
  id: number;
}
