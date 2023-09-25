export interface NoticeItem {
  id: number;
  title: string;
  content: string;
  notice_type: string;
  create_time: string;
  update_time: string;
}

export interface noticeTypeItem {
  notice_type: string;
  notice_type_label: string;
}
