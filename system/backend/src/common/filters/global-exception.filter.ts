import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { fail } from '../dto/api-response';
import { ErrorCodes } from '../constants/error-codes';

/** 모든 예외를 표준 오류 봉투로 변환 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const requestId = (req as any).requestId as string | undefined;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code: string = ErrorCodes.INTERNAL_ERROR;
    let message = '내부 서버 오류가 발생했습니다.';
    let details: unknown;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const body = exception.getResponse();
      if (typeof body === 'string') {
        message = body;
      } else if (typeof body === 'object' && body !== null) {
        const b = body as Record<string, unknown>;
        message = Array.isArray(b.message)
          ? (b.message as string[]).join(', ')
          : ((b.message as string) ?? exception.message);
        code = (b.code as string) ?? this.defaultCodeFor(status);
        details = b.details;
      }
      if (!code || code === ErrorCodes.INTERNAL_ERROR) {
        code = this.defaultCodeFor(status);
      }
    } else {
      this.logger.error(
        `Unhandled exception on ${req.method} ${req.url}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    res.status(status).json(fail(code, message, details, requestId));
  }

  private defaultCodeFor(status: number): string {
    switch (status) {
      case HttpStatus.UNAUTHORIZED:
        return ErrorCodes.AUTH_REQUIRED;
      case HttpStatus.FORBIDDEN:
        return ErrorCodes.ACCESS_DENIED;
      case HttpStatus.NOT_FOUND:
        return ErrorCodes.RESOURCE_NOT_FOUND;
      case HttpStatus.BAD_REQUEST:
        return ErrorCodes.VALIDATION_FAILED;
      case HttpStatus.CONFLICT:
        return ErrorCodes.DUPLICATE_RESOURCE;
      default:
        return ErrorCodes.INTERNAL_ERROR;
    }
  }
}
