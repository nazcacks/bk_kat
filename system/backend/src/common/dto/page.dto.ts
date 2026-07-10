import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

/** 공통 페이징 요청 */
export class PageRequestDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(200)
  size: number = 20;

  @IsOptional()
  @IsString()
  keyword?: string;
}

/** 공통 페이징 응답 payload */
export interface PageResponse<T> {
  items: T[];
  page: number;
  size: number;
  total: number;
}

export function toPage<T>(items: T[], total: number, req: PageRequestDto): PageResponse<T> {
  return { items, total, page: req.page, size: req.size };
}
