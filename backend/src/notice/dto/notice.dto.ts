import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateNoticeDto {
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
    message: '通知内容不可为空',
  })
  @MaxLength(5000, {
    message: '标题的长度最大为5000',
  })
  content: string;
}

export class updateNoticeDto extends CreateNoticeDto {
  @IsNotEmpty({
    message: 'id不可为空',
  })
  id: string;
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
