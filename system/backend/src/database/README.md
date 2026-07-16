# MikroORM 데이터베이스 운영

백엔드 데이터 접근은 PostgreSQL용 MikroORM을 사용합니다. 애플리케이션 모듈은 요청별
`EntityManager` 컨텍스트를 사용하고, 쓰기 작업은 Unit of Work의 `persistAndFlush()` 또는
`flush()`로 반영합니다.

## 개발 환경

- `DB_SYNCHRONIZE=true`: 시작 시 현재 엔티티 메타데이터를 안전 모드로 동기화합니다.
- `DB_DEBUG=true`: MikroORM SQL 및 디버그 로그를 활성화합니다.
- `npm run orm -- debug`: 설정과 DB 연결을 확인합니다.
- `npm run orm -- schema:update --dump`: 실행하지 않고 예상 스키마 변경 SQL을 확인합니다.

## 마이그레이션

- `npm run migration:create -- --name=<변경명>`
- `npm run migration:check`
- `npm run migration:up`
- `npm run migration:down`

운영 환경에서는 `DB_SYNCHRONIZE=false`로 설정하고 마이그레이션만 적용합니다. 이미 기존
TypeORM 스키마가 존재하는 DB는 스키마가 현재 메타데이터와 일치하는지 확인한 뒤 최초
마이그레이션을 실행 완료 상태로 등록해야 합니다. 신규 DB는 최초 마이그레이션부터 그대로
적용하면 됩니다.
