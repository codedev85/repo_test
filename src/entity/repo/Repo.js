"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repo = void 0;
const typeorm_1 = require("typeorm");
const Commit_1 = require("../commit/Commit");
let Repo = class Repo {
};
exports.Repo = Repo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], Repo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Commit_1.Commit, commit => commit.repos),
    __metadata("design:type", Commit_1.Commit)
], Repo.prototype, "commit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Repo.prototype, "repoName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Repo.prototype, "repoDescription", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Repo.prototype, "repoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Repo.prototype, "repoLanguage", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Repo.prototype, "repoForksCount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Repo.prototype, "repoStarsCount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Repo.prototype, "repoOpenIssueCount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Repo.prototype, "repoWatchersCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Repo.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Repo.prototype, "updated_at", void 0);
exports.Repo = Repo = __decorate([
    (0, typeorm_1.Entity)({ name: 'repositories' })
], Repo);
