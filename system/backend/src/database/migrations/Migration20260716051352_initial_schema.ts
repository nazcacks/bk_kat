import { Migration } from '@mikro-orm/migrations';

export class Migration20260716051352_initial_schema extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "admin_resource" ("id" bigserial primary key, "created_at" timestamptz not null default now(), "created_by" varchar(64) null, "updated_at" timestamptz not null default now(), "updated_by" varchar(64) null, "version" int not null default 1, "source" varchar(32) not null default 'UI', "resource_type" varchar(40) not null, "data" jsonb not null, "is_active" boolean not null default true);`);
    this.addSql(`create index "admin_resource_resource_type_index" on "admin_resource" ("resource_type");`);

    this.addSql(`create table "audit_log" ("id" bigserial primary key, "created_at" timestamptz not null default now(), "tenant_id" varchar(32) null, "user_id" varchar(64) null, "login_id" varchar(64) null, "user_name" varchar(100) null, "action" varchar(32) not null, "resource" varchar(64) not null, "menu_code" varchar(32) null, "http_method" varchar(8) null, "request_path" varchar(255) null, "before_data" jsonb null, "after_data" jsonb null, "request_id" varchar(64) null, "ip" varchar(64) null, "user_agent" varchar(255) null, "result" varchar(16) not null default 'SUCCESS', "prev_hash" varchar(64) null, "chain_hash" varchar(64) not null);`);
    this.addSql(`create index "IDX_14bcaa576c86e805b158f293f7" on "audit_log" ("tenant_id", "created_at");`);

    this.addSql(`create table "common_code_group" ("id" bigserial primary key, "created_at" timestamptz not null default now(), "created_by" varchar(64) null, "updated_at" timestamptz not null default now(), "updated_by" varchar(64) null, "version" int not null default 1, "source" varchar(32) not null default 'UI', "group_code" varchar(32) not null, "group_name" varchar(100) not null, "name_en" varchar(100) null, "domain" varchar(32) null, "policy" varchar(32) null, "description" varchar(500) null, "is_active" boolean not null default true);`);
    this.addSql(`alter table "common_code_group" add constraint "IDX_3bb8d25ce2ed52649daf59053e" unique ("group_code");`);

    this.addSql(`create table "common_code_item" ("id" bigserial primary key, "created_at" timestamptz not null default now(), "created_by" varchar(64) null, "updated_at" timestamptz not null default now(), "updated_by" varchar(64) null, "version" int not null default 1, "source" varchar(32) not null default 'UI', "group_code" varchar(32) not null, "code" varchar(32) not null, "name" varchar(100) not null, "name_en" varchar(100) null, "sort_order" int not null default 0, "attributes" jsonb null, "is_active" boolean not null default true);`);
    this.addSql(`alter table "common_code_item" add constraint "IDX_93d1eb2b23bc68913d5fddbbda" unique ("group_code", "code");`);

    this.addSql(`create table "login_history" ("id" bigserial primary key, "created_at" timestamptz not null default now(), "user_id" varchar(64) null, "login_id" varchar(64) not null, "name" varchar(100) null, "tenant_id" varchar(32) null, "ip" varchar(64) null, "user_agent" varchar(255) null, "result" varchar(16) not null, "fail_reason" varchar(100) null);`);
    this.addSql(`create index "IDX_c5aa4ea03e1c3930670f4c911c" on "login_history" ("login_id", "created_at");`);

    this.addSql(`create table "masking_policy" ("id" bigserial primary key, "created_at" timestamptz not null default now(), "created_by" varchar(64) null, "updated_at" timestamptz not null default now(), "updated_by" varchar(64) null, "version" int not null default 1, "source" varchar(32) not null default 'UI', "data_type" varchar(32) not null, "field_name" varchar(64) not null, "mask_pattern" varchar(64) not null, "description" varchar(255) null, "required_grant" varchar(64) null, "is_active" boolean not null default true);`);
    this.addSql(`alter table "masking_policy" add constraint "UQ_aaf797f430e1d60883587f3ab4f" unique ("data_type", "field_name");`);

    this.addSql(`create table "menu" ("id" bigserial primary key, "created_at" timestamptz not null default now(), "created_by" varchar(64) null, "updated_at" timestamptz not null default now(), "updated_by" varchar(64) null, "version" int not null default 1, "source" varchar(32) not null default 'UI', "menu_code" varchar(32) not null, "parent_code" varchar(32) null, "channel" varchar(8) not null default 'TN', "menu_type" varchar(8) not null default 'MENU', "name" varchar(100) not null, "name_en" varchar(100) null, "path" varchar(255) null, "icon" varchar(16) null, "screen_id" varchar(32) null, "sort_order" int not null default 0, "is_visible" boolean not null default true, "requires_step_up" boolean not null default false, "is_active" boolean not null default true);`);
    this.addSql(`alter table "menu" add constraint "IDX_334e140ef3baefedf7c7277ae8" unique ("menu_code");`);

    this.addSql(`create table "personal_data_access_log" ("id" bigserial primary key, "created_at" timestamptz not null default now(), "tenant_id" varchar(32) null, "user_id" varchar(64) not null, "login_id" varchar(64) not null, "user_name" varchar(100) null, "target_type" varchar(32) not null, "target_id" varchar(64) null, "target_name" varchar(100) null, "data_items" jsonb not null, "access_type" varchar(32) not null, "purpose" varchar(500) null, "record_count" int not null default 1, "request_id" varchar(64) null, "ip" varchar(64) null);`);
    this.addSql(`create index "IDX_f61aa7ef8c871ddcd1ecd5aef1" on "personal_data_access_log" ("tenant_id", "created_at");`);

    this.addSql(`create table "app_user" ("id" bigserial primary key, "created_at" timestamptz not null default now(), "created_by" varchar(64) null, "updated_at" timestamptz not null default now(), "updated_by" varchar(64) null, "version" int not null default 1, "source" varchar(32) not null default 'UI', "login_id" varchar(64) not null, "name" varchar(100) not null, "email" varchar(255) null, "phone" varchar(32) null, "user_group" varchar(16) not null default 'TENANT', "tenant_id" varchar(32) null, "status" varchar(20) not null default 'ACTIVE', "roles" text not null default '', "password_hash" varchar(255) null, "last_login_at" timestamptz null, "is_external_partner" boolean not null default false, "detail" jsonb null);`);
    this.addSql(`alter table "app_user" add constraint "IDX_9743fe7b06b84cbb004af835b0" unique ("login_id");`);
  }

}
