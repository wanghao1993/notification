export class NoticeItemVo {
  id: number;
  service_id: number[];
  title: string;
  content: string;
  content_html: string;
  creator: string;
  updator: string;
  notice_type: string;
  notice_status: number;
  create_time: string;
  update_time: string;
  notice_type_zh?: string;
  service_name?: string;
}
