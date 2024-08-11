import { Repository } from 'typeorm';
import { Commit } from '../../entity/commit/Commit';
import {Repo} from '../../entity/repo/Repo';

export class CommitService {
  private commitRepository: Repository<Commit>;
  private repoRepository: Repository<Repo>;
 

  constructor(commitRepository: Repository<Commit>,  repoRepository: Repository<Repo>) {
    this.commitRepository = commitRepository;
    this.repoRepository = repoRepository;
  }

  

    /**
   * 
   * @param repoName 
   * @param commitMessage 
   * @param commitAuthor 
   * @param commitDate 
   * @param commitUrl 
   * @param repoDescription 
   * @param repoLanguage 
   * @param repoUrl 
   * @param forksCount 
   * @param starsCount 
   * @param openIssueCount 
   * @param watchersCount 
   */
  async saveCommit(
    repoName: string,
    commitMessage: string,
    commitAuthor: string,
    commitDate: Date,
    commitUrl: string,
    repoDescription : string | null,
    repoLanguage : string ,
    repoUrl: string ,
    forksCount: Number,
    starsCount : Number,
    openIssueCount : Number,
    watchersCount : Number
  ): Promise<Commit> {
    const commitValue = this.commitRepository.create({
      repoName,
      commitMessage,
      commitAuthor,
      commitDate,
      commitUrl,
    });

      const savedCommit = await this.commitRepository.save(commitValue);
    

      const newRepo = new Repo();
      newRepo.commit = savedCommit; 
      newRepo.repoName = repoName;
      newRepo.repoDescription = repoDescription;
      newRepo.repoUrl = repoUrl;
      newRepo.repoLanguage = repoLanguage;
      newRepo.repoForksCount = forksCount;
      newRepo.repoStarsCount = starsCount;
      newRepo.repoOpenIssueCount = openIssueCount;
      newRepo.repoWatchersCount = watchersCount;
      await this.repoRepository.save(newRepo);
  
      return savedCommit;
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

  async getTopCommitAuthors(limit: number): Promise<{ commitAuthor: string; commitCount: number }[]> {
    const topAuthors = await this.commitRepository
      .createQueryBuilder('commit')
      .select('commit.commitAuthor', 'commitAuthor')
      .addSelect('COUNT(commit.commitAuthor)', 'commitCount')
      .groupBy('commit.commitAuthor')
      .orderBy('commitCount', 'DESC')
      .limit(limit)
      .getRawMany();

    return topAuthors;
  }

   /**
   * 
   * @param repoName 
   * @returns 
   */
   async getCommitsByRepoName(repoName: string): Promise<Commit[]> {
    return await this.commitRepository.find({ where: { repoName } });
  }
}
