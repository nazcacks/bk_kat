import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ApiResponse, ok } from '../dto/api-response';

/** 모든 성공 응답을 표준 봉투로 감싼다 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse> {
    const req = context.switchToHttp().getRequest();
    const requestId = req.requestId as string | undefined;
    return next.handle().pipe(map((data) => ok(data ?? null, requestId)));
  }
}
