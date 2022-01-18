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
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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
