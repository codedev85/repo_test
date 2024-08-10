import { Router } from 'express';
import RepoController from '../controller/RepoController';

const router = Router();

router.get('/repos/:username', RepoController.getRepos);


export default router;