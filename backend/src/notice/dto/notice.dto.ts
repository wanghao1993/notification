import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateNoticeDto {
  @IsNotEmpty({
    message: '服务不可为空',
  })
  service_id: number[];

  @IsNotEmpty({
    message: '通知类型不可为空',
  })
  notice_type: string;

  @IsNotEmpty({
    message: '标题不可为空',
  })
  @MaxLength(200, {
    message: '标题的长度最大为200',
  })
  title: string;

  @IsNotEmpty({
    message: '创建人不可为空',
  })
  creator: string;

  @IsNotEmpty({
    message: '通知内容不可为空',
  })
  @IsString({
    message: '内容类型错误',
  })
  content: string;

  @IsNotEmpty({
    message: '通知内容不可为空',
  })
  @IsString({
    message: 'htmlcontent',
  })
  content_html: string;
}

export class updateNoticeDto extends CreateNoticeDto {
  @IsNotEmpty({
    message: 'id不可为空',
  })
  id: number;
}

export class GetMyNoticeListDto {
  @IsNotEmpty({
    message: '分页必填',
  })
  page: string;

  @IsNotEmpty({
    message: '每页数量必填',
  })
  pageSize: string;

  keyword: string;
}

export class ChangeReadStatusDto {
  @IsNotEmpty({
    message: '通知不存在',
  })
  notice_id: number;
  @IsNotEmpty({
    message: '用户名不可为空',
  })
  user_id: string;
}
