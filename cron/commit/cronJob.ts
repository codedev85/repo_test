import cron from 'node-cron';
import axios from 'axios';

class CronJobService {
  constructor() {
    this.scheduleJobs();
  }

  // Method to fetch the item
  async fetchItem(): Promise<void> {
    try {
      // const response = await axios.get('https://api.example.com/items');
      // const item = response.data;
      console.log('Fetched item:');


    } catch (error) {
      console.error('Error fetching item:', error);
    }
  }
  scheduleJobs(): void {
    cron.schedule('0 * * * *', async () => {
      console.log('Running cron job: Fetch item every hour');
      await this.fetchItem();
    });

    console.log('Cron job scheduled: Fetch item every hour');
  }
}


new CronJobService();
