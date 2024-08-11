"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommitController_1 = __importDefault(require("../commit/CommitController"));
const CommitService_1 = require("../../service/commit/CommitService");
// Mock CommitService and Axios
jest.mock('../../service/commit/CommitService');
jest.mock('axios');
// Test Suite
describe('CommitController', () => {
    let commitService;
    let req;
    let res;
    let statusMock;
    beforeEach(() => {
        // Create mock repositories
        const mockCommitRepository = {};
        const mockRepoRepository = {};
        // Instantiate the service with mock repositories
        commitService = new CommitService_1.CommitService(mockCommitRepository, mockRepoRepository);
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        statusMock = res.status;
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
            },
        ]);
        // Bind the mocked service to the controller
        CommitController_1.default.commitService = commitService;
    });
    describe('getTopCommitAuthors', () => {
        it('should return the top commit authors', () => __awaiter(void 0, void 0, void 0, function* () {
            req.query = { limit: '2' };
            yield CommitController_1.default.getTopCommitAuthors(req, res);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([
                { commitAuthor: 'John Doe', commitCount: 10 },
                { commitAuthor: 'Jane Smith', commitCount: 7 },
            ]);
        }));
        it('should handle errors correctly', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(commitService, 'getTopCommitAuthors').mockRejectedValue(new Error('Something went wrong'));
            req.query = { limit: '2' };
            // Act
            yield CommitController_1.default.getTopCommitAuthors(req, res);
            // Assert
            expect(statusMock).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Something went wrong' });
        }));
    });
    describe('getCommitsByRepoName', () => {
        it('should return commits for a repository', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCommits = [
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
            commitService.getCommitsByRepoName.mockResolvedValue(mockCommits);
            req.params = { repoName: 'my-repo' };
            yield CommitController_1.default.getCommitsByRepoName(req, res);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCommits);
        }));
        it('should return 404 if no commits are found', () => __awaiter(void 0, void 0, void 0, function* () {
            commitService.getCommitsByRepoName.mockResolvedValue([]);
            req.params = { repoName: 'unknown-repo' };
            yield CommitController_1.default.getCommitsByRepoName(req, res);
            expect(statusMock).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'No commits found for repository: unknown-repo' });
        }));
        it('should handle errors correctly', () => __awaiter(void 0, void 0, void 0, function* () {
            commitService.getCommitsByRepoName.mockRejectedValue(new Error('Something went wrong'));
            req.params = { repoName: 'my-repo' };
            yield CommitController_1.default.getCommitsByRepoName(req, res);
            expect(statusMock).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Something went wrong' });
        }));
    });
});
