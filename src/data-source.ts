import { DataSource } from 'typeorm';
import { Repo } from './entity/Repo';

export const AppDataSource = new DataSource({

  type:'mysql',
  host:'127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'ola12345',
  database: 'github_db',
  entities: [ Repo ],
  
  // entities: ["src/entity/**/*.ts"],
  // entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  synchronize: true,
  logging: false,
  
});


