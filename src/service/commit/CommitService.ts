// import { Repository } from 'typeorm';
// import { Repo } from '../../entity/Repo';

// export class RepoService {
//   constructor(private repoRepository: Repository<Repo>) {}

//   async saveCommit(
//     repoName: string,
//     commitMessage: string,
//     commitAuthor: string,
//     commitDate: Date,
//     commitUrl: string
//   ): Promise<Repo> {
//     const commit = this.repoRepository.create({
//       repoName,
//       commitMessage,
//       commitAuthor,
//       commitDate,
//       commitUrl,
//     });

//     return await this.repoRepository.save(commit);
//   }
// }


import { Repository } from 'typeorm';
import { Commit } from '../../entity/commit/Commit';

export class CommitService {
  private commitRepository: Repository<Commit>;

  constructor(commitRepository: Repository<Commit>) {
    this.commitRepository = commitRepository;
  }

  /**
   * Save a single commit to the database.
   * @param repoName - The name of the repository.
   * @param commitMessage - The commit message.
   * @param commitAuthor - The author of the commit.
   * @param commitDate - The date of the commit.
   * @param commitUrl - The URL of the commit.
   */
  async saveCommit(
    repoName: string,
    commitMessage: string,
    commitAuthor: string,
    commitDate: Date,
    commitUrl: string
  ): Promise<Commit> {
    const commitValue = this.commitRepository.create({
      repoName,
      commitMessage,
      commitAuthor,
      commitDate,
      commitUrl,
    });

    return await this.commitRepository.save(commitValue);
  }

  /**
   * Save multiple commits to the database in a single batch operation.
   * This method is not currently used, but can be handy for batch inserts.
   * @param commits - An array of commit objects to be saved.
   */
  async saveCommitsBatch(commits: Partial<Commit>[]): Promise<Commit[]> {
    const commitEntities = this.commitRepository.create(commits);
    return await this.commitRepository.save(commitEntities);
  }
}
