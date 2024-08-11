import { Request, Response } from 'express';
import CommitController from '../commit/CommitController';
import { CommitService } from '../../service/commit/CommitService';
import { Commit } from '../../entity/commit/Commit';
import {Repo} from '../../entity/repo/Repo';
import { Repository } from 'typeorm';
import axios from 'axios';

// Mock CommitService and Axios
jest.mock('../../service/commit/CommitService');
jest.mock('axios');

// Test Suite
describe('CommitController', () => {
  let commitService: jest.Mocked<CommitService>;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;

  beforeEach(() => {
    // Create mock repositories
    const mockCommitRepository = {} as jest.Mocked<Repository<Commit>>;
    const mockRepoRepository = {} as jest.Mocked<Repository<Repo>>;

    // Instantiate the service with mock repositories
    commitService = new CommitService(mockCommitRepository, mockRepoRepository) as jest.Mocked<CommitService>;

    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    statusMock = res.status as jest.Mock;


 
    jest.spyOn(commitService, 'getTopCommitAuthors').mockResolvedValue([
      { commitAuthor: 'John Doe', commitCount: 10 },
      { commitAuthor: 'Jane Smith', commitCount: 7 },
    ]);

    jest.spyOn(commitService, 'getCommitsByRepoName').mockResolvedValue([
      {
        id: 1,
        repoName: 'TestRepo',
        commitMessage: 'Initial commit',
        commitAuthor: 'John Doe',
        commitDate: new Date(),
        commitUrl: 'http://example.com',
        created_at: new Date(),
        updated_at: new Date(),
      } as Commit,
    ]);

    // Bind the mocked service to the controller
   (CommitController as any).commitService = commitService;

  });

  describe('getTopCommitAuthors', () => {

   it('should return the top commit authors', async () => {

     req.query = { limit: '2' };


     await CommitController.getTopCommitAuthors(req as Request, res as Response);
   
     expect(statusMock).toHaveBeenCalledWith(200);
     expect(res.json).toHaveBeenCalledWith([
       { commitAuthor: 'John Doe', commitCount: 10 },
       { commitAuthor: 'Jane Smith', commitCount: 7 },
     ]);
   });

   it('should handle errors correctly', async () => {
    
     jest.spyOn(commitService, 'getTopCommitAuthors').mockRejectedValue(new Error('Something went wrong'));

     req.query = { limit: '2' };

     // Act
     await CommitController.getTopCommitAuthors(req as Request, res as Response);

     // Assert
     expect(statusMock).toHaveBeenCalledWith(500);
     expect(res.json).toHaveBeenCalledWith({ message: 'Something went wrong' });
   });
 });

 describe('getCommitsByRepoName', () => {

   it('should return commits for a repository', async () => {
   
     const mockCommits: Partial<Commit>[] = [
       {
         id: 1,
         repoName: 'my-repo',
         commitMessage: 'Initial commit',
         commitAuthor: 'John Doe',
         commitDate: new Date(),
         commitUrl: 'https://github.com/my-repo/commit/1',
         created_at: new Date(),
         updated_at: new Date(),
       },
       {
         id: 2,
         repoName: 'my-repo',
         commitMessage: 'Added new feature',
         commitAuthor: 'Jane Smith',
         commitDate: new Date(),
         commitUrl: 'https://github.com/my-repo/commit/2',
         created_at: new Date(),
         updated_at: new Date(),
       },
     ];
     commitService.getCommitsByRepoName.mockResolvedValue(mockCommits as Commit[]);

     req.params = { repoName: 'my-repo' };

     
     await CommitController.getCommitsByRepoName(req as Request, res as Response);

     
     expect(statusMock).toHaveBeenCalledWith(200);
     expect(res.json).toHaveBeenCalledWith(mockCommits);
   });

   it('should return 404 if no commits are found', async () => {
    
     commitService.getCommitsByRepoName.mockResolvedValue([]);

     req.params = { repoName: 'unknown-repo' };

    
     await CommitController.getCommitsByRepoName(req as Request, res as Response);

     expect(statusMock).toHaveBeenCalledWith(404);

     expect(res.json).toHaveBeenCalledWith({ message: 'No commits found for repository: unknown-repo' });

   });

   it('should handle errors correctly', async () => {
     
     commitService.getCommitsByRepoName.mockRejectedValue(new Error('Something went wrong'));

     req.params = { repoName: 'my-repo' };

   
     await CommitController.getCommitsByRepoName(req as Request, res as Response);

    
     expect(statusMock).toHaveBeenCalledWith(500);

     expect(res.json).toHaveBeenCalledWith({ message: 'Something went wrong' });
   });
 });


});

