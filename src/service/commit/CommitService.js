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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommitService = void 0;
const Repo_1 = require("../../entity/repo/Repo");
class CommitService {
    constructor(commitRepository, repoRepository) {
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
    saveCommit(repoName, commitMessage, commitAuthor, commitDate, commitUrl, repoDescription, repoLanguage, repoUrl, forksCount, starsCount, openIssueCount, watchersCount) {
        return __awaiter(this, void 0, void 0, function* () {
            const commitValue = this.commitRepository.create({
                repoName,
                commitMessage,
                commitAuthor,
                commitDate,
                commitUrl,
            });
            const savedCommit = yield this.commitRepository.save(commitValue);
            const newRepo = new Repo_1.Repo();
            newRepo.commit = savedCommit;
            newRepo.repoName = repoName;
            newRepo.repoDescription = repoDescription;
            newRepo.repoUrl = repoUrl;
            newRepo.repoLanguage = repoLanguage;
            newRepo.repoForksCount = forksCount;
            newRepo.repoStarsCount = starsCount;
            newRepo.repoOpenIssueCount = openIssueCount;
            newRepo.repoWatchersCount = watchersCount;
            yield this.repoRepository.save(newRepo);
            return savedCommit;
        });
    }
    /**
     * Save multiple commits to the database in a single batch operation.
     * This method is not currently used, but can be handy for batch inserts.
     * @param commits - An array of commit objects to be saved.
     */
    saveCommitsBatch(commits) {
        return __awaiter(this, void 0, void 0, function* () {
            const commitEntities = this.commitRepository.create(commits);
            return yield this.commitRepository.save(commitEntities);
        });
    }
    getTopCommitAuthors(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const topAuthors = yield this.commitRepository
                .createQueryBuilder('commit')
                .select('commit.commitAuthor', 'commitAuthor')
                .addSelect('COUNT(commit.commitAuthor)', 'commitCount')
                .groupBy('commit.commitAuthor')
                .orderBy('commitCount', 'DESC')
                .limit(limit)
                .getRawMany();
            return topAuthors;
        });
    }
    /**
    *
    * @param repoName
    * @returns
    */
    getCommitsByRepoName(repoName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commitRepository.find({ where: { repoName } });
        });
    }
}
exports.CommitService = CommitService;
