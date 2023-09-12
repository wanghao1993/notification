import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateNoticeDto,
  GetMyNoticeListDto,
  updateNoticeDto,
} from './dto/notice.dto';
import { NoticeService } from './notice.service';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}
  @Post('create')
  create(@Body() createNoticeBody: CreateNoticeDto) {
    return this.noticeService.createNotice(createNoticeBody);
  }

  @Get('list')
  list(@Query() querys: GetMyNoticeListDto) {
    return this.noticeService.getNoticeList(querys);
  }

  @Put('update_notice')
  updateNotice(@Body() updateNoticeData: updateNoticeDto) {
    return this.noticeService.updateNotice(updateNoticeData);
  }

  @Delete('delete')
  delete(@Query('id') id: string) {
    console.log(id);
    return this.noticeService.deleteNotice(+id);
  }
}
