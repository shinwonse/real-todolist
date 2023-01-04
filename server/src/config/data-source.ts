import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { join } from 'path';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './env';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: Number(DB_PORT),
  synchronize: true,
  logging: false,
  entities: [join(__dirname, '../entities/*.entity{.ts,.js}')],
  migrations: [],
  subscribers: [],
});
