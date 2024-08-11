import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import CommitRoutes from './routes/commit/CommitRoutes';

import '../cron/commit/cronJob';

import dotenv from 'dotenv';


dotenv.config();


const app = express();


app.use(express.json());


app.use('/api', CommitRoutes);

AppDataSource.initialize().then(() => {
  app.listen(Number(process.env.APP_PORT || 3000), () => {
    console.log(`Server is running on http://localhost:${Number(process.env.APP_PORT || 3000)}`);
  });
}).catch(error => console.log(error));

