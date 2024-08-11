"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CommitController_1 = __importDefault(require("../../controller/commit/CommitController"));
const router = (0, express_1.Router)();
router.get('/repos/:username', CommitController_1.default.getRepos);
router.get('/top-commit-authors', CommitController_1.default.getTopCommitAuthors);
router.get('/commits/:repoName', CommitController_1.default.getCommitsByRepoName);
exports.default = router;
