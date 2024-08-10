import { EntityRepository, Repository } from 'typeorm';
import { Commit } from '../../entity/commit/Commit';

@EntityRepository(Commit)
export class CommitRepository extends Repository<Commit> {}