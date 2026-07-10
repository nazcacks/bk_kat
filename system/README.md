# BK 회계·세무 서비스 — 시스템 프레임워크 v0.1

`bk_설계서_v1.1.md` 를 준거로 구축한 기본 프레임워크입니다.
로그인 → 메인화면(대시보드) → 메뉴(사이드바) 골격과, 이후 전 화면이 공통으로 사용할
컨트롤·보안·개인정보보호 기반을 포함합니다.

## 기술 스택

| 구분 | 스택 |
|---|---|
| 백엔드 | TypeScript / Node.js / **NestJS 10** + TypeORM |
| 프론트엔드 | **React 18** + Vite 5 + TypeScript (zustand, react-router, axios) |
| 데이터베이스 | **PostgreSQL 16** (docker-compose) |

## 실행 방법

```bash
# 1) DB 기동
cd system
docker compose up -d

# 2) 백엔드 (http://localhost:3000/api)
cd backend
npm install
npm run start:dev

# 3) 프론트엔드 (http://localhost:5173)
cd ../frontend
npm install
npm run dev
```

- 접속: http://localhost:5173 → 로그인 화면에서 아무 ID/비밀번호로 **바로 진입** (개발 모드)
- 시드 계정: `admin`(운영자·SEC_ADMIN), `tenant_admin`(이용회사), `bk_preparer`, `viewer`
- 백엔드가 꺼져 있어도 프론트엔드는 mock 데이터로 동작합니다 (오프라인 폴백).

## 인증 정책 (개발 → 운영 전환)

`backend/.env` 의 `AUTH_BYPASS=true` 가 개발 모드입니다.
- true: 비밀번호 검증 생략, 미존재 ID 자동 생성 후 즉시 진입 (현재 설정)
- false: bcrypt 비밀번호 검증 활성화 (운영 배포 전 필수 전환)

로그인 여부와 무관하게 JWT 발급·검증, 로그인 이력(LoginHistory) 기록은 항상 동작합니다.

## 백엔드 공통 프레임워크 (`backend/src/common/`)

| 구성요소 | 파일 | 설명 |
|---|---|---|
| 표준 응답 봉투 | `dto/api-response.ts`, `interceptors/transform.interceptor.ts` | 모든 응답을 `{success,data,error,meta}` 로 통일 |
| 표준 오류코드 | `constants/error-codes.ts`, `filters/global-exception.filter.ts` | 설계서 CO-04 오류코드 체계 (`CLOSING_LOCKED`, `SOD_VIOLATION` 등) |
| 공통 페이징 | `dto/page.dto.ts` | `?page=&size=&keyword=` 요청 / `{items,page,size,total}` 응답 |
| 감사 필드 | `entities/base.entity.ts` | `created_at/by, updated_at/by, version, source` + `TenantBaseEntity(tenant_id)` |
| 요청 추적 | `middleware/request-context.middleware.ts` | `X-Request-Id` 발급·전파 (관측성) |
| 인증 가드 | `guards/jwt-auth.guard.ts` | 전역 JWT 검증, `@Public()` 예외, 개발 모드 통과 |
| 감사로그 | `interceptors/audit-log.interceptor.ts`, `@Audit()` | 데이터 변경 호출을 자동으로 append-only 감사로그에 기록 |
| 마스킹 | `utils/masking.util.ts` | 성명/이메일/전화/주민번호/계좌/카드 마스킹 (설계서 21.4) |
| 암호화 | `utils/crypto.util.ts` | AES-256-GCM 양방향 암호화 + SHA-256 (운영 시 KMS 대체) |

## 보안·개인정보보호 관리 (`backend/src/modules/security/`)

설계서 17/20/21장(부록 C) 준거:

- **감사로그** (`audit_log`) — 데이터 변경 전건 자동 기록, **해시체인**(`prevHash→chainHash`)으로 위변조 탐지.
  `GET /api/security/audit-logs/verify-chain` 으로 무결성 검증.
- **개인정보 접근로그** (`personal_data_access_log`) — 평문조회/복호화/다운로드 시 사용자·대상·항목·사유·건수 기록.
  예: `GET /api/users/:id/plain?reason=...` — **사유 미입력 시 `PRIVACY_REASON_REQUIRED` 로 거부**.
- **로그인 이력** (`login_history`) — 성공/실패/개발모드(BYPASS) 전건 기록.
- **마스킹 정책** (`masking_policy`) — 항목별 마스킹 규칙 관리, 사용자 목록 등 조회 API는 기본 마스킹 적용.

## 메뉴·권한 체계

설계서 26장 3채널(OP/TN/CO) × 4단(GROUP/MENU/TAB/ACTION) 구조.
- 메뉴 마스터: `menu` 테이블 (menuCode, parentCode, channel, screenId, requiresStepUp …)
- `GET /api/menus/tree` 가 사이드바 트리 반환. 1차 개발범위(페이즈 01~10 일부) + 시스템관리 + 보안·개인정보 메뉴 시드 완료.
- Role/RoleMenuPermission 정규화는 후속 단계 — 현재 User.roles(simple-array) + isVisible 로 골격만 구성.

## 프론트엔드 공통 컴포넌트 (`frontend/src/components/common/`)

`DataGrid`(제네릭 그리드) · `SearchBar`(조회조건) · `PageHeader`(타이틀+화면ID+브레드크럼) ·
`StatCard` · `Badge` · `Modal` · `Pagination` · `EmptyState` + `utils/masking.ts`

화면 프레임(`components/frame/`): 설계 HTML 목업 패턴을 공통화 — `ScreenShell`(TitleBar+프레임) ·
`QueryBar`(조회조건+ABtn/Seg) · `RightPanel`/`InfoBox` · `StatusBar` · `ScreenDetails`(화면 설계 정보).
스타일: `styles/frame.css`.

레이아웃: EY 디자인 토큰(설계 산출물과 동일 톤) — 상단바 54px + 사이드바 216px(채널 스위처
OP/TN/CO + 다단 트리 + 메뉴 필터) + 접근모드 배너.
신규 화면은 `pages/` 에 추가하고 `router.tsx` 의 implementedPages 에 경로를 등록하면 됩니다.

## 메뉴 카탈로그 (v0.2)

메뉴는 `설계/페이즈_화면/시스템관리자_화면_v1.0.HTML` 의 **메뉴 마스터 카탈로그**(MENU_MASTER_CATALOG)
기준으로 자동 생성 — 3채널(OP/TN/CO) × 4단, 총 292건. 설계 HTML 변경 시 재생성:
`extract-menus.js → gen-seed.js` (스크립트는 시드 파일 주석 참고) → 백엔드 `menu` 테이블 TRUNCATE 후 재기동.

## CRUD 체계 (v0.3)

- **실 엔티티 CRUD**: 사용자(`/api/users`, 삭제=DISABLED 소프트), 메뉴(`/api/menus`, 하위 존재 시 삭제 차단),
  공통코드(`/api/common-codes/groups`·`/:group/items`), 마스킹정책(`/api/security/masking-policies`)
- **공통 리소스 CRUD**(`/api/resources/:type`, `admin_resource` jsonb 테이블): 테넌트·사용자그룹·인증정책·
  Role·배치잡·접근세션·개인정보정책 — 정식 스키마 확정 전 운영 리소스의 프레임워크 공통 CRUD.
  삭제는 비활성 처리(감사 추적 보존). 정식 페이즈에서 개별 테이블로 승격.
- 모든 변경(POST/PUT/DELETE)은 감사로그 인터셉터가 **해시체인 감사로그에 자동 기록**
- 프론트 공통: `components/frame/EditDialog`(필드 정의 → 등록/수정 폼) + `hooks/useResourceCrud`
  (목록+선택+다이얼로그+삭제확인 일괄 제공) — 신규 화면은 필드 정의만으로 CRUD 구성

## 구현 화면 (v0.2)

- 로그인 (CO-01) / 회사 대시보드 (TN-00)
- **시스템관리자 운영 콘솔 12종** (`시스템관리자_화면_v1.0.HTML` 준거):
  - OP-01 운영 현황 대시보드 · OP-03 테넌트 인프라
  - OP-06A 사용자 관리(실 API+마스킹) · OP-06G 사용자그룹 · OP-06B 인증 정책 · OP-06D 메뉴 마스터(실 API 292건 트리) · OP-06C Role·권한 시뮬레이션
  - OP-05C 시스템 공통코드(실 API) · OP-09 배치·연계 운영
  - OP-10 로그 관리(감사로그·로그인이력 실 API + 해시체인 검증 탭) · OP-12 개인정보보호(마스킹정책·접근로그 실 API) · OP-07 Break-glass·접근
- 나머지 업무 메뉴(전표·장부·결산·부가세 등 TN 채널 200여 화면)는 Placeholder — 개발 페이즈별 순차 구현

## 다음 단계 (개발설계 페이즈 일정 기준)

1. 페이즈 01: 기초정보관리 (회사등록, 계정과목 SA-BAS-07 — COA 구조설계)
2. 페이즈 03: 일반전표입력 (SA-JNL-01, MVP 핵심)
3. Role/메뉴권한 정규화 (RoleMenuPermission, MenuActionGrant, 데이터범위)
4. Step-up 재인증, 마감 잠금 인터셉터, 멱등키(Idempotency-Key)
