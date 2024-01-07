import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { jwtConstants } from './auth';

@Injectable()
export class RequestGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService = new JwtService();

  private whiteListUrl: string[] = ['/user/login', '/'];

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const url = request.url;

    if (this.whiteListUrl.includes(url)) return true;
    const authorization = request.header('authorization') || '';

    const bearer = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException('登录 token 错误');
    }

    try {
      const token = bearer[1];

      this.jwtService.verify(token, jwtConstants);
      return true;
    } catch (e) {
      throw new UnauthorizedException('登录 token 失效，请重新登录');
    }
  }
}
