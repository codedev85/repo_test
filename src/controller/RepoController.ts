import { Request, Response } from 'express';
import { RepoService } from '../service/repo/RepoService';
import { AppDataSource } from '../data-source';
import { Repo } from '../entity/Repo';
import { QueryRunner } from 'typeorm';
import axios from 'axios';

class RepoController {
   

  private repoService: RepoService;

  constructor() {
    this.repoService = new RepoService(AppDataSource.getRepository(Repo));
    this.getRepos = this.getRepos.bind(this); 
  }



async getRepos(req: Request, res: Response): Promise<Response> {

  // const queryRunner = AppDataSource.createQueryRunner();
  // const queryRunner: QueryRunner = AppDataSource.createQueryRunner();

  // await queryRunner.connect();

  try {

      const { username } = req.params;
      let { startDate, endDate } = req.query;

  
      const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so +1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      // If startDate or endDate is missing, assign default values
      if (!startDate) {
        const currentDate = new Date();
        startDate = formatDate(currentDate);
      }

      if (!endDate) {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 3); 
        endDate = formatDate(currentDate);
      }

    // Start a transaction
    // await queryRunner.startTransaction();


    // Fetch all public repositories for the user
    const repoResponse = await axios.get(`https://api.github.com/users/${username}/repos`);

    const repos = repoResponse.data;

  
    for (const repo of repos) {

      const repoName = repo.name;
     
      // Fetch commits for each repository
      const commitResponse = await axios.get(`https://api.github.com/repos/${username}/${repoName}/commits`, {
                                params: {
                                  since: startDate,
                                  until: endDate,
                                },
                              });

      const commits = commitResponse.data;

     
      //  if(commits.length === 0) {
      //     await queryRunner.rollbackTransaction();
      //     return res.status(200).json({ message: 'No data' });
      //  }

     

      // Prepare batch insert data
      // const commitEntities = commits.map((commit: any) => {
      //   const commitMessage = commit.commit.message;
      //   const commitAuthor = commit.commit.author.name;
      //   const commitDate = new Date(commit.commit.author.date);
      //   const commitUrl = commit.html_url;

      //   return {
      //     repoName,
      //     commitMessage,
      //     commitAuthor,
      //     commitDate,
      //     commitUrl,
      //   };
      // });

      // // Batch insert commits
      // await this.repoService.saveCommitsBatch(commitEntities, queryRunner);

      for (const commit of commits) {
        const commitMessage = commit.commit.message;
        const commitAuthor = commit.commit.author.name;
        const commitDate = new Date(commit.commit.author.date);
        const commitUrl = commit.html_url; 

        // Persist the commit details to the database
        await this.repoService.saveCommit(repoName, commitMessage, commitAuthor, commitDate ,commitUrl);
      }
    }

    // Commit transaction
    // await queryRunner.commitTransaction();

    return res.status(200).json({ message: 'Commits have been saved to the database' });

  } catch (error) {

    //  if (queryRunner.isTransactionActive) {
    //        await queryRunner.rollbackTransaction();
    //   }

    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(400).json({ message: 'Unknown Error' });
    }

  } finally {
    
      // await queryRunner.release();
  }

}

 
}

export default new RepoController();
