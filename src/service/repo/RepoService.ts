// import { Repository } from 'typeorm';
// import { Repo } from '../../entity/Repo';

// export class RepoService {

//    private githubRepository: Repository<Repo>;
 
//    constructor(githubRepository: Repository<Repo>) {
//      this.githubRepository = githubRepository;
//    }
 
//    async create(github: Partial<Repo>): Promise<Repo> {
//      const githubRepo = this.githubRepository.create(github);
//      return await this.githubRepository.save(githubRepo);
//    }
 
 
 
   
//  }

import { Repository } from 'typeorm';
import { Repo } from '../../entity/Repo';

export class RepoService {
  constructor(private repoRepository: Repository<Repo>) {}

  async saveCommit(
    repoName: string,
    commitMessage: string,
    commitAuthor: string,
    commitDate: Date,
    commitUrl: string
  ): Promise<Repo> {
    const commit = this.repoRepository.create({
      repoName,
      commitMessage,
      commitAuthor,
      commitDate,
      commitUrl,
    });

    return await this.repoRepository.save(commit);
  }
}
