import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
// import UserRoutes from './routes/UserRoutes';
import RepoRoutes from './routes/RepoRoutes';

const app = express();


app.use(express.json());

// app.use('/api', UserRoutes);
app.use('/api', RepoRoutes);

AppDataSource.initialize().then(() => {
  app.listen(6009, () => {
    console.log('Server is running on http://localhost:6009');
  });
}).catch(error => console.log(error));

