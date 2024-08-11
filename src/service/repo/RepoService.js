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
exports.RepoService = void 0;
const axios_1 = __importDefault(require("axios"));
const Commit_1 = require("../../entity/commit/Commit");
class RepoService {
    constructor(username, repoName, commitRepository) {
        this.username = username;
        this.repoName = repoName;
        this.commitRepository = commitRepository;
    }
    setRepoName(repoName) {
        this.repoName = repoName;
    }
    fetchCommitsFromLastHour() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oneHourAgo = new Date();
                oneHourAgo.setHours(oneHourAgo.getHours() - 1);
                const isoDate = oneHourAgo.toISOString();
                const response = yield axios_1.default.get(`https://api.github.com/repos/${this.username}/${this.repoName}/commits`, {
                    params: {
                        since: isoDate,
                    },
                });
                return response.data;
            }
            catch (error) {
                console.error('Error fetching commits from the last hour:', error);
                return [];
            }
        });
    }
    checkAndSaveCommitsFromLastHour() {
        return __awaiter(this, void 0, void 0, function* () {
            const commits = yield this.fetchCommitsFromLastHour();
            if (commits.length === 0) {
                console.log('No commits found in the last hour');
                return;
            }
            const commitEntities = commits.map((commit) => {
                const commitEntity = new Commit_1.Commit();
                commitEntity.repoName = this.repoName;
                commitEntity.commitMessage = commit.commit.message;
                commitEntity.commitAuthor = commit.commit.author.name;
                commitEntity.commitDate = new Date(commit.commit.author.date);
                commitEntity.commitUrl = commit.html_url;
                return commitEntity;
            });
            yield this.commitRepository.save(commitEntities);
            console.log(`Saved ${commits.length} commit(s) to the database.`);
        });
    }
}
exports.RepoService = RepoService;
