import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtil {
  constructor(private readonly jwtService: JwtService) {}

  getUserFromToken(token: string): any {
    try {
      token = token.split(' ')[1];
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      // 处理验证失败的情况
      throw new Error('Invalid token');
    }
  }
}
