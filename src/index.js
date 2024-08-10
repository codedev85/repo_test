"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const CommitRoutes_1 = __importDefault(require("./routes/commit/CommitRoutes"));
require("../cron/commit/cronJob");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', CommitRoutes_1.default);
data_source_1.AppDataSource.initialize().then(() => {
    app.listen(Number(process.env.APP_PORT), () => {
        console.log(`Server is running on http://localhost:${Number(process.env.APP_PORT)}`);
    });
}).catch(error => console.log(error));
