"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
// import UserRoutes from './routes/UserRoutes';
const RepoRoutes_1 = __importDefault(require("./routes/RepoRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use('/api', UserRoutes);
app.use('/api', RepoRoutes_1.default);
data_source_1.AppDataSource.initialize().then(() => {
    app.listen(6009, () => {
        console.log('Server is running on http://localhost:6009');
    });
}).catch(error => console.log(error));
