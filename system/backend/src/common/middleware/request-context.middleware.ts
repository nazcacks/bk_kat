import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';

/**
 * 요청 컨텍스트: requestId 발급/전파, 테넌트 헤더 수용.
 * 모든 로그·감사 기록은 requestId 로 추적한다 (설계서 관측성 요구).
 */
@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestId = (req.headers['x-request-id'] as string) || randomUUID();
    (req as any).requestId = requestId;
    (req as any).tenantIdHeader = (req.headers['x-tenant-id'] as string) || null;
    res.setHeader('X-Request-Id', requestId);
    next();
  }
}
