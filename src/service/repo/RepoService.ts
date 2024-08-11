import axios from 'axios';
import { Repository } from 'typeorm';
import { Commit } from '../../entity/commit/Commit';

export class RepoService {

  private username: string;

  private repoName: string;

  private commitRepository: Repository<Commit>;

  constructor(username: string, repoName: string, commitRepository: Repository<Commit>) {

    this.username = username;
    this.repoName = repoName;
    this.commitRepository = commitRepository;

  }

  public setRepoName(repoName: string) {
    this.repoName = repoName;
  }

  async fetchCommitsFromLastHour(): Promise<any[]> {
    try {

       const oneHourAgo = new Date();

       oneHourAgo.setHours(oneHourAgo.getHours() - 1);

       const isoDate = oneHourAgo.toISOString();

       const response = await axios.get(
        `https://api.github.com/repos/${this.username}/${this.repoName}/commits`,
        {
          params: {
            since: isoDate,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching commits from the last hour:', error);
      return [];
    }
  }

  
  async checkAndSaveCommitsFromLastHour(): Promise<void> {
    
    const commits = await this.fetchCommitsFromLastHour();

    if (commits.length === 0) {
      console.log('No commits found in the last hour');
      return;
    }

    const commitEntities: Commit[] = commits.map((commit) => {
      const commitEntity = new Commit();
      commitEntity.repoName = this.repoName;
      commitEntity.commitMessage = commit.commit.message;
      commitEntity.commitAuthor = commit.commit.author.name;
      commitEntity.commitDate = new Date(commit.commit.author.date);
      commitEntity.commitUrl = commit.html_url;
      return commitEntity;
    });

    await this.commitRepository.save(commitEntities);

    console.log(`Saved ${commits.length} commit(s) to the database.`);
  }
}
