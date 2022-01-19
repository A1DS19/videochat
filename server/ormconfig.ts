import * as env from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
env.config();

const dev_config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12QWASZX',
  database: 'videochat',
  entities: ['./dist/src/**/*.entity.js'],
  migrations: ['./dist/src/migrations/*.js'],
  cli: {
    migrationsDir: './src/migrations',
  },
  synchronize: false,
  logging: 'all',
  logger: 'advanced-console',
};

const prod_config: PostgresConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['./dist/src/**/*.entity.js'],
  migrations: ['./dist/src/migrations/*.js'],
  cli: {
    migrationsDir: './src/migrations',
  },
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  logging: 'all',
  logger: 'advanced-console',
};

export default process.env.NODE_ENV === 'development'
  ? dev_config
  : prod_config;
