import { Body, Controller, Post } from '@nestjs/common';
import { CreateNoticeDto } from './dto/notice.dto';
import { NoticeService } from './notice.service';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}
  @Post('create')
  register(@Body() createNoticeBody: CreateNoticeDto) {
    return this.noticeService.createNotice(createNoticeBody);
  }
}
