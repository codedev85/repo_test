"use strict";
// import { Repository } from 'typeorm';
// import { Repo } from '../../entity/Repo';
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
class CommitService {
    constructor(commitRepository) {
        this.commitRepository = commitRepository;
    }
    /**
     * Save a single commit to the database.
     * @param repoName - The name of the repository.
     * @param commitMessage - The commit message.
     * @param commitAuthor - The author of the commit.
     * @param commitDate - The date of the commit.
     * @param commitUrl - The URL of the commit.
     */
    saveCommit(repoName, commitMessage, commitAuthor, commitDate, commitUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const commitValue = this.commitRepository.create({
                repoName,
                commitMessage,
                commitAuthor,
                commitDate,
                commitUrl,
            });
            return yield this.commitRepository.save(commitValue);
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
}
exports.CommitService = CommitService;
