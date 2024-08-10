import { Router } from 'express';
import CommitController from '../../controller/commit/CommitController';

const router = Router();

router.get('/repos/:username', CommitController.getRepos);


export default router;