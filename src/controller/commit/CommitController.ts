import { Request, Response } from 'express';
import { CommitService } from '../../service/commit/CommitService';
import { AppDataSource } from '../../data-source';
import { Commit } from '../../entity/commit/Commit';
import axios from 'axios';

class CommitController {
   

  private commitService: CommitService;

  constructor() {
    this.commitService = new CommitService(AppDataSource.getRepository(Commit));
    this.getRepos = this.getRepos.bind(this); 
  }



async getRepos(req: Request, res: Response): Promise<Response> {


  try {

      const { username } = req.params;
      let { startDate, endDate } = req.query;

  
      const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      if (!startDate) {
        const currentDate = new Date();
        startDate = formatDate(currentDate);
      }

      if (!endDate) {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 3); 
        endDate = formatDate(currentDate);
      }

    // Fetch all public repositories for the user
    const repoResponse = await axios.get(`https://api.github.com/users/${username}/repos`);

    const repos = repoResponse.data;

    if (repos.length === 0) {
      return res.status(404).json({ message: `No public repos found for this period ${startDate} & ${endDate}` });
    }

  
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

     
  
      // for (const commit of commits) {
      //   const commitMessage = commit.commit.message;
      //   const commitAuthor = commit.commit.author.name;
      //   const commitDate = new Date(commit.commit.author.date);
      //   const commitUrl = commit.html_url; 

      //   // Persist the commit details to the database
      //   await this.repoService.saveCommit(repoName, commitMessage, commitAuthor, commitDate ,commitUrl);
      // }

         // Persist each commit's details to the database
         const commitPromises = commits.map((commit: any) => {
          const commitMessage = commit.commit.message;
          const commitAuthor = commit.commit.author.name;
          const commitDate = new Date(commit.commit.author.date);
          const commitUrl = commit.html_url;

          return this.commitService.saveCommit(repoName, commitMessage, commitAuthor, commitDate, commitUrl);
        });

        await Promise.all(commitPromises); 
    }



    return res.status(200).json({ message: 'Commits have been saved to the database' });

  } catch (error) {

 

    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(400).json({ message: 'Unknown Error' });
    }

  } finally {
    
    
  }

}

 
}

export default new CommitController();
