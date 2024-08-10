import { DataSource } from 'typeorm';
import { Commit } from './entity/commit/Commit';

import dotenv from 'dotenv';


dotenv.config();

export const AppDataSource = new DataSource({

  type:'mysql',
  host:process.env.DB_HOST,
  port:Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_DATABASE,
  entities: [ Commit ],
  
  // entities: ["src/entity/**/*.ts"],
  // entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  synchronize: true,
  logging: false,
  
});


