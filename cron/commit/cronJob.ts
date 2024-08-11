// 

import cron from 'node-cron';
// import { CommitService } from '../../src/service/commit/CommitService';
import { RepoService } from '../../src/service/repo/RepoService';
import { AppDataSource } from '../../src/data-source';
import { Commit } from '../../src/entity/commit/Commit';
import dotenv from 'dotenv';


dotenv.config();

const username : string = process.env.GITHUB_USERNAME || 'chromium';

const repoService = new RepoService(
   username ,
  'reponame',//will be set dynamically from RepoServiceMethod
  AppDataSource.getRepository(Commit)
);


// Schedule the cron job to run every hour
cron.schedule('0 * * * *', async () => {

  console.log('Running cron job: Checking for commits from the last hour');
  
  try {
  
    const commitRepository = AppDataSource.getRepository(Commit);

    const allCommits = await commitRepository.find();
   
    console.log('got here')

    for (const commit of allCommits) {

      console.log(`Checking new commits for repository: ${commit.repoName}`);

      repoService.setRepoName(commit.repoName);

      await repoService.checkAndSaveCommitsFromLastHour();
    }

  } catch (error) {

    console.error('Error occurred during cron job execution:', error);

  }

});

console.log('Cron job scheduled: Checking for commits from the last hour every hour');
