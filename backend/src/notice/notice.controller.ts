import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Param,
} from '@nestjs/common';
import {
  ChangeReadStatusDto,
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

  // 获取通知
  @Get('/detail')
  getNoticeById(@Query('id', ParseIntPipe) id: number) {
    return this.noticeService.getNoticeById(id);
  }

  // 删除通知
  @Delete(':id')
  deleteNoticeById(@Param('id', ParseIntPipe) id: number) {
    return this.noticeService.deleteNotice(id);
  }
  // 发送通知
  @Post('send_notice/:id')
  sendNotice(@Param('id', ParseIntPipe) id: number) {
    return this.noticeService.sendNotice(id);
  }

  // 撤销
  @Put('revoke_notice/:id')
  revokeNotice(@Param('id', ParseIntPipe) id: number) {
    return this.noticeService.revokeNotice(id);
  }

  // 重新启用
  @Put('recover_notice/:id')
  recoverNotice(@Param('id', ParseIntPipe) id: number) {
    return this.noticeService.recoverNotice(id);
  }

  // 重新启用
  @Post('change_read_status/')
  changeReadStatus(
    @Body(MyValidatePipe) changeReadStatusDto: ChangeReadStatusDto,
  ) {
    return this.noticeService.changeReadStatus(changeReadStatusDto);
  }
}
