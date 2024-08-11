import { Router } from 'express';
import CommitController from '../../controller/commit/CommitController';

const router = Router();

router.get('/repos/:username', CommitController.getRepos);
router.get('/top-commit-authors', CommitController.getTopCommitAuthors);
router.get('/commits/:repoName', CommitController.getCommitsByRepoName);


export default router;