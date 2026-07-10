--
-- PostgreSQL database dump
--

\restrict LcHrrXUe4TtfyGyGkecLyyfMdf8j0K6PWDuCsLQWquKE1KGwwdxHwhDtiAW7a4e

-- Dumped from database version 16.13
-- Dumped by pg_dump version 16.13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_resource; Type: TABLE; Schema: public; Owner: bk_app
--

CREATE TABLE public.admin_resource (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by character varying(64),
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by character varying(64),
    version integer NOT NULL,
    source character varying(32) DEFAULT 'UI'::character varying NOT NULL,
    resource_type character varying(40) NOT NULL,
    data jsonb NOT NULL,
    is_active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.admin_resource OWNER TO bk_app;

--
-- Name: admin_resource_id_seq; Type: SEQUENCE; Schema: public; Owner: bk_app
--

CREATE SEQUENCE public.admin_resource_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_resource_id_seq OWNER TO bk_app;

--
-- Name: admin_resource_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bk_app
--

ALTER SEQUENCE public.admin_resource_id_seq OWNED BY public.admin_resource.id;


--
-- Name: app_user; Type: TABLE; Schema: public; Owner: bk_app
--

CREATE TABLE public.app_user (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by character varying(64),
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by character varying(64),
    version integer NOT NULL,
    source character varying(32) DEFAULT 'UI'::character varying NOT NULL,
    login_id character varying(64) NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(255),
    phone character varying(32),
    user_group character varying(16) DEFAULT 'TENANT'::character varying NOT NULL,
    tenant_id character varying(32),
    status character varying(20) DEFAULT 'ACTIVE'::character varying NOT NULL,
    roles text DEFAULT ''::text NOT NULL,
    password_hash character varying(255),
    last_login_at timestamp with time zone,
    is_external_partner boolean DEFAULT false NOT NULL,
    detail jsonb
);


ALTER TABLE public.app_user OWNER TO bk_app;

--
-- Name: app_user_id_seq; Type: SEQUENCE; Schema: public; Owner: bk_app
--

CREATE SEQUENCE public.app_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.app_user_id_seq OWNER TO bk_app;

--
-- Name: app_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bk_app
--

ALTER SEQUENCE public.app_user_id_seq OWNED BY public.app_user.id;


--
-- Name: audit_log; Type: TABLE; Schema: public; Owner: bk_app
--

CREATE TABLE public.audit_log (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    tenant_id character varying(32),
    user_id character varying(64),
    login_id character varying(64),
    user_name character varying(100),
    action character varying(32) NOT NULL,
    resource character varying(64) NOT NULL,
    menu_code character varying(32),
    http_method character varying(8),
    request_path character varying(255),
    before_data jsonb,
    after_data jsonb,
    request_id character varying(64),
    ip character varying(64),
    user_agent character varying(255),
    result character varying(16) DEFAULT 'SUCCESS'::character varying NOT NULL,
    prev_hash character varying(64),
    chain_hash character varying(64) NOT NULL
);


ALTER TABLE public.audit_log OWNER TO bk_app;

--
-- Name: audit_log_id_seq; Type: SEQUENCE; Schema: public; Owner: bk_app
--

CREATE SEQUENCE public.audit_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.audit_log_id_seq OWNER TO bk_app;

--
-- Name: audit_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bk_app
--

ALTER SEQUENCE public.audit_log_id_seq OWNED BY public.audit_log.id;


--
-- Name: common_code_group; Type: TABLE; Schema: public; Owner: bk_app
--

CREATE TABLE public.common_code_group (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by character varying(64),
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by character varying(64),
    version integer NOT NULL,
    source character varying(32) DEFAULT 'UI'::character varying NOT NULL,
    group_code character varying(32) NOT NULL,
    group_name character varying(100) NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    name_en character varying(100),
    domain character varying(32),
    policy character varying(32),
    description character varying(500)
);


ALTER TABLE public.common_code_group OWNER TO bk_app;

--
-- Name: common_code_group_id_seq; Type: SEQUENCE; Schema: public; Owner: bk_app
--

CREATE SEQUENCE public.common_code_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.common_code_group_id_seq OWNER TO bk_app;

--
-- Name: common_code_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bk_app
--

ALTER SEQUENCE public.common_code_group_id_seq OWNED BY public.common_code_group.id;


--
-- Name: common_code_item; Type: TABLE; Schema: public; Owner: bk_app
--

CREATE TABLE public.common_code_item (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by character varying(64),
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by character varying(64),
    version integer NOT NULL,
    source character varying(32) DEFAULT 'UI'::character varying NOT NULL,
    group_code character varying(32) NOT NULL,
    code character varying(32) NOT NULL,
    name character varying(100) NOT NULL,
    name_en character varying(100),
    sort_order integer DEFAULT 0 NOT NULL,
    attributes jsonb,
    is_active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.common_code_item OWNER TO bk_app;

--
-- Name: common_code_item_id_seq; Type: SEQUENCE; Schema: public; Owner: bk_app
--

CREATE SEQUENCE public.common_code_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.common_code_item_id_seq OWNER TO bk_app;

--
-- Name: common_code_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bk_app
--

ALTER SEQUENCE public.common_code_item_id_seq OWNED BY public.common_code_item.id;


--
-- Name: login_history; Type: TABLE; Schema: public; Owner: bk_app
--

CREATE TABLE public.login_history (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id character varying(64),
    login_id character varying(64) NOT NULL,
    name character varying(100),
    tenant_id character varying(32),
    ip character varying(64),
    user_agent character varying(255),
    result character varying(16) NOT NULL,
    fail_reason character varying(100)
);


ALTER TABLE public.login_history OWNER TO bk_app;

--
-- Name: login_history_id_seq; Type: SEQUENCE; Schema: public; Owner: bk_app
--

CREATE SEQUENCE public.login_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.login_history_id_seq OWNER TO bk_app;

--
-- Name: login_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bk_app
--

ALTER SEQUENCE public.login_history_id_seq OWNED BY public.login_history.id;


--
-- Name: masking_policy; Type: TABLE; Schema: public; Owner: bk_app
--

CREATE TABLE public.masking_policy (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by character varying(64),
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by character varying(64),
    version integer NOT NULL,
    source character varying(32) DEFAULT 'UI'::character varying NOT NULL,
    data_type character varying(32) NOT NULL,
    field_name character varying(64) NOT NULL,
    mask_pattern character varying(64) NOT NULL,
    description character varying(255),
    required_grant character varying(64),
    is_active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.masking_policy OWNER TO bk_app;

--
-- Name: masking_policy_id_seq; Type: SEQUENCE; Schema: public; Owner: bk_app
--

CREATE SEQUENCE public.masking_policy_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.masking_policy_id_seq OWNER TO bk_app;

--
-- Name: masking_policy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bk_app
--

ALTER SEQUENCE public.masking_policy_id_seq OWNED BY public.masking_policy.id;


--
-- Name: menu; Type: TABLE; Schema: public; Owner: bk_app
--

CREATE TABLE public.menu (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by character varying(64),
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by character varying(64),
    version integer NOT NULL,
    source character varying(32) DEFAULT 'UI'::character varying NOT NULL,
    menu_code character varying(32) NOT NULL,
    parent_code character varying(32),
    channel character varying(8) DEFAULT 'TN'::character varying NOT NULL,
    menu_type character varying(8) DEFAULT 'MENU'::character varying NOT NULL,
    name character varying(100) NOT NULL,
    name_en character varying(100),
    path character varying(255),
    icon character varying(16),
    screen_id character varying(32),
    sort_order integer DEFAULT 0 NOT NULL,
    is_visible boolean DEFAULT true NOT NULL,
    requires_step_up boolean DEFAULT false NOT NULL,
    is_active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.menu OWNER TO bk_app;

--
-- Name: menu_id_seq; Type: SEQUENCE; Schema: public; Owner: bk_app
--

CREATE SEQUENCE public.menu_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.menu_id_seq OWNER TO bk_app;

--
-- Name: menu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bk_app
--

ALTER SEQUENCE public.menu_id_seq OWNED BY public.menu.id;


--
-- Name: personal_data_access_log; Type: TABLE; Schema: public; Owner: bk_app
--

CREATE TABLE public.personal_data_access_log (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    tenant_id character varying(32),
    user_id character varying(64) NOT NULL,
    login_id character varying(64) NOT NULL,
    user_name character varying(100),
    target_type character varying(32) NOT NULL,
    target_id character varying(64),
    target_name character varying(100),
    data_items jsonb NOT NULL,
    access_type character varying(32) NOT NULL,
    purpose character varying(500),
    record_count integer DEFAULT 1 NOT NULL,
    request_id character varying(64),
    ip character varying(64)
);


ALTER TABLE public.personal_data_access_log OWNER TO bk_app;

--
-- Name: personal_data_access_log_id_seq; Type: SEQUENCE; Schema: public; Owner: bk_app
--

CREATE SEQUENCE public.personal_data_access_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.personal_data_access_log_id_seq OWNER TO bk_app;

--
-- Name: personal_data_access_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bk_app
--

ALTER SEQUENCE public.personal_data_access_log_id_seq OWNED BY public.personal_data_access_log.id;


--
-- Name: admin_resource id; Type: DEFAULT; Schema: public; Owner: bk_app
--

ALTER TABLE ONLY public.admin_resource ALTER COLUMN id SET DEFAULT nextval('public.admin_resource_id_seq'::regclass);


--
-- Name: app_user id; Type: DEFAULT; Schema: public; Owner: bk_app
--

ALTER TABLE ONLY public.app_user ALTER COLUMN id SET DEFAULT nextval('public.app_user_id_seq'::regclass);


--
-- Name: audit_log id; Type: DEFAULT; Schema: public; Owner: bk_app
--

ALTER TABLE ONLY public.audit_log ALTER COLUMN id SET DEFAULT nextval('public.audit_log_id_seq'::regclass);


--
-- Name: common_code_group id; Type: DEFAULT; Schema: public; Owner: bk_app
--

ALTER TABLE ONLY public.common_code_group ALTER COLUMN id SET DEFAULT nextval('public.common_code_group_id_seq'::regclass);


--
-- Name: common_code_item id; Type: DEFAULT; Schema: public; Owner: bk_app
--

ALTER TABLE ONLY public.common_code_item ALTER COLUMN id SET DEFAULT nextval('public.common_code_item_id_seq'::regclass);


--
-- Name: login_history id; Type: DEFAULT; Schema: public; Owner: bk_app
--

ALTER TABLE ONLY public.login_history ALTER COLUMN id SET DEFAULT nextval('public.login_history_id_seq'::regclass);


--
-- Name: masking_policy id; Type: DEFAULT; Schema: public; Owner: bk_app
--

ALTER TABLE ONLY public.masking_policy ALTER COLUMN id SET DEFAULT nextval('public.masking_policy_id_seq'::regclass);


--
-- Name: menu id; Type: DEFAULT; Schema: public; Owner: bk_app
--

ALTER TABLE ONLY public.menu ALTER COLUMN id SET DEFAULT nextval('public.menu_id_seq'::regclass);


--
-- Name: personal_data_access_log id; Type: DEFAULT; Schema: public; Owner: bk_app
--

ALTER TABLE ONLY public.personal_data_access_log ALTER COLUMN id SET DEFAULT nextval('public.personal_data_access_log_id_seq'::regclass);


--
-- Data for Name: admin_resource; Type: TABLE DATA; Schema: public; Owner: bk_app
--

COPY public.admin_resource (id, created_at, created_by, updated_at, updated_by, version, source, resource_type, data, is_active) FROM stdin;
1	2026-07-10 11:16:42.468106+09	\N	2026-07-10 11:16:42.468106+09	\N	1	SEED	tenant	{"name": "금명전자", "tier": "SCHEMA", "quota": "DB 62% · Jobs 4/10", "status": "ACTIVE", "tenant": "T-10035", "verify": "checksum OK", "snapshot": "2026-07-08 03:00"}	t
2	2026-07-10 11:16:42.468106+09	\N	2026-07-10 11:16:42.468106+09	\N	1	SEED	tenant	{"name": "EDPR Korea", "tier": "DEDICATED", "quota": "Storage 78%", "status": "MIGRATING", "tenant": "T-10110", "verify": "CDC_SYNC 92%", "snapshot": "2026-07-07 23:30"}	t
3	2026-07-10 11:16:42.468106+09	\N	2026-07-10 11:16:42.468106+09	\N	1	SEED	tenant	{"name": "Inteva Korea", "tier": "SHARED", "quota": "API 38%", "status": "ACTIVE", "tenant": "T-10201", "verify": "PITR ready", "snapshot": "2026-07-08 03:00"}	t
4	2026-07-10 11:16:42.468106+09	\N	2026-07-10 11:16:42.468106+09	\N	1	SEED	user-group	{"nameEn": "Security Operations", "nameKo": "보안운영팀", "status": "ACTIVE", "groupCode": "SEC-OPS", "groupType": "SECURITY", "ownerScope": "OPERATOR", "defaultRole": "SEC_ADMIN", "description": "보안·감사 운영 및 Break-glass 승인 권한을 가진 운영자 그룹", "memberCount": 12, "parentGroup": null}	t
5	2026-07-10 11:16:42.468106+09	\N	2026-07-10 11:16:42.468106+09	\N	1	SEED	user-group	{"nameEn": "Customer Support", "nameKo": "고객지원팀", "status": "ACTIVE", "groupCode": "CS-TEAM", "groupType": "OPERATOR_ORG", "ownerScope": "OPERATOR", "defaultRole": "SUPPORT", "description": "이용회사 지원 세션을 수행하는 운영자 그룹", "memberCount": 28, "parentGroup": null}	t
6	2026-07-10 11:16:42.468106+09	\N	2026-07-10 11:16:42.468106+09	\N	1	SEED	auth-policy	{"mfa": "필수 · WebAuthn/TOTP", "sso": "IdP: EY-Okta · SCIM provisioning ON", "status": "PUBLISHED", "target": "운영자", "dormant": "365일 미접속", "lockout": "5회 실패 → LOCKED", "session": "유휴 30분 · 절대 12시간", "version": "v18", "password": "최소 10자 · 90일 변경", "policyCode": "OPERATOR-DEFAULT", "concurrentSessions": "운영자 2개"}	t
7	2026-07-10 11:16:42.468106+09	\N	2026-07-10 11:16:42.468106+09	\N	1	SEED	auth-policy	{"mfa": "필수(하한) · TOTP 이상", "sso": "테넌트 IdP 연동 선택", "status": "PUBLISHED", "target": "테넌트", "dormant": "365일 미접속", "lockout": "5회 실패 → LOCKED", "session": "유휴 30분 · 절대 12시간", "version": "v6", "password": "최소 10자 · 90일 변경", "policyCode": "TENANT-FLOOR", "concurrentSessions": "3개"}	t
8	2026-07-10 11:16:42.468106+09	\N	2026-07-10 11:16:42.468106+09	\N	1	SEED	role	{"name": "시스템 관리자", "scope": "OPERATOR", "roleCode": "SEC_ADMIN", "description": "인프라·인증·보안·감사 운영. 기장 작성·승인·마감·신고 ACTION 불가(SOD)"}	t
9	2026-07-10 11:16:42.468106+09	\N	2026-07-10 11:16:42.468106+09	\N	1	SEED	role	{"name": "감사자", "scope": "OPERATOR", "roleCode": "AUDITOR", "description": "로그·리포트 열람 전용, EXPORT 는 승인 필요"}	t
10	2026-07-10 11:16:42.468106+09	\N	2026-07-10 11:16:42.468106+09	\N	1	SEED	role	{"name": "고객 지원", "scope": "OPERATOR", "roleCode": "SUPPORT", "description": "SUPPORT_SESSION 기반 설정 지원, 마스킹 조회만"}	t
11	2026-07-10 11:16:42.468106+09	\N	2026-07-10 11:16:42.468106+09	\N	1	SEED	role	{"name": "회사관리자", "scope": "TENANT", "roleCode": "TENANT_ADMIN", "description": "자사 사용자·Role·결재선·환경설정 관리"}	t
12	2026-07-10 11:16:42.468106+09	\N	2026-07-10 11:16:42.468106+09	\N	1	SEED	batch-job	{"job": "VAT_RECON_DAILY", "cause": "connector timeout", "retry": "가능", "status": "RETRY", "tenant": "T-10035", "idemKey": "idem-8841"}	t
13	2026-07-10 11:16:42.468106+09	\N	2026-07-10 11:16:42.468106+09	\N	1	SEED	batch-job	{"job": "BANK_SCRAPE_SYNC", "cause": "OAuth token expired", "retry": "토큰 회전 후", "status": "DLQ", "tenant": "T-10201", "idemKey": "idem-9012"}	t
14	2026-07-10 11:16:42.468106+09	\N	2026-07-10 11:16:42.468106+09	\N	1	SEED	batch-job	{"job": "REPORT_EXPORT", "cause": "—", "retry": "—", "status": "SUCCESS", "tenant": "ALL", "idemKey": "idem-7770"}	t
15	2026-07-10 11:16:42.468106+09	\N	2026-07-10 11:16:42.468106+09	\N	1	SEED	access-session	{"mode": "BREAK_GLASS", "reason": "신고마감 전 DB 라우팅 장애", "status": "ACTIVE", "tenant": "T-10035", "session": "BG-20260708-014", "approval": "2/2", "recording": "ON · 마스킹"}	t
16	2026-07-10 11:16:42.468106+09	\N	2026-07-10 11:16:42.468106+09	\N	1	SEED	access-session	{"mode": "SUPPORT_SESSION", "reason": "SSO 설정 지원", "status": "REVIEWED", "tenant": "T-10201", "session": "AS-20260708-221", "approval": "1/1", "recording": "OFF"}	t
17	2026-07-10 11:16:42.468106+09	\N	2026-07-10 11:16:42.468106+09	\N	1	SEED	privacy-policy	{"kind": "카탈로그", "status": "ACTIVE", "target": "employee.rrn", "purpose": "원천세·4대보험 신고", "approval": "2인", "policyId": "PDC-001", "protection": "암호화+마스킹"}	t
18	2026-07-10 11:16:42.468106+09	\N	2026-07-10 11:16:42.468106+09	\N	1	SEED	privacy-policy	{"kind": "마스킹", "status": "ACTIVE", "target": "employee.rrn · 전 화면", "purpose": "목록·보고서 보호", "approval": "평문 Step-up", "policyId": "MSK-001", "protection": "앞 6자리 + ******"}	t
19	2026-07-10 11:16:42.468106+09	\N	2026-07-10 11:16:42.468106+09	\N	1	SEED	privacy-policy	{"kind": "보존·파기", "status": "ACTIVE", "target": "개인정보 일반", "purpose": "계약 종료 후 보존", "approval": "2인", "policyId": "RET-PII-05Y", "protection": "5년 후 분리보관→파기"}	t
20	2026-07-10 11:16:42.468106+09	\N	2026-07-10 11:16:42.468106+09	\N	1	SEED	privacy-policy	{"kind": "DLP", "status": "검토", "target": "다운로드/Excel", "purpose": "대량 유출 방지", "approval": "승인", "policyId": "DLP-BULK-PII", "protection": "1,000건/10MB 임계"}	t
21	2026-07-10 11:16:49.613038+09	\N	2026-07-10 11:16:50.750236+09	\N	3	UI	tenant	{"name": "�׽�Ʈȸ��", "tier": "SHARED", "quota": "-", "status": "SUSPENDED", "tenant": "T-99999", "verify": "-", "snapshot": "-"}	f
\.


--
-- Data for Name: app_user; Type: TABLE DATA; Schema: public; Owner: bk_app
--

COPY public.app_user (id, created_at, created_by, updated_at, updated_by, version, source, login_id, name, email, phone, user_group, tenant_id, status, roles, password_hash, last_login_at, is_external_partner, detail) FROM stdin;
3	2026-07-10 14:07:10.96327+09	\N	2026-07-10 14:07:10.96327+09	\N	1	SEED	tenant_admin	이회계	accounting@bktest.co.kr	010-3456-7890	TENANT	T0001	ACTIVE	TENANT_ADMIN	$2a$10$KbdwwwFlLXe0gqeBLY5/M.X95xcRsexPlvbovVtmfbr4EzowcW4L2	\N	f	{"scope": "TENANT_ONLY", "locale": "ko-KR", "nameEn": "Accounting Lee", "notify": "IN_APP + EMAIL", "reason": "이용회사 회계팀 관리자 유지", "endDate": "9999-12-31", "history": ["2026-02-15 TOTP 등록", "2026-01-10 회계팀 초대"], "position": "대리", "timezone": "Asia/Seoul", "startDate": "2026-01-10", "department": "회계팀", "externalId": "BK-ACC-0451", "roleExpire": "상시", "userIdCode": "U-TN-20451", "assignments": [["사용자그룹", "회계팀", "T0001", "2026-01-10", "9999-12-31", "ACTIVE"], ["Role", "TENANT_ADMIN", "T0001", "2026-01-10", "9999-12-31", "ACTIVE"], ["메뉴정책", "TN 업무메뉴", "테넌트 범위", "2026-01-10", "9999-12-31", "ACTIVE"]], "defaultRole": "TENANT_ADMIN", "operatorOrg": "- 해당없음", "defaultGroup": "회계팀", "accountExpire": "9999-12-31", "primaryBookkeeper": "이용회사"}
4	2026-07-10 14:07:10.96327+09	\N	2026-07-10 14:07:10.96327+09	\N	1	SEED	viewer	박열람	viewer@bktest.co.kr	010-4567-8901	TENANT	T0001	LOCKED	VIEWER	$2a$10$KbdwwwFlLXe0gqeBLY5/M.X95xcRsexPlvbovVtmfbr4EzowcW4L2	\N	f	{"scope": "TENANT_ONLY", "locale": "ko-KR", "nameEn": "Viewer Park", "notify": "EMAIL", "reason": "열람 전용 계정 · 로그인 5회 실패 잠금", "endDate": "9999-12-31", "history": ["2026-07-01 로그인 5회 실패 잠금", "2026-02-01 초대"], "position": "사원", "timezone": "Asia/Seoul", "startDate": "2026-02-01", "department": "재무팀", "externalId": "BK-VIEW-0452", "roleExpire": "2026-12-31", "userIdCode": "U-TN-20452", "assignments": [["사용자그룹", "재무팀", "T0001", "2026-02-01", "9999-12-31", "ACTIVE"], ["Role", "VIEWER", "T0001", "2026-02-01", "2026-12-31", "ACTIVE"]], "defaultRole": "VIEWER", "operatorOrg": "- 해당없음", "defaultGroup": "재무팀", "accountExpire": "9999-12-31", "primaryBookkeeper": "이용회사"}
2	2026-07-10 14:07:10.96327+09	\N	2026-07-10 15:39:14.731659+09	\N	2	SEED	bk_preparer	김기장	preparer@example.com	010-2345-6789	OPERATOR	\N	ACTIVE	BK_PREPARER	$2a$10$KbdwwwFlLXe0gqeBLY5/M.X95xcRsexPlvbovVtmfbr4EzowcW4L2	\N	f	{"scope": "OPERATOR_ORG", "locale": "ko-KR", "nameEn": "Kijang Kim1", "notify": "IN_APP", "reason": "기장 담당 배정", "endDate": "9999-12-31", "history": ["2026-03-01 기장운영팀 배정"], "position": "스태프", "timezone": "Asia/Seoul", "startDate": "2026-03-01", "department": "기장운영팀", "externalId": "EY-OPS-0109", "roleExpire": "2026-12-31", "userIdCode": "U-OP-00109", "assignments": [["사용자그룹", "기장운영팀", "OPERATOR_ORG", "2026-03-01", "9999-12-31", "ACTIVE"], ["Role", "BK_PREPARER", "OPERATOR_ORG", "2026-03-01", "2026-12-31", "ACTIVE"]], "defaultRole": "BK_PREPARER", "operatorOrg": "BK-OPS · 기장운영팀", "defaultGroup": "기장운영팀", "accountExpire": "2026-09-30", "primaryBookkeeper": "관리회사"}
1	2026-07-10 14:07:10.96327+09	\N	2026-07-10 17:17:19.755335+09	\N	5	SEED	admin	조강수	nazcacks@gmail.com	010-1234-5678	OPERATOR	\N	ACTIVE	BK_MANAGER,SEC_ADMIN	$2a$10$KbdwwwFlLXe0gqeBLY5/M.X95xcRsexPlvbovVtmfbr4EzowcW4L2	2026-07-10 17:17:19.751+09	f	{"scope": "GLOBAL", "locale": "ko-KR", "nameEn": "Kangsoo Cho", "notify": "IN_APP + EMAIL", "reason": "정기 권한 점검 결과 유지", "endDate": "9999-12-31", "history": ["2026-07-08 Role 유지", "2026-06-30 연락처 변경", "2026-06-01 그룹 재배정"], "position": "�Ŵ���", "timezone": "Asia/Seoul", "startDate": "2026-01-01", "department": "시스템운영팀", "externalId": "EY-OPS-0031", "roleExpire": "상시", "userIdCode": "U-OP-00031", "assignments": [["사용자그룹", "보안운영팀", "GLOBAL", "2026-01-01", "9999-12-31", "ACTIVE"], ["Role", "SEC_ADMIN", "GLOBAL", "2026-01-01", "9999-12-31", "ACTIVE"], ["메뉴정책", "OP-08 DENY", "기장업무 제외", "2026-01-01", "9999-12-31", "SOD"]], "defaultRole": "SEC_ADMIN", "operatorOrg": "SYS-OPS · 시스템운영팀", "defaultGroup": "보안운영팀", "accountExpire": "9999-12-31", "primaryBookkeeper": "관리회사"}
\.


--
-- Data for Name: audit_log; Type: TABLE DATA; Schema: public; Owner: bk_app
--

COPY public.audit_log (id, created_at, tenant_id, user_id, login_id, user_name, action, resource, menu_code, http_method, request_path, before_data, after_data, request_id, ip, user_agent, result, prev_hash, chain_hash) FROM stdin;
1	2026-07-09 15:15:19.166373+09	\N	1	admin	조강수	UPDATE	MASKING_POLICY	\N	PUT	/api/security/masking-policies/1	\N	{"isActive": true}	decc94d9-0b95-4702-9648-a947d548b28a	::1	curl/7.51.0	SUCCESS	\N	866a2fa9cad544c19487a716d262f6fa821bc4a7da94903db253377caebb0da7
2	2026-07-10 11:16:49.651562+09	T0001	0	dev	개발사용자	CREATE	ADMIN_RESOURCE	\N	POST	/api/resources/tenant	\N	{"name": "�׽�Ʈȸ��", "tier": "SHARED", "quota": "-", "status": "ACTIVE", "tenant": "T-99999", "verify": "-", "snapshot": "-"}	0f76bee5-2079-45ae-a4e8-365d3ec47daa	::1	curl/7.51.0	SUCCESS	866a2fa9cad544c19487a716d262f6fa821bc4a7da94903db253377caebb0da7	3b1f04594df2a4e40b1e672bb3b18f14b6678c3e9edcf8b65046625d3d5343b0
3	2026-07-10 11:16:50.097837+09	T0001	0	dev	개발사용자	UPDATE	ADMIN_RESOURCE	\N	PUT	/api/resources/tenant/21	\N	{"status": "SUSPENDED"}	436fbb04-3940-4043-88d0-39ef0621208e	::1	curl/7.51.0	SUCCESS	3b1f04594df2a4e40b1e672bb3b18f14b6678c3e9edcf8b65046625d3d5343b0	a881d02c1c83af3671208c8591b3a88abcac7a94620ac5b9cdb92da9ce6d2e0f
4	2026-07-10 11:16:50.779836+09	T0001	0	dev	개발사용자	DELETE	ADMIN_RESOURCE	\N	DELETE	/api/resources/tenant/21	\N	{}	f2ad994b-fa5d-4757-892f-c97397092d0f	::1	curl/7.51.0	SUCCESS	a881d02c1c83af3671208c8591b3a88abcac7a94620ac5b9cdb92da9ce6d2e0f	7e75b0d2ab5db9ac674b8e76b823f14a508c97e082dacb7fd0f30d17fd34c42f
5	2026-07-10 11:16:51.523004+09	T0001	0	dev	개발사용자	CREATE	USER	\N	POST	/api/users	\N	{"name": "�׽�Ʈ", "email": "crud@test.com", "phone": "010-9999-8888", "roles": ["VIEWER"], "loginId": "crud.test", "tenantId": "T0001", "userGroup": "TENANT"}	29a686d2-8c57-41ba-960a-67a2117a8bf2	::1	curl/7.51.0	SUCCESS	7e75b0d2ab5db9ac674b8e76b823f14a508c97e082dacb7fd0f30d17fd34c42f	33690be41a0a37d17f813ec5afc8591c6a7779522a61249d7a591f66335ab162
6	2026-07-10 11:16:52.652229+09	T0001	0	dev	개발사용자	DISABLE	USER	\N	DELETE	/api/users/5	\N	{}	fd442eec-9065-4951-9070-49e2bce9946c	::1	curl/7.51.0	SUCCESS	33690be41a0a37d17f813ec5afc8591c6a7779522a61249d7a591f66335ab162	0b5df622e66da97660bb4379982591325b73c59644009622b639fabb1bdb4b8e
7	2026-07-10 11:16:55.004085+09	T0001	0	dev	개발사용자	CREATE	COMMON_CODE_ITEM	\N	POST	/api/common-codes/JOURNAL_TYPE/items	\N	{"code": "TEST", "name": "�׽�Ʈ�ڵ�", "sortOrder": 99}	38268756-6084-4460-a8c3-488787b94a6f	::1	curl/7.51.0	SUCCESS	0b5df622e66da97660bb4379982591325b73c59644009622b639fabb1bdb4b8e	d218159b222a0156f5aab7e7c36c2575ec2b1ed3ac5a86477711afb1417b8a3e
8	2026-07-10 11:16:55.377263+09	T0001	0	dev	개발사용자	DELETE	COMMON_CODE_ITEM	\N	DELETE	/api/common-codes/JOURNAL_TYPE/items/TEST	\N	{}	01a235c9-7a07-4fdf-b57c-d67900c7735c	::1	curl/7.51.0	SUCCESS	d218159b222a0156f5aab7e7c36c2575ec2b1ed3ac5a86477711afb1417b8a3e	bf39b8dda60f8eaea810d62b7828195be8f2540f3c1eb8420979a6645fdeec0c
9	2026-07-10 11:20:49.511402+09	\N	1	admin	조강수	CREATE	USER	\N	POST	/api/users	\N	{"name": "test1", "email": "test1@aaa.com", "roles": [], "status": "ACTIVE", "loginId": "test1", "tenantId": "T0001", "userGroup": "TENANT"}	93f98b43-fc5b-403c-a98b-da8e24292a60	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	SUCCESS	bf39b8dda60f8eaea810d62b7828195be8f2540f3c1eb8420979a6645fdeec0c	b25dc2f65481f285d220105d84d2cac088dc5c13c6ea72dc1f9682c53ee5328f
10	2026-07-10 14:14:26.287766+09	T0001	0	dev	개발사용자	UPDATE	USER	\N	PUT	/api/users/1	\N	{"detail": {"scope": "GLOBAL", "locale": "ko-KR", "nameEn": "Kangsoo Cho", "notify": "IN_APP + EMAIL", "reason": "정기 권한 점검 결과 유지", "endDate": "9999-12-31", "history": ["2026-07-08 Role 유지", "2026-06-30 연락처 변경", "2026-06-01 그룹 재배정"], "position": "�ôϾ� �Ŵ���", "timezone": "Asia/Seoul", "startDate": "2026-01-01", "department": "시스템운영팀", "externalId": "EY-OPS-0031", "roleExpire": "상시", "userIdCode": "U-OP-00031", "assignments": [["사용자그룹", "보안운영팀", "GLOBAL", "2026-01-01", "9999-12-31", "ACTIVE"], ["Role", "SEC_ADMIN", "GLOBAL", "2026-01-01", "9999-12-31", "ACTIVE"], ["메뉴정책", "OP-08 DENY", "기장업무 제외", "2026-01-01", "9999-12-31", "SOD"]], "defaultRole": "SEC_ADMIN", "operatorOrg": "SYS-OPS · 시스템운영팀", "defaultGroup": "보안운영팀", "accountExpire": "9999-12-31", "primaryBookkeeper": "관리회사"}}	11d46091-33eb-47d0-a4a3-6ce1c4cf9ad8	::1	curl/7.51.0	SUCCESS	b25dc2f65481f285d220105d84d2cac088dc5c13c6ea72dc1f9682c53ee5328f	b488078849f5c1fceca306e34f621b415057870964e4a3a4160f9b14f6114bae
11	2026-07-10 15:03:24.569301+09	T0001	0	dev	개발사용자	UPDATE	USER	\N	PUT	/api/users/1	\N	{"detail": {"scope": "GLOBAL", "locale": "ko-KR", "nameEn": "Kangsoo Cho", "notify": "IN_APP + EMAIL", "reason": "정기 권한 점검 결과 유지", "endDate": "9999-12-31", "history": ["2026-07-08 Role 유지", "2026-06-30 연락처 변경", "2026-06-01 그룹 재배정"], "position": "�Ŵ���", "timezone": "Asia/Seoul", "startDate": "2026-01-01", "department": "시스템운영팀", "externalId": "EY-OPS-0031", "roleExpire": "상시", "userIdCode": "U-OP-00031", "assignments": [["사용자그룹", "보안운영팀", "GLOBAL", "2026-01-01", "9999-12-31", "ACTIVE"], ["Role", "SEC_ADMIN", "GLOBAL", "2026-01-01", "9999-12-31", "ACTIVE"], ["메뉴정책", "OP-08 DENY", "기장업무 제외", "2026-01-01", "9999-12-31", "SOD"]], "defaultRole": "SEC_ADMIN", "operatorOrg": "SYS-OPS · 시스템운영팀", "defaultGroup": "보안운영팀", "accountExpire": "9999-12-31", "primaryBookkeeper": "관리회사"}}	8989e45c-1dc2-4b9e-9b9b-fcc044821761	::1	curl/7.51.0	SUCCESS	b488078849f5c1fceca306e34f621b415057870964e4a3a4160f9b14f6114bae	eb355a28799225f9c0b49502786a1e1a6782ad07c5442401f3249bd9799630b1
12	2026-07-10 15:28:57.513429+09	\N	1	admin	조강수	UPDATE	USER	\N	PUT	/api/users/1	\N	{"name": "조강수", "email": "nazcacks@gmail.com", "roles": ["BK_MANAGER", "SEC_ADMIN"], "detail": {"scope": "GLOBAL", "locale": "ko-KR", "nameEn": "Kangsoo Cho", "notify": "IN_APP + EMAIL", "reason": "정기 권한 점검 결과 유지", "endDate": "9999-12-31", "history": ["2026-07-08 Role 유지", "2026-06-30 연락처 변경", "2026-06-01 그룹 재배정"], "position": "�Ŵ���", "timezone": "Asia/Seoul", "startDate": "2026-01-01", "department": "시스템운영팀", "externalId": "EY-OPS-0031", "roleExpire": "상시", "userIdCode": "U-OP-00031", "assignments": [["사용자그룹", "보안운영팀", "GLOBAL", "2026-01-01", "9999-12-31", "ACTIVE"], ["Role", "SEC_ADMIN", "GLOBAL", "2026-01-01", "9999-12-31", "ACTIVE"], ["메뉴정책", "OP-08 DENY", "기장업무 제외", "2026-01-01", "9999-12-31", "SOD"]], "defaultRole": "SEC_ADMIN", "operatorOrg": "SYS-OPS · 시스템운영팀", "defaultGroup": "보안운영팀", "accountExpire": "9999-12-31", "primaryBookkeeper": "관리회사"}, "status": "ACTIVE", "loginId": "admin", "userGroup": "OPERATOR"}	373423ff-7726-49d6-8e17-6d2e22cef250	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	SUCCESS	eb355a28799225f9c0b49502786a1e1a6782ad07c5442401f3249bd9799630b1	fd32fb3c2fbd2aa1161035aebbec1ecbd3602638d15fb495b46bec54494dabde
13	2026-07-10 15:29:23.895596+09	\N	1	admin	조강수	UPDATE	USER	\N	PUT	/api/users/1	\N	{"name": "조강수", "email": "nazcacks@gmail.com", "roles": ["BK_MANAGER", "SEC_ADMIN"], "detail": {"scope": "GLOBAL", "locale": "ko-KR", "nameEn": "Kangsoo Cho", "notify": "IN_APP + EMAIL", "reason": "정기 권한 점검 결과 유지", "endDate": "9999-12-31", "history": ["2026-07-08 Role 유지", "2026-06-30 연락처 변경", "2026-06-01 그룹 재배정"], "position": "�Ŵ���", "timezone": "Asia/Seoul", "startDate": "2026-01-01", "department": "시스템운영팀", "externalId": "EY-OPS-0031", "roleExpire": "상시", "userIdCode": "U-OP-00031", "assignments": [["사용자그룹", "보안운영팀", "GLOBAL", "2026-01-01", "9999-12-31", "ACTIVE"], ["Role", "SEC_ADMIN", "GLOBAL", "2026-01-01", "9999-12-31", "ACTIVE"], ["메뉴정책", "OP-08 DENY", "기장업무 제외", "2026-01-01", "9999-12-31", "SOD"]], "defaultRole": "SEC_ADMIN", "operatorOrg": "SYS-OPS · 시스템운영팀", "defaultGroup": "보안운영팀", "accountExpire": "9999-12-31", "primaryBookkeeper": "관리회사"}, "status": "ACTIVE", "loginId": "admin", "userGroup": "OPERATOR"}	6ee9f6e5-2b49-4623-b2ad-41a03f1587ff	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	SUCCESS	fd32fb3c2fbd2aa1161035aebbec1ecbd3602638d15fb495b46bec54494dabde	a3051fc66f6cc328bcfb1e2bbf4c72a24ce7f4df8095b36f00c479c4f53b46a1
14	2026-07-10 15:39:14.744146+09	\N	1	admin	조강수	UPDATE	USER	\N	PUT	/api/users/2	\N	{"name": "김기장", "email": "preparer@example.com", "phone": "010-2345-6789", "roles": ["BK_PREPARER"], "detail": {"scope": "OPERATOR_ORG", "locale": "ko-KR", "nameEn": "Kijang Kim1", "notify": "IN_APP", "reason": "기장 담당 배정", "endDate": "9999-12-31", "history": ["2026-03-01 기장운영팀 배정"], "position": "스태프", "timezone": "Asia/Seoul", "startDate": "2026-03-01", "department": "기장운영팀", "externalId": "EY-OPS-0109", "roleExpire": "2026-12-31", "userIdCode": "U-OP-00109", "assignments": [["사용자그룹", "기장운영팀", "OPERATOR_ORG", "2026-03-01", "9999-12-31", "ACTIVE"], ["Role", "BK_PREPARER", "OPERATOR_ORG", "2026-03-01", "2026-12-31", "ACTIVE"]], "defaultRole": "BK_PREPARER", "operatorOrg": "BK-OPS · 기장운영팀", "defaultGroup": "기장운영팀", "accountExpire": "2026-09-30", "primaryBookkeeper": "관리회사"}, "status": "ACTIVE", "loginId": "bk_preparer", "userGroup": "OPERATOR"}	3ce3474d-0a5a-42f6-a6dd-e255cc2ccfa4	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	SUCCESS	a3051fc66f6cc328bcfb1e2bbf4c72a24ce7f4df8095b36f00c479c4f53b46a1	9f20c73df3321338d75c6cc7cca4199a07169dff81a64615d791e7ba66279b08
\.


--
-- Data for Name: common_code_group; Type: TABLE DATA; Schema: public; Owner: bk_app
--

COPY public.common_code_group (id, created_at, created_by, updated_at, updated_by, version, source, group_code, group_name, is_active, name_en, domain, policy, description) FROM stdin;
1	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	USER_GROUP	사용자 그룹	t	User Group	AUTH	SYSTEM_LOCKED	인증 토큰, 메뉴 채널, 권한 평가 (출처: 시스템관리자 §4.12)
2	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	OPERATOR_ROLE	운영자 Role	t	Operator Role	AUTH	ADMIN_MANAGED	운영 콘솔 Role, 업무 배정 (출처: 시스템관리자 §4.12, bk §4.5)
3	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	ACCOUNT_STATUS	계정 상태	t	Account Status	AUTH	SYSTEM_LOCKED	로그인, 계정관리, 보안 이벤트 (출처: bk §12.2, §13.4, 시스템관리자 §4.12)
4	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	AUTH_FACTOR_TYPE	인증 수단	t	Authentication Factor Type	AUTH	SYSTEM_LOCKED	MFA, SSO, Step-up (출처: bk §3)
5	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	TENANT_STATUS	테넌트 상태	t	Tenant Status	TENANT	SYSTEM_LOCKED	이용회사 상태, 구독·업무 차단 (출처: bk §12.2, §13.4)
6	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	TENANT_TIER	테넌트 티어	t	Tenant Tier	TENANT	ADMIN_MANAGED	멀티테넌시 격리, 백업, 쿼터 (출처: bk §2, §12.2)
7	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	SUBSCRIPTION_STATUS	구독 상태	t	Subscription Status	BILLING	ADMIN_MANAGED	구독·요금, 기능 제한 (출처: bk §12.2, §13.4, 운영자 §11.2)
8	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	ADMIN_ACCESS_MODE	관리자 접근모드	t	Admin Access Mode	ACCESS	SYSTEM_LOCKED	운영자 접근 세션, 배너, 감사로그 (출처: bk §5, §12.2, 시스템관리자 §4.12)
9	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	BOOKKEEPING_MODE	기장 모드	t	Bookkeeping Mode	OPERATION	ADMIN_MANAGED	회계·세무 업무 수행 주체 (출처: bk §21, 운영자 §11.2)
10	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	PRIMARY_BOOKKEEPER	주기장	t	Primary Bookkeeper	OPERATION	ADMIN_MANAGED	마감·결산·신고 권한 귀속 (출처: 시스템관리자 §4.12)
11	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	MENU_TYPE	메뉴 유형	t	Menu Type	MENU	SYSTEM_LOCKED	메뉴 마스터, 권한 평가 (출처: bk §4.3, 시스템관리자 §4.12)
12	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	ACTION_TYPE	행위 유형	t	Action Type	MENU	SYSTEM_LOCKED	버튼 권한, API scope (출처: 시스템관리자 §4.12)
13	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	GUARDRAIL_TYPE	가드레일 유형	t	Guardrail Type	PERMISSION	SYSTEM_LOCKED	권한·위임 정책 (출처: bk §4.3, 시스템관리자 §4.12)
14	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	STANDARD_STATUS	표준 버전 상태	t	Standard Version Status	STANDARD	SYSTEM_LOCKED	표준 카탈로그 버전 (출처: bk §12.2, 운영자 §11.2)
15	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	STANDARD_DISTRIBUTION_MODE	표준 배포 모드	t	Standard Distribution Mode	STANDARD	SYSTEM_LOCKED	표준 배포 정책 (출처: bk §6, §12.2)
16	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	JOB_STATUS	배치 상태	t	Job Status	BATCH	SYSTEM_LOCKED	운영 배치, 큐, DLQ (출처: bk §14.5, 시스템관리자 §4.12)
17	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	TIER_MIGRATION_STATUS	티어 전환 상태	t	Tier Migration Status	TENANT	ADMIN_MANAGED	테넌트 티어 전환 작업 (출처: bk §12.2, 시스템관리자 §4.12)
18	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	SECURITY_INCIDENT_STATUS	보안 인시던트 상태	t	Security Incident Status	SECURITY	SYSTEM_LOCKED	보안 이벤트, IR (출처: bk §12.2, 시스템관리자 §4.12)
19	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	SENSITIVITY_CLASS	민감정보 등급	t	Sensitivity Class	SECURITY	SYSTEM_LOCKED	마스킹, 녹화, DLP (출처: 시스템관리자 §4.12)
20	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	NOTIFICATION_CHANNEL	알림 채널	t	Notification Channel	NOTIFICATION	ADMIN_MANAGED	알림 발송 (출처: 시스템관리자 §4.12)
21	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	ERROR_CODE	오류 코드	t	Error Code	ERROR	ADMIN_MANAGED	API 오류, UI 복구 가이드 (출처: bk §26.4, 개발설계 API/예외 표)
22	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	AUDIT_EVENT_TYPE	감사 이벤트	t	Audit Event Type	AUDIT	SYSTEM_LOCKED	감사로그, 보안 이벤트 (출처: 시스템관리자 §4.12)
23	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	FEATURE_FLAG_TYPE	기능 플래그 유형	t	Feature Flag Type	OPERATION	ADMIN_MANAGED	기능 플래그, 배포 게이트 (출처: 시스템관리자 §4.12)
24	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	RETENTION_CLASS	파일 보존 등급	t	Retention Class	RETENTION	ADMIN_MANAGED	데이터 티어링, 파기 (출처: 시스템관리자 §4.12)
25	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	BOOKKEEPING_SWITCH_STATUS	기장 모드 전환 상태	t	Bookkeeping Switch Status	OPERATION	ADMIN_MANAGED	기장 모드 변경 워크플로 (출처: bk §12.2, 운영자 §11.2)
26	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	TENANT_ACK_STATUS	이용회사 확인 상태	t	Tenant Acknowledgement Status	OPERATION	ADMIN_MANAGED	마감·신고·보고 확인 (출처: bk §12.2, 운영자 §11.2)
27	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	BREAK_GLASS_STATUS	긴급대행 상태	t	Break-glass Status	SECURITY	SYSTEM_LOCKED	긴급 접근 승인·검토 (출처: bk §12.2, 시스템관리자 §6.3)
28	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	DIMENSION_ASSIGNMENT_JOB_STATUS	차원 배정잡 상태	t	Dimension Assignment Job Status	BATCH	ADMIN_MANAGED	차원 일괄배정 배치 (출처: bk §12.2)
29	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	CONVERSION_BATCH_STATUS	변환 배치 상태	t	Conversion Batch Status	BATCH	ADMIN_MANAGED	회계기준/외부자료 변환 배치 (출처: bk §12.2, §13.4, §14.5)
30	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	COLLECTION_TASK_STATUS	수집 태스크 상태	t	Collection Task Status	BATCH	SYSTEM_LOCKED	외부수집, 스크래핑, 큐 (출처: bk §12.2, 시스템관리자 §6.3)
31	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	DISCLOSURE_DOCUMENT_STATUS	공시자료 상태	t	Disclosure Document Status	REPORT	ADMIN_MANAGED	공시자료·XBRL 생성/제출 (출처: bk §12.2, §13.4)
32	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	ANOMALY_ALERT_STATUS	이상 알림 상태	t	Anomaly Alert Status	AUDIT	ADMIN_MANAGED	이상거래 알림 처리 (출처: bk §12.2, §13.4)
33	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	ANOMALY_MODEL_STATUS	이상 모델 상태	t	Anomaly Model Status	AUDIT	ADMIN_MANAGED	이상탐지 모델 생명주기 (출처: bk §12.2)
34	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	CHATBOT_SESSION_STATUS	챗봇 세션 상태	t	Chatbot Session Status	AI	ADMIN_MANAGED	AI 조회 챗봇 세션 (출처: bk §12.2, §13.4)
35	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	FISCAL_PERIOD_STATUS	회계기간 상태	t	Fiscal Period Status	ACCOUNTING	SYSTEM_LOCKED	회계기간, 마감 잠금 (출처: bk §12.2, 페이즈02/05)
36	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	JOURNAL_ENTRY_CODE	전표 분개구분	t	Journal Entry Code	JOURNAL	SYSTEM_LOCKED	전표 라인 차대·결산·세무 조정 (출처: bk §11.1, §12.2, 페이즈03/05)
37	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	NOTIFICATION_DELIVERY_STATUS	알림 발송 상태	t	Notification Delivery Status	NOTIFICATION	SYSTEM_LOCKED	알림 발송·읽음 처리 (출처: bk §12.2)
38	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	EVIDENCE_STATUS	증빙 상태	t	Evidence Status	EVIDENCE	ADMIN_MANAGED	증빙 수집·검증·매칭 (출처: bk §12.2, 페이즈06/07)
39	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	REPORT_PACKAGE_STATUS	보고패키지 상태	t	Report Package Status	REPORT	ADMIN_MANAGED	월별 보고패키지 조립·전달 (출처: bk §12.2, 운영자 §11.2)
40	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	TIE_OUT_STATUS	계정 명세 Tie-out 상태	t	Tie-out Status	REPORT	ADMIN_MANAGED	계정별 명세 대사 결과 (출처: bk §12.2)
41	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	OPEN_ITEM_STATUS	미결항목 상태	t	Open Item Status	ACCOUNTING	ADMIN_MANAGED	미결항목 회신·해소 (출처: bk §12.2, 운영자 §11.2)
42	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	GROUP_REPORT_EXPORT_STATUS	그룹보고 Export 상태	t	Group Report Export Status	REPORT	ADMIN_MANAGED	그룹 보고 Export (출처: bk §12.2)
43	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	COST_CALCULATION_STATUS	제조원가 계산 상태	t	Cost Calculation Status	COST	ADMIN_MANAGED	제조원가 계산·승인 (출처: bk §12.2, 페이즈05)
44	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	NTS_TRANSMISSION_STATUS	국세청 전송상태	t	NTS Transmission Status	VAT	ADMIN_MANAGED	국세청/홈택스 전송·대사 (출처: bk §11.4, §12.2, 페이즈07)
45	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	JOURNAL_TYPE	전표 유형	t	Journal Type	JOURNAL	ADMIN_MANAGED	화면 구분 컬럼, 입출금 자동 판별 (출처: bk §12.2, 페이즈03)
46	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	JOURNAL_NUMBERING_STATUS	전표번호 채번 상태	t	Journal Numbering Status	JOURNAL	SYSTEM_LOCKED	일자별 전표번호 채번·결번 (출처: bk §12.2, 페이즈10)
47	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	BUSINESS_PARTNER_STATUS	거래처 상태	t	Business Partner Status	MASTERDATA	ADMIN_MANAGED	거래처 승인·휴폐업 통제 (출처: bk §12.2, 페이즈01/04)
48	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	JOURNAL_STATUS	전표 상태	t	Journal Status	JOURNAL	SYSTEM_LOCKED	전표 작성·승인·기표·취소 (출처: bk §13.4, §14.5)
49	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	APPROVAL_STATUS	결재 상태	t	Approval Status	APPROVAL	SYSTEM_LOCKED	전자결재·승인 워크플로 (출처: bk §13.4, §14.5)
50	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	SERVICE_CONTRACT_STATUS	서비스계약 상태	t	Service Contract Status	CONTRACT	ADMIN_MANAGED	서비스 계약 생명주기 (출처: bk §14.5)
51	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	ASSIGNMENT_STATUS	담당배정 상태	t	Assignment Status	OPERATION	ADMIN_MANAGED	담당자 배정·이관 (출처: bk §14.5)
52	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	CLIENT_TASK_STATUS	고객업무 상태	t	Client Task Status	OPERATION	ADMIN_MANAGED	고객 자료요청·검토·완료 (출처: bk §14.5)
53	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	TAX_INVOICE_STATUS	세금계산서 상태	t	Tax Invoice Status	VAT	ADMIN_MANAGED	세금계산서 전송·재시도 (출처: bk §14.5)
54	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	FILING_FILE_STATUS	신고파일 상태	t	Filing File Status	TAX	ADMIN_MANAGED	신고파일 생성·제출 (출처: bk §14.5, 페이즈06)
55	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	ASSET_STATUS	자산 상태	t	Asset Status	ASSET	ADMIN_MANAGED	고정자산 생명주기 (출처: bk §14.5, 페이즈08)
56	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	VAT_RETURN_TYPE	부가세신고유형	t	VAT Return Type	VAT	ADMIN_MANAGED	부가세 신고 구분 (출처: bk §14.5, 페이즈06)
57	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	BOOKKEEPING_SCOPE_TYPE	기장 분담 기준	t	Bookkeeping Scope Type	OPERATION	ADMIN_MANAGED	HYBRID 업무 분담 규칙 (출처: 운영자 §9.5, bk §21.6)
58	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	STANDARD_CATALOG_CODE	표준 카탈로그 코드	t	Standard Catalog Code	STANDARD	STANDARD_MANAGED	공통 표준 카탈로그 종류 (출처: bk §6.1, 페이즈01)
59	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	DIMENSION_TYPE	관리차원 유형	t	Dimension Type	MASTERDATA	STANDARD_MANAGED	전표 라인·보고 차원 (출처: bk §9, 페이즈01)
60	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	JOURNAL_APPROVAL_MODE	전표 결재 모드	t	Journal Approval Mode	JOURNAL	ADMIN_MANAGED	회사별 전표 결재 옵션 (출처: bk §11.1)
61	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	CASH_FLOW_ACTIVITY	현금흐름 활동구분	t	Cash Flow Activity	REPORT	STANDARD_MANAGED	현금흐름표 활동 구분 (출처: bk §11.3.1, 페이즈05)
62	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	DISCLOSURE_REPORT_TYPE	공시 보고서 유형	t	Disclosure Report Type	REPORT	STANDARD_MANAGED	공시자료·XBRL 산출 유형 (출처: bk §11.3.2)
63	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	ACCOUNTING_STANDARD	회계기준	t	Accounting Standard	ACCOUNTING	STANDARD_MANAGED	다중 회계기준·변환 (출처: bk §11.6)
64	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	AUX_LEDGER_TYPE	보조원장 유형	t	Auxiliary Ledger Type	LEDGER	STANDARD_MANAGED	전표 라인 보조부 연결 (출처: bk §12.1)
65	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	TENANT_INPUT_POLICY	이용회사 입력 정책	t	Tenant Input Policy	OPERATION	ADMIN_MANAGED	기장대행 회사의 이용회사 입력 허용범위 (출처: bk §11.1, 페이즈09)
66	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	BILL_RECEIVABLE_STATUS	받을어음 상태	t	Bill Receivable Status	TREASURY	ADMIN_MANAGED	받을어음 보관·할인·배서·만기 (출처: 페이즈09 §자금·어음)
67	2026-07-10 12:14:42.73134+09	\N	2026-07-10 12:14:42.73134+09	\N	1	UI	BILL_PAPER_STATUS	어음 용지 상태	t	Bill Paper Status	TREASURY	ADMIN_MANAGED	어음 용지 발행·결제·폐기 (출처: 페이즈09 §자금·어음)
\.


--
-- Data for Name: common_code_item; Type: TABLE DATA; Schema: public; Owner: bk_app
--

COPY public.common_code_item (id, created_at, created_by, updated_at, updated_by, version, source, group_code, code, name, name_en, sort_order, attributes, is_active) FROM stdin;
1	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	USER_GROUP	OPERATOR	관리회사 운영자	Operator	1	\N	t
2	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	USER_GROUP	TENANT	이용회사 사용자	Tenant User	2	\N	t
3	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	OPERATOR_ROLE	BK_MANAGER	기장 책임	Bookkeeping Manager	1	\N	t
4	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	OPERATOR_ROLE	BK_PREPARER	기장 담당	Bookkeeping Preparer	2	\N	t
5	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	OPERATOR_ROLE	BK_REVIEWER	기장 검토	Bookkeeping Reviewer	3	\N	t
6	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	OPERATOR_ROLE	SEC_ADMIN	시스템관리자	Security/System Admin	4	\N	t
7	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	OPERATOR_ROLE	AUDITOR	감사자	Auditor	5	\N	t
8	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	OPERATOR_ROLE	BILLING	청구 담당	Billing	6	\N	t
9	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACCOUNT_STATUS	ACTIVE	활성	Active	1	\N	t
10	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACCOUNT_STATUS	LOCKED	잠금	Locked	2	\N	t
11	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACCOUNT_STATUS	PASSWORD_EXPIRED	비밀번호 만료	Password Expired	3	\N	t
12	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACCOUNT_STATUS	SUSPENDED	정지	Suspended	4	\N	t
13	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACCOUNT_STATUS	DORMANT	휴면	Dormant	5	\N	t
14	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACCOUNT_STATUS	DISABLED	비활성	Disabled	6	\N	t
15	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUTH_FACTOR_TYPE	PASSWORD	비밀번호	Password	1	\N	t
16	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUTH_FACTOR_TYPE	TOTP	OTP 앱	TOTP	2	\N	t
17	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUTH_FACTOR_TYPE	SMS_OTP	SMS OTP	SMS OTP	3	\N	t
18	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUTH_FACTOR_TYPE	EMAIL_OTP	이메일 OTP	Email OTP	4	\N	t
19	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUTH_FACTOR_TYPE	WEBAUTHN	패스키/WebAuthn	WebAuthn	5	\N	t
20	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUTH_FACTOR_TYPE	BACKUP_CODE	백업 코드	Backup Code	6	\N	t
21	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUTH_FACTOR_TYPE	SAML	SAML SSO	SAML	7	\N	t
22	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUTH_FACTOR_TYPE	OIDC	OIDC SSO	OIDC	8	\N	t
23	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TENANT_STATUS	PENDING	가입대기	Pending	1	\N	t
24	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TENANT_STATUS	ACTIVE	활성	Active	2	\N	t
25	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TENANT_STATUS	SUSPENDED	정지	Suspended	3	\N	t
26	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TENANT_STATUS	DORMANT	휴면	Dormant	4	\N	t
27	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TENANT_STATUS	TERMINATED	종료	Terminated	5	\N	t
28	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TENANT_TIER	SHARED	공유	Shared	1	\N	t
29	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TENANT_TIER	SCHEMA	스키마 분리	Schema	2	\N	t
30	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TENANT_TIER	DEDICATED	전용	Dedicated	3	\N	t
31	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SUBSCRIPTION_STATUS	TRIAL	체험	Trial	1	\N	t
32	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SUBSCRIPTION_STATUS	ACTIVE	정상	Active	2	\N	t
33	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SUBSCRIPTION_STATUS	PAST_DUE	연체	Past Due	3	\N	t
34	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SUBSCRIPTION_STATUS	SUSPENDED	정지	Suspended	4	\N	t
35	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SUBSCRIPTION_STATUS	GRACE	유예	Grace	5	\N	t
36	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SUBSCRIPTION_STATUS	TERMINATED	해지	Terminated	6	\N	t
37	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SUBSCRIPTION_STATUS	REACTIVATED	재활성	Reactivated	7	\N	t
38	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SUBSCRIPTION_STATUS	CANCELED	취소	Canceled	8	\N	t
39	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ADMIN_ACCESS_MODE	VIEW	조회 지원	View	1	\N	t
40	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ADMIN_ACCESS_MODE	SUPPORT_SESSION	지원 세션	Support Session	2	\N	t
41	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ADMIN_ACCESS_MODE	BOOKKEEPING	기장 수행	Bookkeeping	3	\N	t
42	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ADMIN_ACCESS_MODE	BREAK_GLASS	긴급대행	Break Glass	4	\N	t
43	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BOOKKEEPING_MODE	OPERATOR_LED	관리회사 주도	Operator Led	1	\N	t
44	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BOOKKEEPING_MODE	TENANT_LED	이용회사 주도	Tenant Led	2	\N	t
45	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BOOKKEEPING_MODE	HYBRID	혼합	Hybrid	3	\N	t
46	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	PRIMARY_BOOKKEEPER	OPERATOR	관리회사	Operator	1	\N	t
47	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	PRIMARY_BOOKKEEPER	TENANT	이용회사	Tenant	2	\N	t
48	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	MENU_TYPE	GROUP	그룹	Group	1	\N	t
49	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	MENU_TYPE	MENU	진입 메뉴	Menu	2	\N	t
50	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	MENU_TYPE	TAB	탭	Tab	3	\N	t
51	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	MENU_TYPE	ACTION	행위	Action	4	\N	t
52	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACTION_TYPE	READ	조회	Read	1	\N	t
53	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACTION_TYPE	CREATE	등록	Create	2	\N	t
54	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACTION_TYPE	UPDATE	수정	Update	3	\N	t
55	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACTION_TYPE	DELETE	삭제	Delete	4	\N	t
56	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACTION_TYPE	APPROVE	승인	Approve	5	\N	t
57	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACTION_TYPE	REJECT	반려	Reject	6	\N	t
58	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACTION_TYPE	CLOSE	마감	Close	7	\N	t
59	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACTION_TYPE	REOPEN	마감해제	Reopen	8	\N	t
60	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACTION_TYPE	SUBMIT	전송	Submit	9	\N	t
61	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACTION_TYPE	EXPORT	출력	Export	10	\N	t
62	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACTION_TYPE	PUBLISH	발행	Publish	11	\N	t
63	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACTION_TYPE	ROLLBACK	롤백	Rollback	12	\N	t
64	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	GUARDRAIL_TYPE	FORBID	금지	Forbid	1	\N	t
65	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	GUARDRAIL_TYPE	REQUIRE_SOD	직무분리 필요	Require SOD	2	\N	t
66	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	GUARDRAIL_TYPE	REQUIRE_STEPUP	재인증 필요	Require Step-up	3	\N	t
67	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	GUARDRAIL_TYPE	REQUIRE_APPROVAL	승인 필요	Require Approval	4	\N	t
68	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_STATUS	DRAFT	작성중	Draft	1	\N	t
69	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_STATUS	PUBLISHED	발행	Published	2	\N	t
70	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_STATUS	DEPRECATED	폐기예정	Deprecated	3	\N	t
71	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_STATUS	RETIRED	퇴역	Retired	4	\N	t
72	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_DISTRIBUTION_MODE	MANDATORY	강제	Mandatory	1	\N	t
73	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_DISTRIBUTION_MODE	RECOMMENDED	권고	Recommended	2	\N	t
74	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_DISTRIBUTION_MODE	OPTIONAL	선택	Optional	3	\N	t
75	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOB_STATUS	READY	준비	Ready	1	\N	t
76	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOB_STATUS	QUEUED	대기열	Queued	2	\N	t
77	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOB_STATUS	RUNNING	실행중	Running	3	\N	t
78	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOB_STATUS	SUCCESS	성공	Success	4	\N	t
79	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOB_STATUS	RETRY	재시도	Retry	5	\N	t
80	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOB_STATUS	FAILED	실패	Failed	6	\N	t
81	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOB_STATUS	DEAD_LETTER	DLQ	Dead Letter	7	\N	t
82	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOB_STATUS	PARTIAL_SUCCESS	부분성공	Partial Success	8	\N	t
83	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOB_STATUS	CANCELLED	취소	Cancelled	9	\N	t
84	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TIER_MIGRATION_STATUS	SCHEDULED	예약	Scheduled	1	\N	t
85	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TIER_MIGRATION_STATUS	PROVISIONING	프로비저닝	Provisioning	2	\N	t
86	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TIER_MIGRATION_STATUS	SNAPSHOTTING	스냅샷	Snapshotting	3	\N	t
87	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TIER_MIGRATION_STATUS	CDC_SYNC	CDC 동기화	CDC Sync	4	\N	t
88	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TIER_MIGRATION_STATUS	VALIDATING	검증	Validating	5	\N	t
89	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TIER_MIGRATION_STATUS	CUTOVER	전환	Cutover	6	\N	t
90	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TIER_MIGRATION_STATUS	COMPLETED	완료	Completed	7	\N	t
91	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TIER_MIGRATION_STATUS	ROLLED_BACK	롤백	Rolled Back	8	\N	t
92	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TIER_MIGRATION_STATUS	FAILED	실패	Failed	9	\N	t
93	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SECURITY_INCIDENT_STATUS	DETECTED	탐지	Detected	1	\N	t
94	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SECURITY_INCIDENT_STATUS	CONTAINED	격리	Contained	2	\N	t
95	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SECURITY_INCIDENT_STATUS	ANALYZING	분석중	Analyzing	3	\N	t
96	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SECURITY_INCIDENT_STATUS	RECOVERED	복구	Recovered	4	\N	t
97	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SECURITY_INCIDENT_STATUS	NOTIFIED	통지	Notified	5	\N	t
98	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SECURITY_INCIDENT_STATUS	CLOSED	종결	Closed	6	\N	t
99	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SENSITIVITY_CLASS	PUBLIC	공개	Public	1	\N	t
100	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SENSITIVITY_CLASS	INTERNAL	내부	Internal	2	\N	t
101	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SENSITIVITY_CLASS	PII	개인정보	PII	3	\N	t
102	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SENSITIVITY_CLASS	FINANCIAL	금융정보	Financial	4	\N	t
103	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SENSITIVITY_CLASS	PAYROLL	급여	Payroll	5	\N	t
104	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SENSITIVITY_CLASS	SECRET	비밀	Secret	6	\N	t
105	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SENSITIVITY_CLASS	PASSWORD	비밀번호	Password	7	\N	t
106	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	NOTIFICATION_CHANNEL	IN_APP	인앱	In App	1	\N	t
107	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	NOTIFICATION_CHANNEL	EMAIL	이메일	Email	2	\N	t
108	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	NOTIFICATION_CHANNEL	SMS	문자	SMS	3	\N	t
109	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	NOTIFICATION_CHANNEL	KAKAO	카카오	Kakao	4	\N	t
110	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	NOTIFICATION_CHANNEL	WEBHOOK	웹훅	Webhook	5	\N	t
111	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ERROR_CODE	STEP_UP_REQUIRED	재인증 필요	Step-up Required	1	\N	t
112	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ERROR_CODE	CONSOLE_IP_BLOCKED	콘솔 IP 차단	Console IP Blocked	2	\N	t
113	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ERROR_CODE	ACCESS_SESSION_REQUIRED	접근 세션 필요	Access Session Required	3	\N	t
114	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ERROR_CODE	BULK_ACTION_THRESHOLD	대량행위 임계 초과	Bulk Action Threshold	4	\N	t
115	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ERROR_CODE	FORBIDDEN_SCOPE	권한 범위 없음	Forbidden Scope	5	\N	t
116	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ERROR_CODE	VALIDATION_FAILED	검증 실패	Validation Failed	6	\N	t
117	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ERROR_CODE	CLOSING_LOCKED	마감 잠금	Closing Locked	7	\N	t
118	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ERROR_CODE	PERIOD_LOCKED	기간 잠금	Period Locked	8	\N	t
119	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ERROR_CODE	NOT_PRIMARY_BOOKKEEPER	주기장 아님	Not Primary Bookkeeper	9	\N	t
120	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ERROR_CODE	BOOKKEEPING_NOT_CONTRACTED	기장 계약 없음	Bookkeeping Not Contracted	10	\N	t
121	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ERROR_CODE	IDEMPOTENCY_CONFLICT	멱등키 충돌	Idempotency Conflict	11	\N	t
122	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ERROR_CODE	EXTERNAL_INTEGRATION_FAILED	외부연계 실패	External Integration Failed	12	\N	t
123	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ERROR_CODE	RATE_LIMITED	요청 제한	Rate Limited	13	\N	t
124	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ERROR_CODE	POSTED_IMMUTABLE	기표 후 불변	Posted Immutable	14	\N	t
125	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ERROR_CODE	NUMBERING_CONFLICT	채번 충돌	Numbering Conflict	15	\N	t
126	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ERROR_CODE	LOCK_NOT_ACQUIRED	잠금 획득 실패	Lock Not Acquired	16	\N	t
127	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ERROR_CODE	TENANT_ACCESS_DENIED	테넌트 접근 거부	Tenant Access Denied	17	\N	t
128	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ERROR_CODE	COMMON_CODE_GROUP_REQUIRED	공통코드 마스터 필요	Common Code Group Required	18	\N	t
129	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ERROR_CODE	COMMON_CODE_GROUP_ITEM_MISMATCH	마스터/세부 불일치	Common Code Group Item Mismatch	19	\N	t
130	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUDIT_EVENT_TYPE	LOGIN	로그인	Login	1	\N	t
131	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUDIT_EVENT_TYPE	ACCESS_SESSION_START	접근 세션 시작	Access Session Start	2	\N	t
132	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUDIT_EVENT_TYPE	DATA_EXPORT	자료 내보내기	Data Export	3	\N	t
133	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUDIT_EVENT_TYPE	ROLE_CHANGED	Role 변경	Role Changed	4	\N	t
134	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUDIT_EVENT_TYPE	KEY_ROTATED	키 회전	Key Rotated	5	\N	t
135	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUDIT_EVENT_TYPE	CODE_PUBLISHED	코드 발행	Code Published	6	\N	t
136	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	FEATURE_FLAG_TYPE	GLOBAL	전역	Global	1	\N	t
137	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	FEATURE_FLAG_TYPE	PLAN	요금제	Plan	2	\N	t
138	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	FEATURE_FLAG_TYPE	TENANT	테넌트	Tenant	3	\N	t
139	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	FEATURE_FLAG_TYPE	USER	사용자	User	4	\N	t
140	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	FEATURE_FLAG_TYPE	EXPERIMENT	실험	Experiment	5	\N	t
141	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	RETENTION_CLASS	HOT	핫	Hot	1	\N	t
142	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	RETENTION_CLASS	WARM	웜	Warm	2	\N	t
143	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	RETENTION_CLASS	COLD	콜드	Cold	3	\N	t
144	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	RETENTION_CLASS	WORM	불변보관	WORM	4	\N	t
145	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	RETENTION_CLASS	DESTROY_PENDING	파기대기	Destroy Pending	5	\N	t
146	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BOOKKEEPING_SWITCH_STATUS	REQUESTED	요청	Requested	1	\N	t
147	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BOOKKEEPING_SWITCH_STATUS	COUNTERPARTY_CONSENTED	상대 동의	Counterparty Consented	2	\N	t
148	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BOOKKEEPING_SWITCH_STATUS	SCHEDULED	예약	Scheduled	3	\N	t
149	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BOOKKEEPING_SWITCH_STATUS	SWITCHED	전환완료	Switched	4	\N	t
150	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BOOKKEEPING_SWITCH_STATUS	REJECTED	반려	Rejected	5	\N	t
151	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BOOKKEEPING_SWITCH_STATUS	CANCELLED	취소	Cancelled	6	\N	t
152	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TENANT_ACK_STATUS	PENDING	대기	Pending	1	\N	t
153	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TENANT_ACK_STATUS	CONFIRMED	확인	Confirmed	2	\N	t
154	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TENANT_ACK_STATUS	OBJECTED	이의제기	Objected	3	\N	t
155	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BREAK_GLASS_STATUS	REQUESTED	요청	Requested	1	\N	t
156	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BREAK_GLASS_STATUS	APPROVED	승인	Approved	2	\N	t
157	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BREAK_GLASS_STATUS	ACTIVE	활성	Active	3	\N	t
158	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BREAK_GLASS_STATUS	EXPIRED	만료	Expired	4	\N	t
159	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BREAK_GLASS_STATUS	REVOKED	회수	Revoked	5	\N	t
160	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BREAK_GLASS_STATUS	REVIEWED	검토완료	Reviewed	6	\N	t
161	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DIMENSION_ASSIGNMENT_JOB_STATUS	READY	준비	Ready	1	\N	t
162	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DIMENSION_ASSIGNMENT_JOB_STATUS	RUNNING	실행중	Running	2	\N	t
163	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DIMENSION_ASSIGNMENT_JOB_STATUS	SUCCESS	성공	Success	3	\N	t
164	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DIMENSION_ASSIGNMENT_JOB_STATUS	PARTIAL	부분완료	Partial	4	\N	t
165	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DIMENSION_ASSIGNMENT_JOB_STATUS	FAILED	실패	Failed	5	\N	t
166	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CONVERSION_BATCH_STATUS	RECEIVED	수신	Received	1	\N	t
167	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CONVERSION_BATCH_STATUS	VALIDATED	검증완료	Validated	2	\N	t
168	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CONVERSION_BATCH_STATUS	MAPPED	매핑완료	Mapped	3	\N	t
169	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CONVERSION_BATCH_STATUS	CONVERTED	변환완료	Converted	4	\N	t
170	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CONVERSION_BATCH_STATUS	STAGED	스테이징	Staged	5	\N	t
171	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CONVERSION_BATCH_STATUS	REVIEWING	검토중	Reviewing	6	\N	t
172	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CONVERSION_BATCH_STATUS	POSTED	기표	Posted	7	\N	t
173	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CONVERSION_BATCH_STATUS	REJECTED	반려	Rejected	8	\N	t
174	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CONVERSION_BATCH_STATUS	FAILED	실패	Failed	9	\N	t
175	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	COLLECTION_TASK_STATUS	QUEUED	대기열	Queued	1	\N	t
176	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	COLLECTION_TASK_STATUS	RUNNING	실행중	Running	2	\N	t
177	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	COLLECTION_TASK_STATUS	SUCCESS	성공	Success	3	\N	t
178	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	COLLECTION_TASK_STATUS	RETRY	재시도	Retry	4	\N	t
179	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	COLLECTION_TASK_STATUS	FAILED	실패	Failed	5	\N	t
180	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	COLLECTION_TASK_STATUS	DEAD_LETTER	DLQ	Dead Letter	6	\N	t
181	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DISCLOSURE_DOCUMENT_STATUS	DRAFT	작성중	Draft	1	\N	t
182	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DISCLOSURE_DOCUMENT_STATUS	GENERATED	생성	Generated	2	\N	t
183	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DISCLOSURE_DOCUMENT_STATUS	VALIDATED	검증	Validated	3	\N	t
184	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DISCLOSURE_DOCUMENT_STATUS	APPROVED	승인	Approved	4	\N	t
185	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DISCLOSURE_DOCUMENT_STATUS	SUBMITTED	제출	Submitted	5	\N	t
186	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DISCLOSURE_DOCUMENT_STATUS	ACCEPTED	접수	Accepted	6	\N	t
187	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DISCLOSURE_DOCUMENT_STATUS	REJECTED	반려	Rejected	7	\N	t
188	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ANOMALY_ALERT_STATUS	NEW	신규	New	1	\N	t
189	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ANOMALY_ALERT_STATUS	IN_REVIEW	검토중	In Review	2	\N	t
190	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ANOMALY_ALERT_STATUS	CONFIRMED_NORMAL	정상확인	Confirmed Normal	3	\N	t
191	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ANOMALY_ALERT_STATUS	ACTION_TAKEN	조치완료	Action Taken	4	\N	t
192	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ANOMALY_ALERT_STATUS	DISMISSED	해제	Dismissed	5	\N	t
193	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ANOMALY_MODEL_STATUS	TRAINING	학습중	Training	1	\N	t
194	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ANOMALY_MODEL_STATUS	STAGED	스테이징	Staged	2	\N	t
195	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ANOMALY_MODEL_STATUS	ACTIVE	활성	Active	3	\N	t
196	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ANOMALY_MODEL_STATUS	SHADOW	섀도우	Shadow	4	\N	t
197	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ANOMALY_MODEL_STATUS	RETIRED	퇴역	Retired	5	\N	t
198	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CHATBOT_SESSION_STATUS	ACTIVE	활성	Active	1	\N	t
199	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CHATBOT_SESSION_STATUS	IDLE	유휴	Idle	2	\N	t
200	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CHATBOT_SESSION_STATUS	EXPIRED	만료	Expired	3	\N	t
201	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CHATBOT_SESSION_STATUS	TERMINATED	종료	Terminated	4	\N	t
202	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	FISCAL_PERIOD_STATUS	FUTURE	미개시	Future	1	\N	t
203	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	FISCAL_PERIOD_STATUS	OPEN	열림	Open	2	\N	t
204	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	FISCAL_PERIOD_STATUS	TEMP_CLOSED	가마감	Temporary Closed	3	\N	t
205	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	FISCAL_PERIOD_STATUS	CLOSED	마감	Closed	4	\N	t
206	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	FISCAL_PERIOD_STATUS	LOCKED	잠금	Locked	5	\N	t
207	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	FISCAL_PERIOD_STATUS	REOPEN_REQUESTED	재개요청	Reopen Requested	6	\N	t
208	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	FISCAL_PERIOD_STATUS	REOPENED	재개	Reopened	7	\N	t
209	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_ENTRY_CODE	DR	차변	Debit	1	\N	t
210	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_ENTRY_CODE	CR	대변	Credit	2	\N	t
211	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_ENTRY_CODE	RECEIPT	입금	Receipt	3	\N	t
212	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_ENTRY_CODE	PAYMENT	출금	Payment	4	\N	t
213	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_ENTRY_CODE	CLOSING_DR	결산차변	Closing Debit	5	\N	t
214	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_ENTRY_CODE	CLOSING_CR	결산대변	Closing Credit	6	\N	t
215	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_ENTRY_CODE	ACCRUAL	발생주의 조정	Accrual	7	\N	t
216	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_ENTRY_CODE	ADJUSTMENT	수정	Adjustment	8	\N	t
217	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_ENTRY_CODE	RECLASS	재분류	Reclass	9	\N	t
218	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_ENTRY_CODE	TAX_ADJ	세무조정	Tax Adjustment	10	\N	t
219	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_ENTRY_CODE	STAT_ADJ	Group GAAP 조정	Stat Adjustment	11	\N	t
220	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	NOTIFICATION_DELIVERY_STATUS	QUEUED	대기열	Queued	1	\N	t
221	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	NOTIFICATION_DELIVERY_STATUS	SENT	발송	Sent	2	\N	t
222	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	NOTIFICATION_DELIVERY_STATUS	FAILED	실패	Failed	3	\N	t
223	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	NOTIFICATION_DELIVERY_STATUS	DEAD_LETTER	DLQ	Dead Letter	4	\N	t
224	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	NOTIFICATION_DELIVERY_STATUS	READ	읽음	Read	5	\N	t
225	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	EVIDENCE_STATUS	UPLOADED	업로드	Uploaded	1	\N	t
226	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	EVIDENCE_STATUS	SCANNING	스캔중	Scanning	2	\N	t
227	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	EVIDENCE_STATUS	CLEAN	정상	Clean	3	\N	t
228	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	EVIDENCE_STATUS	QUARANTINED	격리	Quarantined	4	\N	t
229	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	EVIDENCE_STATUS	MATCHED	매칭	Matched	5	\N	t
230	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	EVIDENCE_STATUS	UNMATCHED	미매칭	Unmatched	6	\N	t
231	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	EVIDENCE_STATUS	REVIEW_REQUIRED	검토필요	Review Required	7	\N	t
232	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	REPORT_PACKAGE_STATUS	PENDING	대기	Pending	1	\N	t
233	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	REPORT_PACKAGE_STATUS	GENERATED	생성	Generated	2	\N	t
234	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	REPORT_PACKAGE_STATUS	VALIDATED	검증	Validated	3	\N	t
235	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	REPORT_PACKAGE_STATUS	REVIEWED	검토	Reviewed	4	\N	t
236	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	REPORT_PACKAGE_STATUS	DELIVERED	전달	Delivered	5	\N	t
237	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	REPORT_PACKAGE_STATUS	ACKED	확인	Acked	6	\N	t
238	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TIE_OUT_STATUS	VERIFIED	검증완료	Verified	1	\N	t
239	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TIE_OUT_STATUS	UNVERIFIED	불일치	Unverified	2	\N	t
240	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	OPEN_ITEM_STATUS	OPEN	미결	Open	1	\N	t
241	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	OPEN_ITEM_STATUS	ANSWERED	답변완료	Answered	2	\N	t
242	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	OPEN_ITEM_STATUS	RESOLVED	해소	Resolved	3	\N	t
243	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	GROUP_REPORT_EXPORT_STATUS	DRAFT	작성중	Draft	1	\N	t
244	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	GROUP_REPORT_EXPORT_STATUS	MAPPED	매핑	Mapped	2	\N	t
245	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	GROUP_REPORT_EXPORT_STATUS	GENERATED	생성	Generated	3	\N	t
246	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	GROUP_REPORT_EXPORT_STATUS	EXPORTED	내보냄	Exported	4	\N	t
247	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	COST_CALCULATION_STATUS	OPEN	열림	Open	1	\N	t
248	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	COST_CALCULATION_STATUS	CALCULATING	계산중	Calculating	2	\N	t
249	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	COST_CALCULATION_STATUS	CALCULATED	계산완료	Calculated	3	\N	t
250	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	COST_CALCULATION_STATUS	TIED_OUT	대사완료	Tied Out	4	\N	t
251	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	COST_CALCULATION_STATUS	APPROVED	승인	Approved	5	\N	t
252	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	COST_CALCULATION_STATUS	FAILED	실패	Failed	6	\N	t
253	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	NTS_TRANSMISSION_STATUS	NOT_TARGET	전송대상 아님	Not Target	1	\N	t
254	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	NTS_TRANSMISSION_STATUS	PENDING	대기	Pending	2	\N	t
255	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	NTS_TRANSMISSION_STATUS	ISSUED	발행	Issued	3	\N	t
256	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	NTS_TRANSMISSION_STATUS	SENT	전송	Sent	4	\N	t
257	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	NTS_TRANSMISSION_STATUS	ACCEPTED	접수	Accepted	5	\N	t
258	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	NTS_TRANSMISSION_STATUS	REJECTED	반려	Rejected	6	\N	t
259	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	NTS_TRANSMISSION_STATUS	CANCELLED	취소	Cancelled	7	\N	t
260	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	NTS_TRANSMISSION_STATUS	MANUAL_EVIDENCE	수기증빙	Manual Evidence	8	\N	t
261	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_TYPE	SUBSTITUTE	대체	Substitute	1	\N	t
262	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_TYPE	RECEIPT	입금	Receipt	2	\N	t
263	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_TYPE	PAYMENT	출금	Payment	3	\N	t
264	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_TYPE	PURCHASE	매입	Purchase	4	\N	t
265	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_TYPE	SALES	매출	Sales	5	\N	t
266	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_NUMBERING_STATUS	PLANNED	예정	Planned	1	\N	t
267	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_NUMBERING_STATUS	CONFIRMED	확정	Confirmed	2	\N	t
268	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_NUMBERING_STATUS	NUMBERING_CONFLICT	채번충돌	Numbering Conflict	3	\N	t
269	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BUSINESS_PARTNER_STATUS	TEMP_VENDOR	임시 공급업체	Temporary Vendor	1	\N	t
270	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BUSINESS_PARTNER_STATUS	TEMP_CUSTOMER	임시 고객	Temporary Customer	2	\N	t
271	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BUSINESS_PARTNER_STATUS	PENDING_APPROVAL	승인대기	Pending Approval	3	\N	t
272	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BUSINESS_PARTNER_STATUS	ACTIVE	활성	Active	4	\N	t
273	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BUSINESS_PARTNER_STATUS	INACTIVE	사용중지	Inactive	5	\N	t
274	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BUSINESS_PARTNER_STATUS	CLOSED_BIZ	휴폐업	Closed Business	6	\N	t
275	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_STATUS	DRAFT	작성중	Draft	1	\N	t
276	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_STATUS	CLIENT_SUBMITTED	고객제출	Client Submitted	2	\N	t
277	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_STATUS	REVIEWING	검토중	Reviewing	3	\N	t
278	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_STATUS	PENDING_APPROVAL	승인대기	Pending Approval	4	\N	t
279	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_STATUS	REJECTED	반려	Rejected	5	\N	t
280	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_STATUS	APPROVED	승인	Approved	6	\N	t
281	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_STATUS	POSTED	기표	Posted	7	\N	t
282	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_STATUS	ADJUSTED	조정	Adjusted	8	\N	t
283	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_STATUS	REVERSED	역분개	Reversed	9	\N	t
284	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_STATUS	CANCELLED	취소	Cancelled	10	\N	t
285	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	APPROVAL_STATUS	DRAFT	작성중	Draft	1	\N	t
286	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	APPROVAL_STATUS	IN_PROGRESS	진행중	In Progress	2	\N	t
287	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	APPROVAL_STATUS	APPROVED	승인	Approved	3	\N	t
288	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	APPROVAL_STATUS	REJECTED	반려	Rejected	4	\N	t
289	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	APPROVAL_STATUS	WITHDRAWN	회수	Withdrawn	5	\N	t
290	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	APPROVAL_STATUS	FINALIZED	종결	Finalized	6	\N	t
291	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	APPROVAL_STATUS	POST_PENDING	기표대기	Post Pending	7	\N	t
292	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SERVICE_CONTRACT_STATUS	PENDING	대기	Pending	1	\N	t
293	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SERVICE_CONTRACT_STATUS	ACTIVE	활성	Active	2	\N	t
294	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SERVICE_CONTRACT_STATUS	SUSPENDED	정지	Suspended	3	\N	t
295	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SERVICE_CONTRACT_STATUS	TERMINATED	종료	Terminated	4	\N	t
296	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	SERVICE_CONTRACT_STATUS	EXPIRED	만료	Expired	5	\N	t
297	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ASSIGNMENT_STATUS	ASSIGNED	배정	Assigned	1	\N	t
298	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ASSIGNMENT_STATUS	TRANSFER_REQUESTED	이관요청	Transfer Requested	2	\N	t
299	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ASSIGNMENT_STATUS	TRANSFERRED	이관완료	Transferred	3	\N	t
300	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ASSIGNMENT_STATUS	ENDED	종료	Ended	4	\N	t
301	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CLIENT_TASK_STATUS	REQUESTED	요청	Requested	1	\N	t
302	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CLIENT_TASK_STATUS	UPLOADED	업로드	Uploaded	2	\N	t
303	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CLIENT_TASK_STATUS	IN_PROGRESS	진행중	In Progress	3	\N	t
304	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CLIENT_TASK_STATUS	REVIEWING	검토중	Reviewing	4	\N	t
305	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CLIENT_TASK_STATUS	CLIENT_CONFIRMING	고객확인	Client Confirming	5	\N	t
306	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CLIENT_TASK_STATUS	COMPLETED	완료	Completed	6	\N	t
307	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CLIENT_TASK_STATUS	ON_HOLD	보류	On Hold	7	\N	t
308	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TAX_INVOICE_STATUS	DRAFT	작성중	Draft	1	\N	t
309	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TAX_INVOICE_STATUS	READY_TO_SEND	전송준비	Ready To Send	2	\N	t
310	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TAX_INVOICE_STATUS	SENT	전송	Sent	3	\N	t
311	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TAX_INVOICE_STATUS	ACCEPTED	접수	Accepted	4	\N	t
312	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TAX_INVOICE_STATUS	FAILED	실패	Failed	5	\N	t
313	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TAX_INVOICE_STATUS	CANCELLED	취소	Cancelled	6	\N	t
314	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TAX_INVOICE_STATUS	RETRY_PENDING	재시도대기	Retry Pending	7	\N	t
315	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	FILING_FILE_STATUS	CREATED	생성	Created	1	\N	t
316	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	FILING_FILE_STATUS	VALIDATED	검증	Validated	2	\N	t
317	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	FILING_FILE_STATUS	SUBMITTED	제출	Submitted	3	\N	t
318	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	FILING_FILE_STATUS	ACCEPTED	접수	Accepted	4	\N	t
319	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	FILING_FILE_STATUS	REJECTED	반려	Rejected	5	\N	t
320	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ASSET_STATUS	REGISTERED	등록	Registered	1	\N	t
321	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ASSET_STATUS	ACTIVE	활성	Active	2	\N	t
322	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ASSET_STATUS	TRANSFERRED	이동	Transferred	3	\N	t
323	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ASSET_STATUS	DISPOSED	처분	Disposed	4	\N	t
324	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ASSET_STATUS	CLOSED	종료	Closed	5	\N	t
325	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	VAT_RETURN_TYPE	PRELIMINARY	예정	Preliminary	1	\N	t
326	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	VAT_RETURN_TYPE	FINAL	확정	Final	2	\N	t
327	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	VAT_RETURN_TYPE	AMENDED	수정	Amended	3	\N	t
328	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	VAT_RETURN_TYPE	LATE	기한후	Late	4	\N	t
329	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BOOKKEEPING_SCOPE_TYPE	JOURNAL_TYPE	전표유형	Journal Type	1	\N	t
330	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BOOKKEEPING_SCOPE_TYPE	TRANSACTION_SOURCE	거래원천	Transaction Source	2	\N	t
331	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BOOKKEEPING_SCOPE_TYPE	ACCOUNT_RANGE	계정범위	Account Range	3	\N	t
332	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BOOKKEEPING_SCOPE_TYPE	MODULE	모듈	Module	4	\N	t
333	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_CATALOG_CODE	STD_ACCOUNT	표준계정 템플릿	Standard Account	1	\N	t
334	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_CATALOG_CODE	STD_VAT	부가세 세율/과세유형	Standard VAT	2	\N	t
335	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_CATALOG_CODE	STD_TAX_RULE	세법 룰 마스터	Standard Tax Rule	3	\N	t
336	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_CATALOG_CODE	STD_WITHHOLDING	원천세 기준	Standard Withholding	4	\N	t
337	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_CATALOG_CODE	STD_FORM	신고서식	Standard Form	5	\N	t
338	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_CATALOG_CODE	STD_CODE	공통코드	Standard Code	6	\N	t
339	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_CATALOG_CODE	STD_ROLE	Role 템플릿	Standard Role	7	\N	t
340	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_CATALOG_CODE	STD_APPROVAL	결재선 템플릿	Standard Approval	8	\N	t
341	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_CATALOG_CODE	STD_CASHFLOW	현금흐름 매핑	Standard Cashflow	9	\N	t
342	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_CATALOG_CODE	STD_TAXONOMY	XBRL 분류체계	Standard Taxonomy	10	\N	t
343	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_CATALOG_CODE	STD_CONVERSION	기준 변환규칙	Standard Conversion	11	\N	t
344	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_CATALOG_CODE	STD_ANOMALY_RULE	이상탐지 규칙	Standard Anomaly Rule	12	\N	t
345	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_CATALOG_CODE	STD_NOTIFICATION	알림 템플릿	Standard Notification	13	\N	t
346	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_CATALOG_CODE	STD_REPORT_PACKAGE	보고패키지 템플릿	Standard Report Package	14	\N	t
347	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_CATALOG_CODE	STD_SCHEDULE	명세서 템플릿	Standard Schedule	15	\N	t
348	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_CATALOG_CODE	STD_GROUP_MAPPING	그룹 보고 매핑	Standard Group Mapping	16	\N	t
349	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_CATALOG_CODE	STD_ACCOUNT_L10N	다국어 계정명	Standard Account Localization	17	\N	t
350	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_CATALOG_CODE	STD_COSTING	제조원가 템플릿	Standard Costing	18	\N	t
351	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	STANDARD_CATALOG_CODE	STD_PURCHASE_TAX_STATUS	매입원장 세무상태	Standard Purchase Tax Status	19	\N	t
352	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DIMENSION_TYPE	BUSINESS_PLACE	사업장	Business Place	1	\N	t
353	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DIMENSION_TYPE	COST_CENTER	코스트센터	Cost Center	2	\N	t
354	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DIMENSION_TYPE	DEPARTMENT	부서	Department	3	\N	t
355	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DIMENSION_TYPE	PROJECT	프로젝트	Project	4	\N	t
356	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DIMENSION_TYPE	SITE	현장	Site	5	\N	t
357	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DIMENSION_TYPE	EMPLOYEE	사원	Employee	6	\N	t
358	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_APPROVAL_MODE	REQUIRED	필수	Required	1	\N	t
359	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_APPROVAL_MODE	OPTIONAL	선택	Optional	2	\N	t
360	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	JOURNAL_APPROVAL_MODE	NONE	없음	None	3	\N	t
361	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CASH_FLOW_ACTIVITY	OPERATING	영업활동	Operating	1	\N	t
362	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CASH_FLOW_ACTIVITY	INVESTING	투자활동	Investing	2	\N	t
363	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	CASH_FLOW_ACTIVITY	FINANCING	재무활동	Financing	3	\N	t
364	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DISCLOSURE_REPORT_TYPE	ANNUAL	사업보고서	Annual	1	\N	t
365	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DISCLOSURE_REPORT_TYPE	SEMI	반기보고서	Semiannual	2	\N	t
366	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DISCLOSURE_REPORT_TYPE	QUARTER	분기보고서	Quarterly	3	\N	t
367	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DISCLOSURE_REPORT_TYPE	AUDIT	감사보고서 첨부	Audit	4	\N	t
368	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	DISCLOSURE_REPORT_TYPE	SUBMISSION	제출용	Submission	5	\N	t
369	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACCOUNTING_STANDARD	K_GAAP	일반기업회계기준	K-GAAP	1	\N	t
370	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACCOUNTING_STANDARD	K_IFRS	한국채택국제회계기준	K-IFRS	2	\N	t
371	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACCOUNTING_STANDARD	US_GAAP	미국회계기준	US GAAP	3	\N	t
372	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACCOUNTING_STANDARD	IFRS	국제회계기준	IFRS	4	\N	t
373	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	ACCOUNTING_STANDARD	JP_GAAP	일본회계기준	JP GAAP	5	\N	t
374	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUX_LEDGER_TYPE	VENDOR	거래처	Vendor	1	\N	t
375	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUX_LEDGER_TYPE	NOTE	어음	Note	2	\N	t
376	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUX_LEDGER_TYPE	BANK	은행	Bank	3	\N	t
377	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUX_LEDGER_TYPE	CARD	카드	Card	4	\N	t
378	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUX_LEDGER_TYPE	ADVANCE	가지급금	Advance	5	\N	t
379	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUX_LEDGER_TYPE	VAT	부가세	VAT	6	\N	t
380	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	AUX_LEDGER_TYPE	QTY	수량	Quantity	7	\N	t
381	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TENANT_INPUT_POLICY	NONE	입력 차단	None	1	\N	t
382	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	TENANT_INPUT_POLICY	REQUEST_ONLY	기장 요청만 허용	Request Only	2	\N	t
383	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BILL_RECEIVABLE_STATUS	HELD	보관	Held	1	\N	t
384	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BILL_RECEIVABLE_STATUS	DISCOUNTED	할인	Discounted	2	\N	t
385	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BILL_RECEIVABLE_STATUS	ENDORSED	배서	Endorsed	3	\N	t
386	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BILL_RECEIVABLE_STATUS	MATURED	만기	Matured	4	\N	t
387	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BILL_RECEIVABLE_STATUS	DEFAULTED	부도	Defaulted	5	\N	t
388	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BILL_RECEIVABLE_STATUS	PARTIAL_DISCOUNTED	부분할인	Partial Discounted	6	\N	t
389	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BILL_RECEIVABLE_STATUS	RETURNED	반환	Returned	7	\N	t
390	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BILL_RECEIVABLE_STATUS	SPLIT_ENDORSED	분할배서	Split Endorsed	8	\N	t
391	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BILL_PAPER_STATUS	UNISSUED	미발행	Unissued	1	\N	t
392	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BILL_PAPER_STATUS	ISSUED	발행	Issued	2	\N	t
393	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BILL_PAPER_STATUS	SETTLED	결제	Settled	3	\N	t
394	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BILL_PAPER_STATUS	COLLATERALIZED	담보	Collateralized	4	\N	t
395	2026-07-10 12:14:42.817346+09	\N	2026-07-10 12:14:42.817346+09	\N	1	UI	BILL_PAPER_STATUS	DISCARDED	폐기	Discarded	5	\N	t
\.


--
-- Data for Name: login_history; Type: TABLE DATA; Schema: public; Owner: bk_app
--

COPY public.login_history (id, created_at, user_id, login_id, name, tenant_id, ip, user_agent, result, fail_reason) FROM stdin;
1	2026-07-09 15:14:20.565611+09	1	admin	조강수	\N	::1	curl/7.51.0	BYPASS	\N
2	2026-07-09 15:14:47.295454+09	1	admin	조강수	\N	::1	curl/7.51.0	BYPASS	\N
3	2026-07-09 15:15:18.117207+09	1	admin	조강수	\N	::1	curl/7.51.0	BYPASS	\N
4	2026-07-09 15:20:13.037017+09	1	admin	조강수	\N	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.124.2 Chrome/148.0.7778.97 Electron/42.2.0 Safari/537.36	BYPASS	\N
5	2026-07-09 15:24:29.140503+09	1	admin	조강수	\N	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	BYPASS	\N
6	2026-07-10 10:28:20.774629+09	1	admin	조강수	\N	::1	curl/7.51.0	BYPASS	\N
7	2026-07-10 10:39:44.530377+09	1	admin	조강수	\N	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	BYPASS	\N
8	2026-07-10 17:17:19.764977+09	1	admin	조강수	\N	::1	curl/7.51.0	BYPASS	\N
\.


--
-- Data for Name: masking_policy; Type: TABLE DATA; Schema: public; Owner: bk_app
--

COPY public.masking_policy (id, created_at, created_by, updated_at, updated_by, version, source, data_type, field_name, mask_pattern, description, required_grant, is_active) FROM stdin;
2	2026-07-09 15:14:03.819282+09	\N	2026-07-09 15:14:03.819282+09	\N	1	UI	GENERAL	email	email	이메일 — 로컬부 마스킹 (ab****@domain)	\N	t
3	2026-07-09 15:14:03.819282+09	\N	2026-07-09 15:14:03.819282+09	\N	1	UI	GENERAL	phone	phone	전화번호 — 가운데 마스킹 (010-****-5678)	\N	t
4	2026-07-09 15:14:03.819282+09	\N	2026-07-09 15:14:03.819282+09	\N	1	UI	UNIQUE_ID	rrn	rrn	주민등록번호 — 뒤 6자리 마스킹, AES-256 암호화 저장	SENSITIVE_UNIQUE_ID	t
5	2026-07-09 15:14:03.819282+09	\N	2026-07-09 15:14:03.819282+09	\N	1	UI	FINANCIAL	account	account	계좌번호 — 가운데 마스킹, 암호화 저장	SENSITIVE_FINANCIAL	t
6	2026-07-09 15:14:03.819282+09	\N	2026-07-09 15:14:03.819282+09	\N	1	UI	FINANCIAL	card	card	카드번호 — 가운데 8자리 마스킹, 암호화 저장	SENSITIVE_FINANCIAL	t
1	2026-07-09 15:14:03.819282+09	\N	2026-07-09 15:15:19.142689+09	\N	2	UI	GENERAL	name	name	성명 — 가운데 마스킹 (홍*동)	\N	t
\.


--
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: bk_app
--

COPY public.menu (id, created_at, created_by, updated_at, updated_by, version, source, menu_code, parent_code, channel, menu_type, name, name_en, path, icon, screen_id, sort_order, is_visible, requires_step_up, is_active) FROM stdin;
1	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP	\N	OP	GROUP	운영콘솔	Operator Console	\N	\N	\N	10	t	f	t
2	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-00	OP	OP	GROUP	운영 진입	Operation Entry	\N	\N	OP-00	20	t	f	t
3	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-00-M01	OP-00	OP	MENU	이용회사 선택	Company Selection	/operator/op/00/m01	\N	BF-00	30	t	f	t
4	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-01	OP	OP	GROUP	운영 현황	Operations Dashboard	\N	\N	OP-01	40	t	f	t
5	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-01-M01	OP-01	OP	MENU	운영 현황 대시보드	OP-01	/operator/op/01/m01	\N	OP-01	50	t	f	t
6	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-02	OP	OP	GROUP	관리회사·조직	Operator Organization	\N	\N	OP-02	60	t	f	t
7	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-02-M01	OP-02	OP	MENU	운영조직 도메인	Operations Organization Domain	/operator/op/02/m01	\N	BF-01	70	t	f	t
8	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-03	OP	OP	GROUP	이용회사/테넌트	Tenant Operations	\N	\N	OP-03	80	t	f	t
9	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-03-M01	OP-03	OP	MENU	테넌트 인프라	OP-03	/operator/op/03/m01	\N	OP-03	90	t	f	t
10	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-04	OP	OP	GROUP	구독·요금·사용량	Subscription Billing	\N	\N	OP-04	100	t	f	t
11	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-04-M01	OP-04	OP	MENU	구독·청구·결제	Subscription Billing Payment	/operator/op/04/m01	\N	BF-10	110	t	f	t
12	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-05	OP	OP	GROUP	공통 표준 카탈로그	Common Standards	\N	\N	OP-05	120	t	f	t
13	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-05-M01	OP-05	OP	MENU	시스템 공통코드 관리	System Common Code Management	/operator/op/05/m01	\N	OP-05C	130	t	f	t
14	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-05-M02	OP-05	OP	MENU	표준 카탈로그 관리	Standard Catalog Management	/operator/op/05/m02	\N	BF-08	140	t	f	t
15	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-06	OP	OP	GROUP	사용자·인증·권한	Users, Authentication and Permissions	\N	\N	OP-06	150	t	f	t
16	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-06-M01	OP-06	OP	MENU	사용자 관리	User Management	/operator/op/06/m01	\N	OP-06A	160	t	f	t
17	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-06-M02	OP-06	OP	MENU	사용자그룹 관리	User Group Management	/operator/op/06/m02	\N	OP-06G	170	t	f	t
18	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-06-M03	OP-06	OP	MENU	인증 정책 관리	Authentication Policy Management	/operator/op/06/m03	\N	OP-06B	180	t	f	t
19	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-06-M04	OP-06	OP	MENU	메뉴 마스터 관리	Menu Master Management	/operator/op/06/m04	\N	OP-06D	190	t	f	t
20	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-06-M05	OP-06	OP	MENU	Role·권한 관리	Role and Permission Management	/operator/op/06/m05	\N	OP-06C	200	t	f	t
21	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-07	OP	OP	GROUP	접근 거버넌스	Access Governance	\N	\N	OP-07	210	t	t	t
22	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-07-M01	OP-07	OP	MENU	Break-glass·접근	OP-07	/operator/op/07/m01	\N	OP-07	220	t	f	t
23	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-08	OP	OP	GROUP	기장 워크벤치 [기장]	Bookkeeping Workbench	\N	\N	OP-08	230	t	f	t
24	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-08-M01	OP-08	OP	MENU	기장 전환 워크플로우	Bookkeeping Transfer Workflow	/operator/op/08/m01	\N	BF-03	240	t	f	t
25	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-09	OP	OP	GROUP	운영·배치·연계 모니터링	Batch and Integration Monitoring	\N	\N	OP-09	250	t	f	t
26	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-09-M01	OP-09	OP	MENU	배치·연계 운영	OP-09	/operator/op/09/m01	\N	OP-09	260	t	f	t
27	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-10	OP	OP	GROUP	로그 관리	Log Management	\N	\N	OP-10	270	t	f	t
28	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-10-M01	OP-10	OP	MENU	로그 관리	Log Management	/operator/op/10/m01	\N	OP-10	280	t	f	t
29	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-11	OP	OP	GROUP	AI·규칙 운영 [AI]	AI Rule Operations	\N	\N	OP-11	290	t	f	t
30	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-12	OP	OP	GROUP	개인정보보호	Privacy Protection	\N	\N	OP-12	300	t	f	t
31	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	OP-12-M01	OP-12	OP	MENU	개인정보보호	Privacy Protection	/operator/op/12/m01	\N	OP-12	310	t	f	t
32	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN	\N	TN	GROUP	업무화면	Tenant Workspace	\N	\N	\N	320	t	f	t
33	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-00	TN	TN	GROUP	홈·현황	Home Dashboard	\N	\N	TN-00	330	t	f	t
34	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-00-M01	TN-00	TN	MENU	대시보드	Dashboard	/dashboard	\N	TN-00	331	t	f	t
35	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-01	TN	TN	GROUP	회사 설정·기초	Company Settings	\N	\N	TN-01	340	t	f	t
36	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-01-M01	TN-01	TN	MENU	차원·조직·사용정책	Dimension Organization Policy	/tenant/tn/01/m01	\N	BF-09	350	t	f	t
37	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-01-M02	TN-01	TN	MENU	알림 매트릭스 관리	Notification Matrix Management	/tenant/tn/01/m02	\N	BF-11	360	t	f	t
38	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-02	TN	TN	GROUP	기초정보관리	Basic Information	\N	\N	TN-02	370	t	f	t
39	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-02-G01	TN-02	TN	GROUP	회사·권한·환경	Company Authorization Environment	\N	\N	\N	380	t	f	t
40	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-02-G01-M01	TN-02-G01	TN	MENU	회사등록	Company Registration	/tenant/tn/02/g01/m01	\N	SA-BAS-01	390	t	f	t
41	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-02-G01-M02	TN-02-G01	TN	MENU	권한설정	Permission Settings	/tenant/tn/02/g01/m02	\N	SA-BAS-02	400	t	f	t
42	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-02-G01-M03	TN-02-G01	TN	MENU	환경설정	Environment Settings	/tenant/tn/02/g01/m03	\N	SA-BAS-03	410	t	f	t
43	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-02-G02	TN-02	TN	GROUP	조직·인력·현장	Organization People Site	\N	\N	\N	420	t	f	t
44	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-02-G02-M01	TN-02-G02	TN	MENU	부서등록	Department Registration	/tenant/tn/02/g02/m01	\N	SA-BAS-04	430	t	f	t
45	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-02-G02-M02	TN-02-G02	TN	MENU	사원등록	Employee Registration	/tenant/tn/02/g02/m02	\N	SA-BAS-05	440	t	f	t
46	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-02-G02-M03	TN-02-G02	TN	MENU	현장등록	Site Registration	/tenant/tn/02/g02/m03	\N	SA-BAS-08	450	t	f	t
47	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-02-G02-M04	TN-02-G02	TN	MENU	프로젝트등록	Project Registration	/tenant/tn/02/g02/m04	\N	SA-BAS-09	460	t	f	t
48	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-02-G02-M05	TN-02-G02	TN	MENU	외주처등록	Outsourcer Registration	/tenant/tn/02/g02/m05	\N	SA-BAS-11	470	t	f	t
49	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-02-G03	TN-02	TN	GROUP	거래처·계정	Customer Account Setup	\N	\N	\N	480	t	f	t
50	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-02-G03-M01	TN-02-G03	TN	MENU	거래처등록	Customer Vendor Registration	/tenant/tn/02/g03/m01	\N	SA-BAS-06	490	t	f	t
51	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-02-G03-M02	TN-02-G03	TN	MENU	계정과목 및 적요등록	Account Subject and Summary	/tenant/tn/02/g03/m02	\N	SA-BAS-07	500	t	f	t
52	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-02-G03-M03	TN-02-G03	TN	MENU	거래처등코드변환	Customer Code Conversion	/tenant/tn/02/g03/m03	\N	SA-BAS-13	510	t	f	t
53	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-02-G03-M04	TN-02-G03	TN	MENU	거래처DM인쇄	Customer DM Printing	/tenant/tn/02/g03/m04	\N	SA-BAS-12	520	t	f	t
54	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-02-G04	TN-02	TN	GROUP	이월·차량	Carryforward Vehicle	\N	\N	\N	530	t	f	t
55	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-02-G04-M01	TN-02-G04	TN	MENU	업무용승용차 등록	Business Vehicle Registration	/tenant/tn/02/g04/m01	\N	SA-BAS-10	540	t	f	t
56	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-02-G04-M02	TN-02-G04	TN	MENU	마감후이월	Closing Carryforward	/tenant/tn/02/g04/m02	\N	SA-BAS-14	550	t	f	t
57	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03	TN	TN	GROUP	전기이월·개시잔액	Opening Balance	\N	\N	TN-03	560	t	f	t
58	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G01	TN-03	TN	GROUP	전기 재무제표	Prior Financial Statements	\N	\N	\N	570	t	f	t
59	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G01-M01	TN-03-G01	TN	MENU	전기분재무상태표	Prior Financial Position	/tenant/tn/03/g01/m01	\N	SA-OPN-01	580	t	f	t
60	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G01-M02	TN-03-G01	TN	MENU	전기분손익계산서	Prior Income Statement	/tenant/tn/03/g01/m02	\N	SA-OPN-02	590	t	f	t
61	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G01-M03	TN-03-G01	TN	MENU	전기분원가명세서	Prior Cost Statement	/tenant/tn/03/g01/m03	\N	SA-OPN-03	600	t	f	t
62	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G01-M04	TN-03-G01	TN	MENU	전기분이익잉여금처분계산서	Prior Retained Earnings Appropriation	/tenant/tn/03/g01/m04	\N	SA-OPN-04	610	t	f	t
63	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G01-M05	TN-03-G01	TN	MENU	전기분자본변동표	Prior Equity Changes	/tenant/tn/03/g01/m05	\N	SA-OPN-05	620	t	f	t
64	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G01-M06	TN-03-G01	TN	MENU	전기분현금흐름표	Prior Cash Flow Statement	/tenant/tn/03/g01/m06	\N	SA-OPN-06	630	t	f	t
65	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G02	TN-03	TN	GROUP	초기이월	Opening Carryforward	\N	\N	\N	640	t	f	t
66	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G02-M01	TN-03-G02	TN	MENU	거래처별초기이월	Customer Opening Balance	/tenant/tn/03/g02/m01	\N	SA-OPN-07	650	t	f	t
67	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G02-M02	TN-03-G02	TN	MENU	부서/사원별초기이월	Department Employee Opening Balance	/tenant/tn/03/g02/m02	\N	SA-OPN-08	660	t	f	t
68	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G02-M03	TN-03-G02	TN	MENU	프로젝트초기이월	Project Opening Balance	/tenant/tn/03/g02/m03	\N	SA-OPN-13	670	t	f	t
69	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G02-M04	TN-03-G02	TN	MENU	미완성공사초기이월	Unfinished Construction Opening	/tenant/tn/03/g02/m04	\N	SA-OPN-17	680	t	f	t
70	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G02-M05	TN-03-G02	TN	MENU	외주처별초기이월	Subcontractor Opening Balance	/tenant/tn/03/g02/m05	\N	SA-OPN-18	690	t	f	t
71	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G02-M06	TN-03-G02	TN	MENU	현장별/거래처별초기이월	Site Customer Opening Balance	/tenant/tn/03/g02/m06	\N	SA-OPN-19	700	t	f	t
72	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G03	TN-03	TN	GROUP	기간·프로젝트 손익	Period Project Profit	\N	\N	\N	710	t	f	t
73	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G03-M01	TN-03-G03	TN	MENU	전기 기간별손익계산서	Prior Period Income Statement	/tenant/tn/03/g03/m01	\N	SA-OPN-09	720	t	f	t
74	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G03-M02	TN-03-G03	TN	MENU	전기 기간별원가계산서	Prior Period Cost Statement	/tenant/tn/03/g03/m02	\N	SA-OPN-10	730	t	f	t
75	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G03-M03	TN-03-G03	TN	MENU	전기 프로젝트손익현황	Prior Project Profit Status	/tenant/tn/03/g03/m03	\N	SA-OPN-11	740	t	f	t
76	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G03-M04	TN-03-G03	TN	MENU	전기 프로젝트원가현황	Prior Project Cost Status	/tenant/tn/03/g03/m04	\N	SA-OPN-12	750	t	f	t
77	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G04	TN-03	TN	GROUP	중단사업·시산표	Discontinued Trial Balance	\N	\N	\N	760	t	f	t
78	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G04-M01	TN-03-G04	TN	MENU	전기 중단사업손익계산서	Prior Discontinued Ops Income	/tenant/tn/03/g04/m01	\N	SA-OPN-14	770	t	f	t
79	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G04-M02	TN-03-G04	TN	MENU	전기 중단사업원가명세서	Prior Discontinued Ops Cost	/tenant/tn/03/g04/m02	\N	SA-OPN-15	780	t	f	t
80	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-03-G04-M03	TN-03-G04	TN	MENU	중도시산표	Interim Trial Balance	/tenant/tn/03/g04/m03	\N	SA-OPN-16	790	t	f	t
81	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-04	TN	TN	GROUP	전표 입력·결재	Journal Entry and Approval	\N	\N	TN-04	800	t	f	t
82	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-04-M01	TN-04	TN	MENU	일반전표입력	General Journal Entry	/tenant/tn/04/m01	\N	SA-JNL-01	810	t	f	t
83	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-04-M02	TN-04	TN	MENU	매입매출전표입력	Purchase Sales Journal Entry	/tenant/tn/04/m02	\N	SA-JNL-02	820	t	f	t
84	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-04-M03	TN-04	TN	MENU	정기청구입력 — 2차	Journal Entry Menu 3	/tenant/tn/04/m03	\N	SA-JNL-03	830	t	f	t
85	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-04-M04	TN-04	TN	MENU	물류전표처리 — 2차	Journal Entry Menu 4	/tenant/tn/04/m04	\N	SA-JNL-04	840	t	f	t
86	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-05	TN	TN	GROUP	보조부·관리항목	Auxiliary Ledger Management	\N	\N	TN-05	850	t	f	t
87	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-05-G01	TN-05	TN	GROUP	보조원장	Auxiliary Ledgers	\N	\N	\N	860	t	f	t
88	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-05-G01-M01	TN-05-G01	TN	MENU	거래처별 보조원장	Customer Auxiliary Ledger	/tenant/tn/05/g01/m01	\N	AUX-01	870	t	f	t
89	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-05-G01-M02	TN-05-G01	TN	MENU	어음 보조원장	Bills Auxiliary Ledger	/tenant/tn/05/g01/m02	\N	AUX-02	880	t	f	t
90	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-05-G01-M03	TN-05-G01	TN	MENU	예금 보조원장	Deposit Auxiliary Ledger	/tenant/tn/05/g01/m03	\N	AUX-03	890	t	f	t
91	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-05-G01-M04	TN-05-G01	TN	MENU	가지급금·가수금 보조원장	Advance Receipt Payment Ledger	/tenant/tn/05/g01/m04	\N	AUX-05	900	t	f	t
92	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-05-G01-M05	TN-05-G01	TN	MENU	부가세 보조원장	VAT Auxiliary Ledger	/tenant/tn/05/g01/m05	\N	AUX-06	910	t	f	t
93	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-05-G01-M06	TN-05-G01	TN	MENU	현금출납장	Cash Book	/tenant/tn/05/g01/m06	\N	AUX-07	920	t	f	t
94	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-05-G01-M07	TN-05-G01	TN	MENU	고정자산대장	Fixed Asset Ledger	/tenant/tn/05/g01/m07	\N	AUX-09	930	t	f	t
95	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-05-G01-M08	TN-05-G01	TN	MENU	카드 보조원장	Card Auxiliary Ledger	/tenant/tn/05/g01/m08	\N	AUX-04	940	t	f	t
96	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-05-G01-M09	TN-05-G01	TN	MENU	재고 수불부	Inventory Ledger	/tenant/tn/05/g01/m09	\N	AUX-08	950	t	f	t
97	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-05-G02	TN-05	TN	GROUP	웹전표 입력보조	Web Journal Entry Aids	\N	\N	\N	960	t	f	t
98	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-05-G02-M01	TN-05-G02	TN	MENU	관리항목 도킹패널	Management Item Docking Panel	/tenant/tn/05/g02/m01	\N	WJV-02	970	t	f	t
99	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-05-G02-M02	TN-05-G02	TN	MENU	부가세 부속서류	VAT Attachments	/tenant/tn/05/g02/m02	\N	WJV-03	980	t	f	t
100	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-05-G02-M03	TN-05-G02	TN	MENU	받을어음 입력	Notes Receivable Entry	/tenant/tn/05/g02/m03	\N	WJV-04	990	t	f	t
101	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-05-G02-M04	TN-05-G02	TN	MENU	지급어음 입력	Notes Payable Entry	/tenant/tn/05/g02/m04	\N	WJV-05	1000	t	f	t
102	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-05-G02-M05	TN-05-G02	TN	MENU	차입금 입력	Borrowing Entry	/tenant/tn/05/g02/m05	\N	WJV-06	1010	t	f	t
103	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-05-G02-M06	TN-05-G02	TN	MENU	관리항목 통합관리	Management Item Integration	/tenant/tn/05/g02/m06	\N	WJV-07	1020	t	f	t
104	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-06	TN	TN	GROUP	자동전표·증빙	Auto Journal and Evidence	\N	\N	TN-06	1030	t	f	t
105	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-06-G01	TN-06	TN	GROUP	수집 설정	Collection Settings	\N	\N	\N	1040	t	f	t
106	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-06-G01-M01	TN-06-G01	TN	MENU	수집정보등록 — 1차	Auto Journal Evidence Menu 1	/tenant/tn/06/g01/m01	\N	SA-ATX-01	1050	t	f	t
107	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-06-G01-M02	TN-06-G01	TN	MENU	홈택스 수집/엑셀업로드	SA-ATX-HOME	/tenant/tn/06/g01/m02	\N	SA-ATX-HOME	1060	t	f	t
108	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-06-G02	TN-06	TN	GROUP	증빙 수집	Evidence Collection	\N	\N	\N	1070	t	f	t
109	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-06-G02-M01	TN-06-G02	TN	MENU	전자세금계산서 — 1차	Auto Journal Evidence Menu 2	/tenant/tn/06/g02/m01	\N	SA-ATX-02	1080	t	f	t
110	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-06-G02-M02	TN-06-G02	TN	MENU	전자계산서 — 1차	Auto Journal Evidence Menu 3	/tenant/tn/06/g02/m02	\N	SA-ATX-03	1090	t	f	t
111	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-06-G02-M03	TN-06-G02	TN	MENU	신용카드 — 1차	Auto Journal Evidence Menu 4	/tenant/tn/06/g02/m03	\N	SA-ATX-04	1100	t	f	t
112	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-06-G02-M04	TN-06-G02	TN	MENU	현금영수증 — 1차	Auto Journal Evidence Menu 5	/tenant/tn/06/g02/m04	\N	SA-ATX-05	1110	t	f	t
113	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-06-G02-M05	TN-06-G02	TN	MENU	통장 — 1차	Auto Journal Evidence Menu 6	/tenant/tn/06/g02/m05	\N	SA-ATX-06	1120	t	f	t
114	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-06-G03	TN-06	TN	GROUP	검증·전표전송	Validation Transmission	\N	\N	\N	1130	t	f	t
115	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-06-G03-M01	TN-06-G03	TN	MENU	자료수집현황 — 1차	Auto Journal Evidence Menu 7	/tenant/tn/06/g03/m01	\N	SA-ATX-07	1140	t	f	t
116	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-06-G03-M02	TN-06-G03	TN	MENU	전표전송현황 — 1차	Auto Journal Evidence Menu 8	/tenant/tn/06/g03/m02	\N	SA-ATX-08	1150	t	f	t
117	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-06-G03-M03	TN-06-G03	TN	MENU	국세청자료검증 및 사이트비교 — 1차	Auto Journal Evidence Menu 9	/tenant/tn/06/g03/m03	\N	SA-ATX-09	1160	t	f	t
118	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-06-G03-M04	TN-06-G03	TN	MENU	ScrappingBoard — 3차	Auto Journal Evidence Menu 10	/tenant/tn/06/g03/m04	\N	SA-ATX-10	1170	t	f	t
119	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07	TN	TN	GROUP	장부·원장·보조장부	Ledgers	\N	\N	TN-07	1180	t	f	t
120	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G01	TN-07	TN	GROUP	기본 장부	Core Ledgers	\N	\N	\N	1190	t	f	t
121	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G01-M01	TN-07-G01	TN	MENU	전표출력	Journal Print	/tenant/tn/07/g01/m01	\N	SA-LDG-01	1200	t	f	t
122	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G01-M02	TN-07-G01	TN	MENU	분개장	Journal Book	/tenant/tn/07/g01/m02	\N	SA-LDG-02	1210	t	f	t
123	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G01-M03	TN-07-G01	TN	MENU	일/월계표	Daily Monthly Trial Balance	/tenant/tn/07/g01/m03	\N	SA-LDG-03	1220	t	f	t
124	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G01-M04	TN-07-G01	TN	MENU	총계정원장	General Ledger	/tenant/tn/07/g01/m04	\N	SA-LDG-04	1230	t	f	t
125	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G01-M05	TN-07-G01	TN	MENU	현금출납장	Cash Book	/tenant/tn/07/g01/m05	\N	SA-LDG-05	1240	t	f	t
126	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G01-M06	TN-07-G01	TN	MENU	계정별원장	Account Ledger	/tenant/tn/07/g01/m06	\N	SA-LDG-06	1250	t	f	t
127	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G01-M07	TN-07-G01	TN	MENU	거래처원장	Customer Ledger	/tenant/tn/07/g01/m07	\N	SA-LDG-07	1260	t	f	t
128	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G01-M08	TN-07-G01	TN	MENU	총괄원장	Consolidated Ledger	/tenant/tn/07/g01/m08	\N	SA-LDG-08	1270	t	f	t
129	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G01-M09	TN-07-G01	TN	MENU	매입매출장	Purchase Sales Ledger	/tenant/tn/07/g01/m09	\N	SA-LDG-09	1280	t	f	t
130	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G02	TN-07	TN	GROUP	차량·관리원장	Vehicle Management Ledgers	\N	\N	\N	1290	t	f	t
131	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G02-M01	TN-07-G02	TN	MENU	운행기록부	Driving Log	/tenant/tn/07/g02/m01	\N	SA-LDG-17	1300	t	f	t
132	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G02-M02	TN-07-G02	TN	MENU	차량비용현황	Vehicle Expense Status	/tenant/tn/07/g02/m02	\N	SA-LDG-18	1310	t	f	t
133	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G02-M03	TN-07-G02	TN	MENU	총계정관리원장	Managed General Ledger	/tenant/tn/07/g02/m03	\N	SA-LDG-10	1320	t	f	t
134	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G02-M04	TN-07-G02	TN	MENU	세금/계산서 발급 및 수취현황	Tax Invoice Issue Receipt Status	/tenant/tn/07/g02/m04	\N	SA-LDG-11	1330	t	f	t
135	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G02-M05	TN-07-G02	TN	MENU	신용카드매출전표 발행현황	Credit Card Sales Slip Status	/tenant/tn/07/g02/m05	\N	SA-LDG-12	1340	t	f	t
136	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G02-M06	TN-07-G02	TN	MENU	적요별원장	Summary Ledger	/tenant/tn/07/g02/m06	\N	SA-LDG-13	1350	t	f	t
137	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G02-M07	TN-07-G02	TN	MENU	전도금원장	Imprest Fund Ledger	/tenant/tn/07/g02/m07	\N	SA-LDG-14	1360	t	f	t
138	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G03	TN-07	TN	GROUP	현장·공사 원장	Site Construction Ledgers	\N	\N	\N	1370	t	f	t
139	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G03-M01	TN-07-G03	TN	MENU	공사대장	Construction Ledger	/tenant/tn/07/g03/m01	\N	SA-LDG-15	1380	t	f	t
140	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G03-M02	TN-07-G03	TN	MENU	외주대장	Subcontract Ledger	/tenant/tn/07/g03/m02	\N	SA-LDG-16	1390	t	f	t
141	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G03-M03	TN-07-G03	TN	MENU	현장/프로젝트/부서 원가안분	Site Project Cost Allocation	/tenant/tn/07/g03/m03	\N	SA-LDG-19	1400	t	f	t
142	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G03-M04	TN-07-G03	TN	MENU	현장/프로젝트/부서 원가현황	Ledger Menu 20	/tenant/tn/07/g03/m04	\N	SA-LDG-20	1410	t	f	t
143	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G03-M05	TN-07-G03	TN	MENU	현장/프로젝트/부서 원가손익	Ledger Menu 23	/tenant/tn/07/g03/m05	\N	SA-LDG-23	1420	t	f	t
144	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G03-M06	TN-07-G03	TN	MENU	현장별 공사원가집계표	Site Construction Cost Summary	/tenant/tn/07/g03/m06	\N	SA-LDG-24	1430	t	f	t
145	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G03-M07	TN-07-G03	TN	MENU	공사비용현황	Ledger Menu 25	/tenant/tn/07/g03/m07	\N	SA-LDG-25	1440	t	f	t
146	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G03-M08	TN-07-G03	TN	MENU	현장별 잔액명세서	Site Balance Statement	/tenant/tn/07/g03/m08	\N	SA-LDG-26	1450	t	f	t
147	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G04	TN-07	TN	GROUP	손익·차원 분석	Profit Dimension Analysis	\N	\N	\N	1460	t	f	t
148	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G04-M01	TN-07-G04	TN	MENU	손익안분	P&L Allocation	/tenant/tn/07/g04/m01	\N	SA-LDG-21	1470	t	f	t
149	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G04-M02	TN-07-G04	TN	MENU	손익현황	P&L Status	/tenant/tn/07/g04/m02	\N	SA-LDG-22	1480	t	f	t
150	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G04-M03	TN-07-G04	TN	MENU	차원 거래처원장	Dimension Customer Ledger	/tenant/tn/07/g04/m03	\N	SA-LDG-27	1490	t	f	t
151	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G04-M04	TN-07-G04	TN	MENU	프로젝트 누적손익현황	Ledger Menu 28	/tenant/tn/07/g04/m04	\N	SA-LDG-28	1500	t	f	t
152	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-07-G04-M05	TN-07-G04	TN	MENU	프로젝트 누적원가현황	Project Cumulative Cost Status	/tenant/tn/07/g04/m05	\N	SA-LDG-29	1510	t	f	t
153	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08	TN	TN	GROUP	마감·결산·재무제표	Closing and Financial Statements	\N	\N	TN-08	1520	t	t	t
154	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G01	TN-08	TN	GROUP	결산 입력·시산표	Closing Input Trial Balance	\N	\N	\N	1530	t	f	t
155	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G01-M01	TN-08-G01	TN	MENU	결산자료입력	Closing Data Input	/tenant/tn/08/g01/m01	\N	SA-CLS-01	1540	t	f	t
156	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G01-M02	TN-08-G01	TN	MENU	합계잔액시산표	Trial Balance	/tenant/tn/08/g01/m02	\N	SA-CLS-02	1550	t	f	t
157	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G01-M03	TN-08-G01	TN	MENU	AI 합계잔액시산표	AI Trial Balance	/tenant/tn/08/g01/m03	\N	SA-CLS-12	1560	t	f	t
158	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G02	TN-08	TN	GROUP	재무제표	Financial Statements	\N	\N	\N	1570	t	f	t
159	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G02-M01	TN-08-G02	TN	MENU	재무상태표	Statement of Financial Position	/tenant/tn/08/g02/m01	\N	SA-CLS-03	1580	t	f	t
160	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G02-M02	TN-08-G02	TN	MENU	손익계산서	Income Statement	/tenant/tn/08/g02/m02	\N	SA-CLS-04	1590	t	f	t
161	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G02-M03	TN-08-G02	TN	MENU	제조원가명세서	Manufacturing Cost Statement	/tenant/tn/08/g02/m03	\N	SA-CLS-05	1600	t	f	t
162	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G02-M04	TN-08-G02	TN	MENU	이익잉여금처분계산서	Retained Earnings Appropriation	/tenant/tn/08/g02/m04	\N	SA-CLS-06	1610	t	f	t
163	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G02-M05	TN-08-G02	TN	MENU	자본변동표	Statement of Changes in Equity	/tenant/tn/08/g02/m05	\N	SA-CLS-07	1620	t	f	t
164	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G02-M06	TN-08-G02	TN	MENU	현금흐름표	Cash Flow Statement	/tenant/tn/08/g02/m06	\N	SA-CLS-08	1630	t	f	t
165	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G02-M07	TN-08-G02	TN	MENU	재무제표 일괄출력	Financial Statement Batch Print	/tenant/tn/08/g02/m07	\N	SA-CLS-13	1640	t	f	t
166	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G03	TN-08	TN	GROUP	부속·증빙 명세	Supplement Evidence Statements	\N	\N	\N	1650	t	f	t
167	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G03-M01	TN-08-G03	TN	MENU	결산부속명세서	Closing Supplementary Schedules	/tenant/tn/08/g03/m01	\N	SA-CLS-09	1660	t	f	t
168	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G03-M02	TN-08-G03	TN	MENU	영수증수취명세서	Receipt Collection Statement	/tenant/tn/08/g03/m02	\N	SA-CLS-15	1670	t	f	t
169	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G03-M03	TN-08-G03	TN	MENU	경비등의송금명세서	Expense Remittance Statement	/tenant/tn/08/g03/m03	\N	SA-CLS-16	1680	t	f	t
170	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G03-M04	TN-08-G03	TN	MENU	지출증명서류합계표	Expenditure Evidence Summary	/tenant/tn/08/g03/m04	\N	SA-CLS-17	1690	t	f	t
171	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G04	TN-08	TN	GROUP	경영·기간 분석	Management Period Analysis	\N	\N	\N	1700	t	f	t
172	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G04-M01	TN-08-G04	TN	MENU	경영정보	Management Information	/tenant/tn/08/g04/m01	\N	SA-CLS-14	1710	t	f	t
173	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G04-M02	TN-08-G04	TN	MENU	기간별손익계산서	Period Income Statement	/tenant/tn/08/g04/m02	\N	SA-CLS-18	1720	t	f	t
174	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G04-M03	TN-08-G04	TN	MENU	기간별원가명세서	Period Cost Statement	/tenant/tn/08/g04/m03	\N	SA-CLS-19	1730	t	f	t
175	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G04-M04	TN-08-G04	TN	MENU	현금및예금잔액검토	Cash Deposit Balance Review	/tenant/tn/08/g04/m04	\N	SA-CLS-10	1740	t	f	t
176	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G04-M05	TN-08-G04	TN	MENU	카드·상품권 사용검토	Card Gift Certificate Usage Review	/tenant/tn/08/g04/m05	\N	SA-CLS-11	1750	t	f	t
177	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G05	TN-08	TN	GROUP	중단사업	Discontinued Operations	\N	\N	\N	1760	t	f	t
178	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G05-M01	TN-08-G05	TN	MENU	중단사업손익계산서	Discontinued Ops Income Statement	/tenant/tn/08/g05/m01	\N	SA-CLS-20	1770	t	f	t
179	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-08-G05-M02	TN-08-G05	TN	MENU	중단사업원가명세서	Discontinued Ops Cost Statement	/tenant/tn/08/g05/m02	\N	SA-CLS-21	1780	t	f	t
180	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09	TN	TN	GROUP	부가세·신고서류	VAT Filing	\N	\N	TN-09	1790	t	f	t
181	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G01	TN-09	TN	GROUP	신고·전자신고	VAT Filing E-filing	\N	\N	\N	1800	t	f	t
182	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G01-M01	TN-09-G01	TN	MENU	신고서 항목 매핑	Return Field Mapping	/tenant/tn/09/g01/m01	\N	SA-VAT-01	1810	t	f	t
183	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G01-M02	TN-09-G01	TN	MENU	세무리스크 자동검증	VAT Filing Menu 2	/tenant/tn/09/g01/m02	\N	SA-VAT-02	1820	t	f	t
184	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G01-M03	TN-09-G01	TN	MENU	부가가치세 전자신고	VAT E-Filing	/tenant/tn/09/g01/m03	\N	SA-VAT-07	1830	t	f	t
185	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G01-M04	TN-09-G01	TN	MENU	부가가치세 납부서	VAT Payment Form	/tenant/tn/09/g01/m04	\N	SA-VAT-08	1840	t	f	t
186	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G01-M05	TN-09-G01	TN	MENU	사업장별 부가세 납부/환급 신고명세	Workplace VAT Payment Refund Report	/tenant/tn/09/g01/m05	\N	SA-VAT-25	1850	t	f	t
187	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G01-M06	TN-09-G01	TN	MENU	사업자단위과세 사업장별 부가세	Business Unit VAT by Workplace	/tenant/tn/09/g01/m06	\N	SA-VAT-26	1860	t	f	t
188	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G01-M07	TN-09-G01	TN	MENU	과표수정 및 추가납부계산서	VAT Filing Menu 27	/tenant/tn/09/g01/m07	\N	SA-VAT-27	1870	t	f	t
189	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G01-M08	TN-09-G01	TN	MENU	과표 및 세액 경정청구서	VAT Filing Menu 28	/tenant/tn/09/g01/m08	\N	SA-VAT-28	1880	t	f	t
190	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G01-M09	TN-09-G01	TN	MENU	납부서 작성	Payment Form Entry	/tenant/tn/09/g01/m09	\N	SA-VAT-49	1890	t	f	t
191	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G02	TN-09	TN	GROUP	매출·매입 합계	Sales Purchase Summaries	\N	\N	\N	1900	t	f	t
192	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G02-M01	TN-09-G02	TN	MENU	세금계산서합계표	Tax Invoice Summary	/tenant/tn/09/g02/m01	\N	SA-VAT-03	1910	t	f	t
193	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G02-M02	TN-09-G02	TN	MENU	신용카드매출전표등 수령명세서	Credit Card Sales Receipt Statement	/tenant/tn/09/g02/m02	\N	SA-VAT-04	1920	t	f	t
194	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G02-M03	TN-09-G02	TN	MENU	신용카드매출전표 발행집계표	Credit Card Sales Issue Summary	/tenant/tn/09/g02/m03	\N	SA-VAT-05	1930	t	f	t
195	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G02-M04	TN-09-G02	TN	MENU	계산서합계표	Invoice Summary	/tenant/tn/09/g02/m04	\N	SA-VAT-06	1940	t	f	t
196	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G02-M05	TN-09-G02	TN	MENU	현금매출명세서	Cash Sales Statement	/tenant/tn/09/g02/m05	\N	SA-VAT-14	1950	t	f	t
197	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G02-M06	TN-09-G02	TN	MENU	월별판매액합계표	Monthly Sales Summary	/tenant/tn/09/g02/m06	\N	SA-VAT-17	1960	t	f	t
198	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G02-M07	TN-09-G02	TN	MENU	매입자발행세금계산서합계표	Purchaser-issued Tax Invoice Summary	/tenant/tn/09/g02/m07	\N	SA-VAT-46	1970	t	f	t
199	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G02-M08	TN-09-G02	TN	MENU	과세유흥장소 과표신고서	Entertainment Place Tax Base Report	/tenant/tn/09/g02/m08	\N	SA-VAT-47	1980	t	f	t
200	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G02-M09	TN-09-G02	TN	MENU	사업양도신고서	Business Transfer Report	/tenant/tn/09/g02/m09	\N	SA-VAT-50	1990	t	f	t
201	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G03	TN-09	TN	GROUP	공제·환급 신고	Deduction Refund Filing	\N	\N	\N	2000	t	f	t
202	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G03-M01	TN-09-G03	TN	MENU	의제매입세액공제신고서	Deemed Input Tax Credit Report	/tenant/tn/09/g03/m01	\N	SA-VAT-11	2010	t	f	t
203	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G03-M02	TN-09-G03	TN	MENU	재활용폐자원세액공제신고서	Recycled Resource Tax Credit Report	/tenant/tn/09/g03/m02	\N	SA-VAT-12	2020	t	f	t
204	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G03-M03	TN-09-G03	TN	MENU	구리스크랩등 매입세액공제신고서	Copper Scrap Input Tax Credit Report	/tenant/tn/09/g03/m03	\N	SA-VAT-13	2030	t	f	t
205	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G03-M04	TN-09-G03	TN	MENU	공제받지못할매입세액명세서	Non-deductible Input VAT Statement	/tenant/tn/09/g03/m04	\N	SA-VAT-22	2040	t	f	t
206	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G03-M05	TN-09-G03	TN	MENU	건물등감가상각자산취득명세서	Depreciable Asset Acquisition	/tenant/tn/09/g03/m05	\N	SA-VAT-23	2050	t	f	t
207	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G03-M06	TN-09-G03	TN	MENU	대손세액공제신고서	Bad Debt Tax Credit Report	/tenant/tn/09/g03/m06	\N	SA-VAT-24	2060	t	f	t
208	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G03-M07	TN-09-G03	TN	MENU	농어업기자재 부가세환급신청	Agricultural Materials VAT Refund	/tenant/tn/09/g03/m07	\N	SA-VAT-18	2070	t	f	t
209	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G03-M08	TN-09-G03	TN	MENU	전자신고세액공제신청서	E-Filing Tax Credit Application	/tenant/tn/09/g03/m08	\N	SA-VAT-20	2080	t	f	t
210	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G03-M09	TN-09-G03	TN	MENU	과세사업전환 감가상각자산 신고서	Taxable Conversion Asset Report	/tenant/tn/09/g03/m09	\N	SA-VAT-45	2090	t	f	t
211	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G04	TN-09	TN	GROUP	업종별 부속명세	Industry Attachments	\N	\N	\N	2100	t	f	t
212	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G04-M01	TN-09-G04	TN	MENU	부동산임대공급가액명세서	Real Estate Rental Supply Statement	/tenant/tn/09/g04/m01	\N	SA-VAT-09	2110	t	f	t
213	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G04-M02	TN-09-G04	TN	MENU	건물관리명세서	Building Management Statement	/tenant/tn/09/g04/m02	\N	SA-VAT-10	2120	t	f	t
214	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G04-M03	TN-09-G04	TN	MENU	동물진료용역매출명세서	Veterinary Service Sales Statement	/tenant/tn/09/g04/m03	\N	SA-VAT-15	2130	t	f	t
215	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G04-M04	TN-09-G04	TN	MENU	면세유류공급명세서	VAT Filing Menu 16	/tenant/tn/09/g04/m04	\N	SA-VAT-16	2140	t	f	t
216	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G04-M05	TN-09-G04	TN	MENU	관세환급금등명세서	Customs Refund Statement	/tenant/tn/09/g04/m05	\N	SA-VAT-33	2150	t	f	t
217	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G04-M06	TN-09-G04	TN	MENU	전자화폐결제명세서	Electronic Money Payment Statement	/tenant/tn/09/g04/m06	\N	SA-VAT-19	2160	t	f	t
218	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G04-M07	TN-09-G04	TN	MENU	보세판매장 공급실적	Bonded Store Supply Performance	/tenant/tn/09/g04/m07	\N	SA-VAT-21	2170	t	f	t
219	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G05	TN-09	TN	GROUP	영세율·수출	Zero Rate Export	\N	\N	\N	2180	t	f	t
220	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G05-M01	TN-09-G05	TN	MENU	수출실적명세서	Export Performance Statement	/tenant/tn/09/g05/m01	\N	SA-VAT-29	2190	t	f	t
221	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G05-M02	TN-09-G05	TN	MENU	영세율첨부서류제출명세서	Zero-rated Attachment Statement	/tenant/tn/09/g05/m02	\N	SA-VAT-30	2200	t	f	t
222	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G05-M03	TN-09-G05	TN	MENU	내국신용장/구매확인서 전자발급	Local LC Purchase Confirmation Issue	/tenant/tn/09/g05/m03	\N	SA-VAT-31	2210	t	f	t
223	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G05-M04	TN-09-G05	TN	MENU	외화획득명세서	Foreign Currency Earning Statement	/tenant/tn/09/g05/m04	\N	SA-VAT-32	2220	t	f	t
224	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G05-M05	TN-09-G05	TN	MENU	재화·용역 공급기록표	Goods Services Supply Record	/tenant/tn/09/g05/m05	\N	SA-VAT-39	2230	t	f	t
225	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G05-M06	TN-09-G05	TN	MENU	공급가액확정명세서	Supply Value Confirmation Statement	/tenant/tn/09/g05/m06	\N	SA-VAT-40	2240	t	f	t
226	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G05-M07	TN-09-G05	TN	MENU	선박에 의한 운송용역 공급가액일람표	Ship Transport Supply Schedule	/tenant/tn/09/g05/m07	\N	SA-VAT-41	2250	t	f	t
227	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G05-M08	TN-09-G05	TN	MENU	외항선박등에 제공한 재화·용역 일람표	Ocean Vessel Supply Schedule	/tenant/tn/09/g05/m08	\N	SA-VAT-42	2260	t	f	t
228	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G05-M09	TN-09-G05	TN	MENU	영세율매출명세서	Zero-rated Sales Statement	/tenant/tn/09/g05/m09	\N	SA-VAT-43	2270	t	f	t
229	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G06	TN-09	TN	GROUP	외국인·기타 신고	Foreign Visitor Misc Filing	\N	\N	\N	2280	t	f	t
230	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G06-M01	TN-09-G06	TN	MENU	외국인관광객 면세판매 및 환급명세서	Foreigner Tax-free Sales Refund	/tenant/tn/09/g06/m01	\N	SA-VAT-34	2290	t	f	t
231	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G06-M02	TN-09-G06	TN	MENU	외국인 의료용역 환급	Foreigner Medical Service Refund	/tenant/tn/09/g06/m02	\N	SA-VAT-35	2300	t	f	t
232	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G06-M03	TN-09-G06	TN	MENU	사업용계좌 개설신고서	Business Account Opening Report	/tenant/tn/09/g06/m03	\N	SA-VAT-48	2310	t	f	t
233	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G06-M04	TN-09-G06	TN	MENU	외국인관광객 숙박용역 환급실적명세서	Foreigner Lodging Service Refund	/tenant/tn/09/g06/m04	\N	SA-VAT-36	2320	t	f	t
234	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G06-M05	TN-09-G06	TN	MENU	외국인 즉시환급 판매	Foreigner Instant Refund Sales	/tenant/tn/09/g06/m05	\N	SA-VAT-37	2330	t	f	t
235	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G06-M06	TN-09-G06	TN	MENU	외국인물품	Foreigner Goods Sales	/tenant/tn/09/g06/m06	\N	SA-VAT-38	2340	t	f	t
236	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-09-G06-M07	TN-09-G06	TN	MENU	일반/간이과세 전환 시 재고품등 신고	Tax Conversion Inventory Report	/tenant/tn/09/g06/m07	\N	SA-VAT-44	2350	t	f	t
237	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-10	TN	TN	GROUP	세무·고정자산·차량	Tax and Fixed Assets	\N	\N	TN-10	2360	t	f	t
238	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-10-M01	TN-10	TN	MENU	고정자산등록	Fixed Asset Registration	/tenant/tn/10/m01	\N	SA-FA-01	2370	t	f	t
239	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-10-M02	TN-10	TN	MENU	미상각분 감가상각계산	Undepreciated Asset Depreciation	/tenant/tn/10/m02	\N	SA-FA-02	2380	t	f	t
240	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-10-M03	TN-10	TN	MENU	양도자산 감가상각계산	Transferred Asset Depreciation	/tenant/tn/10/m03	\N	SA-FA-03	2390	t	f	t
241	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-10-M04	TN-10	TN	MENU	원가경비별 감가상각명세서	Depreciation Expense Statement	/tenant/tn/10/m04	\N	SA-FA-04	2400	t	f	t
242	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-10-M05	TN-10	TN	MENU	고정자산관리대장	Fixed Asset Ledger	/tenant/tn/10/m05	\N	SA-FA-05	2410	t	f	t
243	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-10-M06	TN-10	TN	MENU	현장/프로젝트/부서 자산명세서	Asset Statement by Site Project	/tenant/tn/10/m06	\N	SA-FA-06	2420	t	f	t
244	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-10-M07	TN-10	TN	MENU	월별 감가상각비 계상	Monthly Depreciation Posting	/tenant/tn/10/m07	\N	SA-FA-07	2430	t	f	t
245	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11	TN	TN	GROUP	자금·예산·어음	Treasury, Budget and Bills	\N	\N	TN-11	2440	t	f	t
246	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G01	TN-11	TN	GROUP	일일 자금관리	Daily Cash Management	\N	\N	\N	2450	t	f	t
247	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G01-M01	TN-11-G01	TN	MENU	일일자금명세/경리일보	Daily Cash Statement	/tenant/tn/11/g01/m01	\N	SA-FND-01	2460	t	f	t
248	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G01-M02	TN-11-G01	TN	MENU	일일자금현황	Daily Cash Status	/tenant/tn/11/g01/m02	\N	SA-FND-03	2470	t	f	t
249	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G01-M03	TN-11-G01	TN	MENU	자금일월보	Cash Daily Monthly Report	/tenant/tn/11/g01/m03	\N	SA-FND-04	2480	t	f	t
250	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G01-M04	TN-11-G01	TN	MENU	자금입출금내역	Cash Receipt Payment Details	/tenant/tn/11/g01/m04	\N	SA-FND-05	2490	t	f	t
251	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G02	TN-11	TN	GROUP	자금계획·예산	Cash Planning Budget	\N	\N	\N	2500	t	f	t
252	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G02-M01	TN-11-G02	TN	MENU	자금계획입력	Cash Plan Input	/tenant/tn/11/g02/m01	\N	SA-FND-02	2510	t	f	t
253	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G02-M02	TN-11-G02	TN	MENU	자금계획서	Cash Plan	/tenant/tn/11/g02/m02	\N	SA-FND-06	2520	t	f	t
254	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G02-M03	TN-11-G02	TN	MENU	예산입력	Budget Input	/tenant/tn/11/g02/m03	\N	SA-FND-07	2530	t	f	t
255	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G02-M04	TN-11-G02	TN	MENU	당기예산 월별 실적현황	Current Budget Monthly Actuals	/tenant/tn/11/g02/m04	\N	SA-FND-08	2540	t	f	t
256	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G02-M05	TN-11-G02	TN	MENU	당기예산 분기/반기 실적현황	Current Budget Period Actuals	/tenant/tn/11/g02/m05	\N	SA-FND-09	2550	t	f	t
257	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G02-M06	TN-11-G02	TN	MENU	전기실행액입력	Prior Execution Amount Input	/tenant/tn/11/g02/m06	\N	SA-FND-10	2560	t	f	t
258	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G02-M07	TN-11-G02	TN	MENU	전기예산 월별 실적현황	Prior Budget Monthly Actuals	/tenant/tn/11/g02/m07	\N	SA-FND-11	2570	t	f	t
259	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G02-M08	TN-11-G02	TN	MENU	전기예산 분기/반기 실적현황	Prior Budget Period Actuals	/tenant/tn/11/g02/m08	\N	SA-FND-12	2580	t	f	t
260	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G02-M09	TN-11-G02	TN	MENU	차기예산입력	Next Budget Input	/tenant/tn/11/g02/m09	\N	SA-FND-13	2590	t	f	t
261	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G02-M10	TN-11-G02	TN	MENU	추정예산	Estimated Budget	/tenant/tn/11/g02/m10	\N	SA-FND-14	2600	t	f	t
262	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G03	TN-11	TN	GROUP	예적금·차입금	Deposits Borrowings	\N	\N	\N	2610	t	f	t
263	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G03-M01	TN-11-G03	TN	MENU	예적금현황	Deposit Balance Status	/tenant/tn/11/g03/m01	\N	SA-DEP-01	2620	t	f	t
264	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G03-M02	TN-11-G03	TN	MENU	차입금스케줄관리	Borrowing Schedule Management	/tenant/tn/11/g03/m02	\N	SA-DEP-02	2630	t	f	t
265	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G03-M03	TN-11-G03	TN	MENU	차입금현황	Borrowing Status	/tenant/tn/11/g03/m03	\N	SA-DEP-03	2640	t	f	t
266	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G04	TN-11	TN	GROUP	어음·수표관리	Bills Checks Management	\N	\N	\N	2650	t	f	t
267	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G04-M01	TN-11-G04	TN	MENU	받을어음현황	Notes Receivable Status	/tenant/tn/11/g04/m01	\N	SA-BIL-01	2660	t	f	t
268	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G04-M02	TN-11-G04	TN	MENU	지급어음현황	Notes Payable Status	/tenant/tn/11/g04/m02	\N	SA-BIL-02	2670	t	f	t
269	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G04-M03	TN-11-G04	TN	MENU	어음집계표	Bills Summary	/tenant/tn/11/g04/m03	\N	SA-BIL-03	2680	t	f	t
270	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-11-G04-M04	TN-11-G04	TN	MENU	당좌수표현황	Cashier Check Status	/tenant/tn/11/g04/m04	\N	SA-BIL-04	2690	t	f	t
271	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-12	TN	TN	GROUP	외화·관계사·관리회계 [선택]	FX and Intercompany Management	\N	\N	TN-12	2700	t	f	t
272	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-13	TN	TN	GROUP	원가·재고·제조 [Phase/업종]	Cost, Inventory and Manufacturing	\N	\N	TN-13	2710	t	f	t
273	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-14	TN	TN	GROUP	협업·AI [AI]	Collaboration and AI	\N	\N	TN-14	2720	t	f	t
274	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-15	TN	TN	GROUP	데이터관리·이관	Data Migration	\N	\N	TN-15	2730	t	f	t
275	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-15-M01	TN-15	TN	MENU	전표 삭제 → 복구	Journal Deletion and Recovery	/tenant/tn/15/m01	\N	SA-DAT-01	2740	t	f	t
276	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-15-M02	TN-15	TN	MENU	데이터백업 / 데이터복구	Data Backup and Recovery	/tenant/tn/15/m02	\N	SA-DAT-02	2750	t	f	t
277	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-15-M03	TN-15	TN	MENU	SmartA로 보낼 데이터 만들기	Create Data for Smart A Export	/tenant/tn/15/m03	\N	SA-DAT-03	2760	t	f	t
278	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-15-M04	TN-15	TN	MENU	SmartA로 보낼 데이터 만들기	Create Data for Smart A Export	/tenant/tn/15/m04	\N	SA-DAT-04	2770	t	f	t
279	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-15-M05	TN-15	TN	MENU	SmartA 데이터올리기	Smart A Data Upload	/tenant/tn/15/m05	\N	SA-DAT-05	2780	t	f	t
280	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-15-M06	TN-15	TN	MENU	SmartA 데이터올리기	Smart A Data Upload	/tenant/tn/15/m06	\N	SA-DAT-06	2790	t	f	t
281	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	TN-15-M07	TN-15	TN	MENU	기수변경	Fiscal Year Change	/tenant/tn/15/m07	\N	SA-DAT-07	2800	t	f	t
282	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	CO	\N	CO	GROUP	공통·기술·설계 추적	Common Platform	\N	\N	\N	2810	t	f	t
283	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	CO-01	CO	CO	GROUP	로그인·내 계정	Login and My Account	\N	\N	CO-01	2820	t	f	t
284	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	CO-02	CO	CO	GROUP	알림·커뮤니케이션	Notification and Communication	\N	\N	CO-02	2830	t	f	t
285	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	CO-03	CO	CO	GROUP	API·서비스 계약	API and Service Contract	\N	\N	CO-03	2840	t	f	t
286	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	CO-04	CO	CO	GROUP	검증·오류 처리	Validation and Error Handling	\N	\N	CO-04	2850	t	f	t
287	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	CO-05	CO	CO	GROUP	데이터 모델·상태값	Data Model and Status Values	\N	\N	CO-05	2860	t	f	t
288	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	CO-06	CO	CO	GROUP	배치·스케줄	Batch and Schedule	\N	\N	CO-06	2870	t	f	t
289	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	CO-07	CO	CO	GROUP	보안·개인정보	Security and Privacy	\N	\N	CO-07	2880	t	f	t
290	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	CO-08	CO	CO	GROUP	시스템 운영·인프라	System Operations and Infrastructure	\N	\N	CO-08	2890	t	f	t
291	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	CO-09	CO	CO	GROUP	산출물·보고서	Outputs and Reports	\N	\N	CO-09	2900	t	f	t
292	2026-07-10 10:26:58.138866+09	\N	2026-07-10 10:26:58.138866+09	\N	1	UI	CO-10	CO	CO	GROUP	설계서 부록 추적	Design Appendix Trace	\N	\N	CO-10	2910	t	f	t
\.


--
-- Data for Name: personal_data_access_log; Type: TABLE DATA; Schema: public; Owner: bk_app
--

COPY public.personal_data_access_log (id, created_at, tenant_id, user_id, login_id, user_name, target_type, target_id, target_name, data_items, access_type, purpose, record_count, request_id, ip) FROM stdin;
1	2026-07-09 15:15:18.413083+09	\N	1	admin	조강수	USER	1	조강수	["email", "phone"]	VIEW_PLAIN	HR-check	1	7a17a54a-7b9c-4f88-91bd-6dcc66c13f94	::1
2	2026-07-10 15:37:16.725576+09	\N	0	dev	개발사용자	USER	1	조강수	["email", "phone"]	VIEW_PLAIN	%BB%E7%BF%EB%C0%DA%20%C1%A4%BA%B8%20%BC%F6%C1%A4	1	b0f3353e-b6fd-4e09-88b5-95c0e4f02db0	::1
3	2026-07-10 15:38:13.880402+09	\N	1	admin	조강수	USER	1	조강수	["email", "phone"]	VIEW_PLAIN	사용자 정보 수정	1	bad710bf-fc72-4cd1-9c9b-ff049ff5efa3	::1
4	2026-07-10 15:38:27.56556+09	\N	1	admin	조강수	USER	2	김기장	["email", "phone"]	VIEW_PLAIN	사용자 정보 수정	1	7c5a8c9c-3b60-4280-bfab-5f2e4999ca13	::1
\.


--
-- Name: admin_resource_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bk_app
--

SELECT pg_catalog.setval('public.admin_resource_id_seq', 21, true);


--
-- Name: app_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bk_app
--

SELECT pg_catalog.setval('public.app_user_id_seq', 4, true);


--
-- Name: audit_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bk_app
--

SELECT pg_catalog.setval('public.audit_log_id_seq', 14, true);


--
-- Name: common_code_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bk_app
--

SELECT pg_catalog.setval('public.common_code_group_id_seq', 67, true);


--
-- Name: common_code_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bk_app
--

SELECT pg_catalog.setval('public.common_code_item_id_seq', 395, true);


--
-- Name: login_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bk_app
--

SELECT pg_catalog.setval('public.login_history_id_seq', 8, true);


--
-- Name: masking_policy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bk_app
--

SELECT pg_catalog.setval('public.masking_policy_id_seq', 6, true);


--
-- Name: menu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bk_app
--

SELECT pg_catalog.setval('public.menu_id_seq', 292, true);


--
-- Name: personal_data_access_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bk_app
--

SELECT pg_catalog.setval('public.personal_data_access_log_id_seq', 4, true);


--
-- Name: audit_log PK_07fefa57f7f5ab8fc3f52b3ed0b; Type: CONSTRAINT; Schema: public; Owner: bk_app
--

ALTER TABLE ONLY public.audit_log
    ADD CONSTRAINT "PK_07fefa57f7f5ab8fc3f52b3ed0b" PRIMARY KEY (id);


--
-- Name: app_user PK_22a5c4a3d9b2fb8e4e73fc4ada1; Type: CONSTRAINT; Schema: public; Owner: bk_app
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT "PK_22a5c4a3d9b2fb8e4e73fc4ada1" PRIMARY KEY (id);


--
-- Name: menu PK_35b2a8f47d153ff7a41860cceeb; Type: CONSTRAINT; Schema: public; Owner: bk_app
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY (id);


--
-- Name: personal_data_access_log PK_4cacb73199ffd64c66ecb2d0044; Type: CONSTRAINT; Schema: public; Owner: bk_app
--

ALTER TABLE ONLY public.personal_data_access_log
    ADD CONSTRAINT "PK_4cacb73199ffd64c66ecb2d0044" PRIMARY KEY (id);


--
-- Name: masking_policy PK_653e6ab0ae37b1530f48f4c73d9; Type: CONSTRAINT; Schema: public; Owner: bk_app
--

ALTER TABLE ONLY public.masking_policy
    ADD CONSTRAINT "PK_653e6ab0ae37b1530f48f4c73d9" PRIMARY KEY (id);


--
-- Name: common_code_group PK_95c1771f0fe39c271d7c8333521; Type: CONSTRAINT; Schema: public; Owner: bk_app
--

ALTER TABLE ONLY public.common_code_group
    ADD CONSTRAINT "PK_95c1771f0fe39c271d7c8333521" PRIMARY KEY (id);


--
-- Name: admin_resource PK_9dc73cce74e5876078d5af2e302; Type: CONSTRAINT; Schema: public; Owner: bk_app
--

ALTER TABLE ONLY public.admin_resource
    ADD CONSTRAINT "PK_9dc73cce74e5876078d5af2e302" PRIMARY KEY (id);


--
-- Name: common_code_item PK_e6c5004e2621e2de185094776c7; Type: CONSTRAINT; Schema: public; Owner: bk_app
--

ALTER TABLE ONLY public.common_code_item
    ADD CONSTRAINT "PK_e6c5004e2621e2de185094776c7" PRIMARY KEY (id);


--
-- Name: login_history PK_fe377f36d49c39547cb6b9f0727; Type: CONSTRAINT; Schema: public; Owner: bk_app
--

ALTER TABLE ONLY public.login_history
    ADD CONSTRAINT "PK_fe377f36d49c39547cb6b9f0727" PRIMARY KEY (id);


--
-- Name: masking_policy UQ_aaf797f430e1d60883587f3ab4f; Type: CONSTRAINT; Schema: public; Owner: bk_app
--

ALTER TABLE ONLY public.masking_policy
    ADD CONSTRAINT "UQ_aaf797f430e1d60883587f3ab4f" UNIQUE (data_type, field_name);


--
-- Name: IDX_334e140ef3baefedf7c7277ae8; Type: INDEX; Schema: public; Owner: bk_app
--

CREATE UNIQUE INDEX "IDX_334e140ef3baefedf7c7277ae8" ON public.menu USING btree (menu_code);


--
-- Name: IDX_3bb8d25ce2ed52649daf59053e; Type: INDEX; Schema: public; Owner: bk_app
--

CREATE UNIQUE INDEX "IDX_3bb8d25ce2ed52649daf59053e" ON public.common_code_group USING btree (group_code);


--
-- Name: IDX_7afcd524cb6e008535c5876dd8; Type: INDEX; Schema: public; Owner: bk_app
--

CREATE INDEX "IDX_7afcd524cb6e008535c5876dd8" ON public.admin_resource USING btree (resource_type);


--
-- Name: IDX_93d1eb2b23bc68913d5fddbbda; Type: INDEX; Schema: public; Owner: bk_app
--

CREATE UNIQUE INDEX "IDX_93d1eb2b23bc68913d5fddbbda" ON public.common_code_item USING btree (group_code, code);


--
-- Name: IDX_9743fe7b06b84cbb004af835b0; Type: INDEX; Schema: public; Owner: bk_app
--

CREATE UNIQUE INDEX "IDX_9743fe7b06b84cbb004af835b0" ON public.app_user USING btree (login_id);


--
-- Name: IDX_ad217a94f778851d62c38b82d4; Type: INDEX; Schema: public; Owner: bk_app
--

CREATE INDEX "IDX_ad217a94f778851d62c38b82d4" ON public.audit_log USING btree (tenant_id, created_at);


--
-- Name: IDX_c5aa4ea03e1c3930670f4c911c; Type: INDEX; Schema: public; Owner: bk_app
--

CREATE INDEX "IDX_c5aa4ea03e1c3930670f4c911c" ON public.login_history USING btree (login_id, created_at);


--
-- Name: IDX_f61aa7ef8c871ddcd1ecd5aef1; Type: INDEX; Schema: public; Owner: bk_app
--

CREATE INDEX "IDX_f61aa7ef8c871ddcd1ecd5aef1" ON public.personal_data_access_log USING btree (tenant_id, created_at);


--
-- PostgreSQL database dump complete
--

\unrestrict LcHrrXUe4TtfyGyGkecLyyfMdf8j0K6PWDuCsLQWquKE1KGwwdxHwhDtiAW7a4e

