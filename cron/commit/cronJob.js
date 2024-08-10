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
const node_cron_1 = __importDefault(require("node-cron"));
class CronJobService {
    constructor() {
        this.scheduleJobs();
    }
    // Method to fetch the item
    fetchItem() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const response = await axios.get('https://api.example.com/items');
                // const item = response.data;
                console.log('Fetched item:');
            }
            catch (error) {
                console.error('Error fetching item:', error);
            }
        });
    }
    scheduleJobs() {
        node_cron_1.default.schedule('0 * * * *', () => __awaiter(this, void 0, void 0, function* () {
            console.log('Running cron job: Fetch item every hour');
            yield this.fetchItem();
        }));
        console.log('Cron job scheduled: Fetch item every hour');
    }
}
new CronJobService();
