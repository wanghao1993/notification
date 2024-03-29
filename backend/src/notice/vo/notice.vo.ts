/**
 * @description 通知的详细字段
 */
export class NoticeItemVo {
  id: number;
  service_id: number[];
  title: string;
  content: string;
  creator: string;
  updator: string;
  notice_type: string;
  notice_status: number;
  notice_status_text: string;
  create_time: string;
  update_time: string;
  notice_type_zh?: string;
  service_name?: string;
}
