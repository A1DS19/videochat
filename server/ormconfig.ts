import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['./dist/src/**/*.entity.js'],
  migrations: ['./dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: './src/migrations',
  },
  synchronize: true,
};

export default config;
