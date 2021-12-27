import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
//import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

// const config: SqliteConnectionOptions = {
//   type: 'sqlite',
//   database: 'db.sqlite',
//   entities: ['./dist/src/**/*.entity.js'],
//   migrations: ['./dist/src/migrations/*.js'],
//   cli: {
//     migrationsDir: './src/migrations',
//   },
//   synchronize: true,
//   logging: 'all',
//   logger: 'advanced-console',
// };

const config: PostgresConnectionOptions = {
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
  synchronize: true,
  logging: 'all',
  logger: 'advanced-console',
};

export default config;
