import { EntityRepository, Repository } from 'typeorm';
import { Repo } from '../entity/Repo';

@EntityRepository(Repo)
export class RepoRepository extends Repository<Repo> {}