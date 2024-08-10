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
const CommitService_1 = require("../../service/commit/CommitService");
const data_source_1 = require("../../data-source");
const Commit_1 = require("../../entity/commit/Commit");
const axios_1 = __importDefault(require("axios"));
class CommitController {
    constructor() {
        this.commitService = new CommitService_1.CommitService(data_source_1.AppDataSource.getRepository(Commit_1.Commit));
        this.getRepos = this.getRepos.bind(this);
    }
    getRepos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.params;
                let { startDate, endDate } = req.query;
                const formatDate = (date) => {
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
                const repoResponse = yield axios_1.default.get(`https://api.github.com/users/${username}/repos`);
                const repos = repoResponse.data;
                if (repos.length === 0) {
                    return res.status(404).json({ message: `No public repos found for this period ${startDate} & ${endDate}` });
                }
                for (const repo of repos) {
                    const repoName = repo.name;
                    // Fetch commits for each repository
                    const commitResponse = yield axios_1.default.get(`https://api.github.com/repos/${username}/${repoName}/commits`, {
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
                    const commitPromises = commits.map((commit) => {
                        const commitMessage = commit.commit.message;
                        const commitAuthor = commit.commit.author.name;
                        const commitDate = new Date(commit.commit.author.date);
                        const commitUrl = commit.html_url;
                        return this.commitService.saveCommit(repoName, commitMessage, commitAuthor, commitDate, commitUrl);
                    });
                    yield Promise.all(commitPromises);
                }
                return res.status(200).json({ message: 'Commits have been saved to the database' });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({ message: error.message });
                }
                else {
                    return res.status(400).json({ message: 'Unknown Error' });
                }
            }
            finally {
            }
        });
    }
}
exports.default = new CommitController();
