import express from 'express';
import db from './lib/db';
import { getAllPrices } from './lib/scraper';
import './lib/cron';

const app = express();
const port = 8996;

app.get('/scrape', async (req, res, ext) => {
  const prices = await getAllPrices();
  res.json({ prices });
});

app.listen(port, () => console.log(`Example App running on port ${port}`));
