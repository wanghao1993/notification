import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
import { MyValidatePipe } from 'src/my-validate-pipe/my-validate.pipe';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}
  @Post('create')
  create(@Body(MyValidatePipe) createNoticeBody: CreateNoticeDto) {
    return this.noticeService.createNotice(createNoticeBody);
  }

  @Get('list')
  list(@Query(MyValidatePipe) querys: GetMyNoticeListDto) {
    return this.noticeService.getNoticeList(querys);
  }

  @Put('update_notice')
  updateNotice(@Body(MyValidatePipe) updateNoticeData: updateNoticeDto) {
    return this.noticeService.updateNotice(updateNoticeData);
  }

  @Delete('delete')
  delete(@Query('id', ParseIntPipe) id: number) {
    return this.noticeService.deleteNotice(id);
  }

  @Get('notice_type_list')
  getNoticeTypeList() {
    return this.noticeService.getNoticeTypeList();
  }

  @Get(':id')
  getNoticeById(@Param('id', ParseIntPipe) id: number) {
    return this.noticeService.deleteNotice(id);
  }

  @Delete(':id')
  deleteNoticeById(@Param('id', ParseIntPipe) id: number) {
    return this.noticeService.deleteNotice(id);
  }
}
