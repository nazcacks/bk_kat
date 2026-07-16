import { Options } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { join } from 'path';
import { CommonCodeGroup, CommonCodeItem } from '../modules/common-codes/common-code.entity';
import { Menu } from '../modules/menus/menu.entity';
import { AdminResource } from '../modules/resources/admin-resource.entity';
import { AuditLog } from '../modules/security/entities/audit-log.entity';
import { LoginHistory } from '../modules/security/entities/login-history.entity';
import { MaskingPolicy } from '../modules/security/entities/masking-policy.entity';
import { PersonalDataAccessLog } from '../modules/security/entities/personal-data-access-log.entity';
import { User } from '../modules/users/user.entity';

export interface DatabaseConnectionOptions {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  debug?: boolean;
}

export const MIKRO_ORM_ENTITIES = [
  AdminResource,
  AuditLog,
  CommonCodeGroup,
  CommonCodeItem,
  LoginHistory,
  MaskingPolicy,
  Menu,
  PersonalDataAccessLog,
  User,
];

export function createMikroOrmOptions(
  database: DatabaseConnectionOptions,
): Options<PostgreSqlDriver> {
  return {
    driver: PostgreSqlDriver,
    host: database.host,
    port: database.port,
    user: database.username,
    password: database.password,
    dbName: database.database,
    entities: MIKRO_ORM_ENTITIES,
    extensions: [Migrator],
    debug: database.debug ?? false,
    migrations: {
      path: join(process.cwd(), 'dist', 'database', 'migrations'),
      pathTs: join(process.cwd(), 'src', 'database', 'migrations'),
      transactional: true,
      allOrNothing: true,
      dropTables: false,
      safe: true,
      emit: 'ts',
      snapshotName: '.snapshot-bk',
    },
  };
}
