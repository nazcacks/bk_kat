export default () => ({
  port: Number(process.env.PORT ?? 3000),
  env: process.env.NODE_ENV ?? 'development',
  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USERNAME ?? 'bk_app',
    password: process.env.DB_PASSWORD ?? 'bk_dev_password',
    database: process.env.DB_DATABASE ?? 'bk_dev',
    synchronize: (process.env.DB_SYNCHRONIZE ?? 'true') === 'true',
    debug: (process.env.DB_DEBUG ?? 'false') === 'true',
  },
  auth: {
    bypass: (process.env.AUTH_BYPASS ?? 'false') === 'true',
    jwtSecret: process.env.JWT_SECRET ?? 'dev-only-secret-change-in-production',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '12h',
  },
  security: {
    dataEncryptionKey: process.env.DATA_ENCRYPTION_KEY ?? '',
  },
});
