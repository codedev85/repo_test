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
exports.RepoService = void 0;
class RepoService {
    constructor(repoRepository) {
        this.repoRepository = repoRepository;
    }
    saveCommit(repoName, commitMessage, commitAuthor, commitDate, commitUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const commit = this.repoRepository.create({
                repoName,
                commitMessage,
                commitAuthor,
                commitDate,
                commitUrl,
            });
            return yield this.repoRepository.save(commit);
        });
    }
}
exports.RepoService = RepoService;
