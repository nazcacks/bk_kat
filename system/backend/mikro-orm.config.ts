import 'dotenv/config';
import { defineConfig } from '@mikro-orm/postgresql';
import { createMikroOrmOptions } from './src/database/mikro-orm.options';

export default defineConfig(
  createMikroOrmOptions({
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USERNAME ?? 'bk_app',
    password: process.env.DB_PASSWORD ?? 'bk_dev_password',
    database: process.env.DB_DATABASE ?? 'bk_dev',
    debug: (process.env.DB_DEBUG ?? 'false') === 'true',
  }),
);
