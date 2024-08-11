"use strict";
// 
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
const node_cron_1 = __importDefault(require("node-cron"));
// import { CommitService } from '../../src/service/commit/CommitService';
const RepoService_1 = require("../../src/service/repo/RepoService");
const data_source_1 = require("../../src/data-source");
const Commit_1 = require("../../src/entity/commit/Commit");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const username = process.env.GITHUB_USERNAME || 'chromium';
const repoService = new RepoService_1.RepoService(username, 'reponame', //will be set dynamically from RepoServiceMethod
data_source_1.AppDataSource.getRepository(Commit_1.Commit));
// Schedule the cron job to run every hour
node_cron_1.default.schedule('0 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Running cron job: Checking for commits from the last hour');
    try {
        const commitRepository = data_source_1.AppDataSource.getRepository(Commit_1.Commit);
        const allCommits = yield commitRepository.find();
        console.log('got here');
        for (const commit of allCommits) {
            console.log(`Checking new commits for repository: ${commit.repoName}`);
            repoService.setRepoName(commit.repoName);
            yield repoService.checkAndSaveCommitsFromLastHour();
        }
    }
    catch (error) {
        console.error('Error occurred during cron job execution:', error);
    }
}));
console.log('Cron job scheduled: Checking for commits from the last hour every hour');
