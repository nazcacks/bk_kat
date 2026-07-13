# BK 플랫폼콘솔 개발 상세설계서 v1.0

- 기준 문서: `bk_설계서_v1.1.md` §1.2, §2~8, §12~15, §17, §19~20, §26
- 메뉴 기준: `설계/화면설계/메뉴구조_v1.1.html`, `설계/화면설계/메뉴구조도_V1.1.HTML`
- 작성일: 2026-07-13
- 대상 채널: `PF`(플랫폼콘솔)
- 대상 사용자: 활성 `PlatformUser`·`PlatformMembership`을 가진 플랫폼 임직원
- 목적: 플랫폼 조직·관리회사·전역 정책·전체 업무 표준·수임관계·보안·인프라를 운영하는 PF-00~PF-06 전체 기능을 구현 수준으로 정의한다.

---

## 1. 범위와 원칙

플랫폼콘솔은 BK 서비스의 제어영역이다. OP/TN 업무를 대신하는 화면이 아니며 다음 원본과 전역 통제를 소유한다.

| 영역 | 플랫폼콘솔 책임 | 하위 채널과의 경계 |
|---|---|---|
| 플랫폼 조직 | PlatformOrg/Unit, 사용자, 소속, 직무배정 | 관리회사 조직의 일상 관리는 OP-02 |
| 관리회사 | 등록·심사·활성·정지·종료·대표관리자 감독 | 관리회사는 타 관리회사를 조회할 수 없음 |
| 계약·쿼터 | 플랫폼↔관리회사 구독과 통합 사용량 | 관리회사↔테넌트 계약은 OP-04 |
| 수임관계 | PRIMARY/SECONDARY 관계와 이관 승인 | OP-03은 변경 요청만 수행 |
| 전역 정책 | MFA·Step-up·SOD·금지정책 하한 | 하위는 강제·금지 규칙을 완화할 수 없음 |
| 전체 업무 표준 | 회계·세무·권한·서식·코드·검증·AI 원본·버전·발행 | OP는 배포, TN은 채택·매핑 |
| 메뉴 원본 | PF/OP/TN/CO 메뉴·화면·다국어·route·버전 | OP-06-06-01은 PUBLISHED 읽기전용 |
| 보안·운영 | 조직격리, 지원세션, 감사, 전역 배치·SLO·DR | 승인 지원세션 없이는 테넌트 원문 접근 금지 |

공통 불변조건은 다음과 같다.

1. 요청마다 platformUserId, platformOrgId/unitId, membershipId, roleAssignmentIds, menuVersionId, permissionGeneration을 `ContextSnapshot`에 기록한다.
2. PF 접근은 활성 사용자·Membership·Role·조직단위 범위를 모두 검증한다.
3. 플랫폼 Role은 OP/TN 권한을 자동 상속하지 않는다.
4. 관리회사 선택은 제어영역 조회 컨텍스트일 뿐 회계데이터 접근권한이 아니다.
5. 고위험 변경은 Step-up, 사유, 요청자≠승인자, 전후값 감사를 요구한다.
6. 발행 표준·메뉴 버전과 발행/폐기 canonical ID는 수정·재사용하지 않는다.
7. 승인·발행·감사 이력은 append-only로 보존한다.

---

## 2. 역할과 권한평가

| Role | 책임 | 주요 제한 |
|---|---|---|
| `PLATFORM_SUPER_ADMIN` | 전역 비상통제, 관리회사 정지·종료, 인프라 | 자기승격·표준 단독발행 금지 |
| `PLATFORM_USER_ADMIN` | 사용자·그룹·소속·권한 생명주기 | 자기 Role 승격 금지 |
| `PLATFORM_INTERNAL_ORG_ADMIN` | PlatformOrg/Unit, 소속, SSO/SCIM | 관리회사·표준 원본 변경 불가 |
| `PLATFORM_ORG_ADMIN` | 관리회사 심사·계약·수임·이관 | 회계 원문 자동 접근 금지 |
| `PLATFORM_STANDARD_ADMIN` | 업무 표준·메뉴 원본·버전·발행 | 작성/검토/발행 SOD |
| `PLATFORM_SUPPORT` | 승인 지원세션·장애지원 | 승인 범위·시간 밖 접근 금지 |
| `PLATFORM_SECURITY` | 인증 하한·격리·보안사건·고위험 승인 | 감사 이력 변경 금지 |
| `PLATFORM_AUDITOR` | 전역 읽기전용 감사 | CUD·승인 실행 금지 |

서버 권한평가 순서는 `활성 사용자 → Membership/scope → PUBLISHED MenuVersion → 그룹정책 → RoleMenuPermission → MenuActionGrant → data scope → Step-up/SOD`이다. 그룹 DENY가 우선하며 ALLOW만으로 Role의 VIEW/ENTER/ACTION을 만들지 않는다.

---

## 3. 공통 화면·API 표준

- GNB: 플랫폼 조직/조직단위, Role, 관리회사 조회 컨텍스트, 알림, 사용자 메뉴.
- 화면 헤더: 화면명, canonical ID, breadcrumb, 현재 scope, PUBLISHED 메뉴 버전.
- 본문: 목록 또는 트리+목록, 오른쪽 상세/탭. 저장 후 서버 version으로 교체한다.
- 저장: `If-Match` 낙관적 잠금, `Idempotency-Key`, 사유. 고위험 action은 Step-up·승인 요청.
- 상태영역: 조회건수, 마지막 동기화, permission generation, traceId.
- API prefix: `/api/pf/v1`; scope는 URL이 아니라 인증 Membership에서 주입한다.
- 목록은 cursor/limit/sort/filter/asOf, 대량 출력은 비동기 job과 만료 URL을 사용한다.

---

## 4. PF 전체 화면 목록

| 메뉴 | 화면 ID | 화면명 | 핵심 기능 |
|---|---|---|---|
| PF-00 | `PF-00-01-01` | 플랫폼 홈 | 조직·사용자·표준·관리회사·SLO 현황 |
| PF-00 | `PF-00-02-01` | 플랫폼 조직 컨텍스트 | PlatformOrg/Unit/Membership 선택 |
| PF-00 | `PF-00-03-01` | 관리회사 컨텍스트 | 관리회사 검색·상태·요금제 필터 |
| PF-00 | `PF-00-04-01` | 승인 대기함 | Role·표준·관리회사·이관 승인 |
| PF-01 | `PF-01-01-01` | 플랫폼 내부조직 | 조직 트리·개편·유효기간 |
| PF-01 | `PF-01-02-01` | 플랫폼 사용자관리 | 초대·상태·소속/Role·보안/세션 |
| PF-01 | `PF-01-03-01` | 플랫폼 사용자그룹 | 그룹·상위그룹·구성원·유효기간 |
| PF-01 | `PF-01-04-01` | 그룹별 메뉴권한 | PF 메뉴 INHERIT/ALLOW/DENY·미리보기 |
| PF-01 | `PF-01-05-01` | 소속·Role·직무배정 | Membership·Role·DutyAssignment |
| PF-01 | `PF-01-06-01` | SSO·SCIM·접근환경 | IdP·도메인·프로비저닝·IP |
| PF-01 | `PF-01-07-01` | 관리회사 목록·상세 | 법인·사업자·대표관리자·계약상태 |
| PF-01 | `PF-01-08-01` | 관리회사 심사·활성 | 자격·계약·MFA·위수탁 검증 |
| PF-01 | `PF-01-09-01` | 관리회사 정지·종료 | 정지·종료 체크리스트 |
| PF-01 | `PF-01-10-01` | 관리회사 Membership 감독 | 대표관리자·Role·SSO/SCIM 감독 |
| PF-02 | `PF-02-01-01` | 플랫폼 구독 | 체험·활성·연체·정지·종료 |
| PF-02 | `PF-02-02-01` | 통합 사용량 | 테넌트·사용자·저장량·API·배치 |
| PF-02 | `PF-02-03-01` | 쿼터·초과 통제 | 경고·생성제한·다운그레이드 영향 |
| PF-03 | `PF-03-01-01` | 수임관계 | PRIMARY/SECONDARY·serviceScopes·기간 |
| PF-03 | `PF-03-02-01` | 관계 충돌 검증 | 중복 PRIMARY·기간중첩·범위 검증 |
| PF-03 | `PF-03-03-01` | 이관 워크플로 | 요청·동의·수락·검증·예약·컷오버 |
| PF-03 | `PF-03-04-01` | 인계·롤백 | 미결업무·표준·시크릿 인계 |
| PF-04 | `PF-04-01-01` | 인증·권한 하한 | GLOBAL MFA·Step-up·SOD·금지정책 |
| PF-04 | `PF-04-02-01` | 전체 표준 카탈로그 | 유형·원본·Steward·확장정책 |
| PF-04 | `PF-04-03-01` | 메뉴관리 | 목록·버전·영향·발행·롤백 |
| PF-04 | `PF-04-04-01` | 표준 버전·검토 | 초안·diff·회귀검증·승인 |
| PF-04 | `PF-04-05-01` | 발행·중지·롤백·폐기 | 불변 발행과 상태전이 |
| PF-04 | `PF-04-06-01` | 배포·채택 현황 | 관리회사 배포·테넌트 채택/매핑 |
| PF-05 | `PF-05-01-01` | 조직 격리 현황 | 교차 접근·RLS 위반 탐지 |
| PF-05 | `PF-05-02-01` | 플랫폼 감사로그 | 조직·사용자·Role·표준·이관 감사 |
| PF-05 | `PF-05-03-01` | 지원 접근 요청 | 대상·목적·범위·시간 승인 |
| PF-05 | `PF-05-04-01` | 지원 접근 검토 | 통지·행위로그·만료·사후검토 |
| PF-06 | `PF-06-01-01` | 전역 배치·큐 | 메뉴·표준·권한·관리회사 작업 |
| PF-06 | `PF-06-02-01` | 관측성·SLO | 조직→관리회사→테넌트 장애 영향 |
| PF-06 | `PF-06-03-01` | 백업·DR | 복구 우선순위·훈련·증적 |

---

## 5. 메뉴별 상세 기능

### 5.1 PF-00 플랫폼 진입·현황

| 화면 | 입력·조회 | 처리·검증 | 산출물 |
|---|---|---|---|
| PF-00-01-01 | 조직/사용자/관리회사/테넌트 수, 표준 발행, SLO, 보안사건 | 집계만 표시, 회계 원문 drill-down 금지 | 운영 대시보드 |
| PF-00-02-01 | 활성 소속·조직단위·Role | 만료/정지 Membership 차단, ContextSnapshot 고정 | 플랫폼 조직 컨텍스트 |
| PF-00-03-01 | 관리회사명·상태·요금제·위험 | 조회 컨텍스트만 발급, 하위권한 미상속 | 관리회사 제어 컨텍스트 |
| PF-00-04-01 | 승인유형·위험도·요청자·기한 | 자기요청 승인 금지, Step-up, 2인 승인 | ApprovalDecision·감사로그 |

API: `GET /dashboard`, `POST /contexts/platform`, `POST /contexts/operators`, `GET /approvals`, `POST /approvals/{id}/approve|reject`.

### 5.2 PF-01 플랫폼 조직·사용자·관리회사

- 조직은 같은 platformOrgId 부모만 참조하고 순환을 금지한다. 개편은 유효기간 이력으로 처리한다.
- 사용자는 `INVITED → ACTIVE → SUSPENDED/DORMANT → TERMINATED`; 사용 이력 계정은 물리삭제하지 않는다.
- loginId는 전역 유일하고 Membership, Role, DutyAssignment는 분리 저장한다.
- MFA 초기화·세션 종료·고위험 Role 변경은 Step-up과 사유가 필요하다.
- 그룹 기본정보와 구성원은 별도 저장한다. 그룹코드 유일, 순환, 타 scope 구성원, 기간중복을 검증한다.
- 그룹별 메뉴권한은 PUBLISHED PF 메뉴만 대상으로 하며 정책 diff·최종권한 미리보기를 제공한다.

SSO·SCIM 화면은 SAML/OIDC IdP, 검증 도메인, issuer/client, claim mapping, JIT/SCIM, 동기화 상태와 IP 허용목록을 관리한다. 시크릿은 KMS 참조만 저장하고 OperatorOrg IdP와 분리한다. 비활성화 전 로컬 비상관리자와 복구경로를 검증한다.

관리회사 상태는 `PENDING_VERIFICATION → ACTIVE → SUSPENDED → TERMINATING → TERMINATED`를 따른다. 활성화에는 초기 ORG_OWNER, 유효 Membership, MFA, 계약, 위수탁 검증이 필요하다. 종료 전 활성 PRIMARY 관계, 미결업무, 배치, 시크릿, 청구를 정리한다.

API: `/platform-orgs`, `/platform-units`, `/platform-users`, `/platform-memberships`, `/user-groups`, `/group-menu-permissions`, `/identity-providers`, `/operator-orgs`, `/operator-orgs/{id}/verify|activate|suspend|terminate`.

### 5.3 PF-02 플랫폼 계약·쿼터

- `OperatorSubscription`은 플랫폼↔관리회사 계약이며 OP-04의 `TenantServiceContract`와 분리한다.
- 상태는 `TRIAL/ACTIVE/PAST_DUE/SUSPENDED/GRACE/TERMINATED/REACTIVATED`이다.
- operatorOrgId별 테넌트·사용자·저장량·API·배치·보고서 보관량을 집계한다.
- 임계치 도달 시 경고→신규 생성/증설 제한→승인 예외 순으로 처리하며 기존 원천데이터는 자동삭제하지 않는다.
- 다운그레이드는 기능·쿼터·보존기간 영향을 계산해 승인 후 효력일에 반영한다.

API: `/operator-subscriptions`, `/billing-plans`, `/operator-usage`, `/operator-quotas`, `/quota-exceptions`, `/downgrade-impact`.

### 5.4 PF-03 수임관계·관리회사 이관

- 관계 필드: operatorOrgId, tenantId, relationType, serviceScopes, validFrom/To, status.
- 테넌트별 활성 PRIMARY는 1건이며 기간 중첩과 서비스 범위 충돌을 DB 제약과 서비스 검증으로 차단한다.
- 이관은 요청→테넌트 동의→양사 확인→플랫폼 승인→사전검증→예약→컷오버→사후검증 순서다.
- `TRANSFER_IN_PROGRESS` 동안 기존/신규 관리회사의 동시 쓰기를 금지한다.
- tenantId, 원천데이터, 표준 채택 versionId는 유지하고 관계·배정·위임 시크릿·미결업무·책임시점만 인계한다.
- 실패 시 신규 권한 회수와 기존 관계 복원을 보상처리하고 전 단계를 append-only 기록한다.

API: `/operator-tenant-relations`, `/relation-conflicts/validate`, `/operator-transfers`, `/operator-transfers/{id}/consent|accept|approve|schedule|cutover|rollback`.