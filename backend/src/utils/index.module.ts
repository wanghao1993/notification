import { Module, Global } from '@nestjs/common';
import { JwtUtil } from './index';

@Global() // 使用 @Global() 装饰器将模块标记为全局模块
@Module({
  providers: [JwtUtil],
  exports: [JwtUtil],
})
export class UtilsModule {}
