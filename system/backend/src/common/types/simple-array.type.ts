import { EntityProperty, Platform, Type } from '@mikro-orm/core';

/**
 * TypeORM의 simple-array와 호환되는 TEXT 컬럼 매핑입니다.
 * 기존 데이터와 스키마를 유지하면서 애플리케이션에서는 string[]로 다룹니다.
 */
export class SimpleArrayType extends Type<string[], string> {
  convertToDatabaseValue(value: string[]): string {
    return value.join(',');
  }

  convertToJSValue(value: string): string[] {
    return value ? value.split(',') : [];
  }

  getColumnType(_property: EntityProperty, _platform: Platform): string {
    return 'text';
  }

  compareAsType(): string {
    return 'string';
  }
}
