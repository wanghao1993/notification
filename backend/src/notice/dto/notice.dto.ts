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
