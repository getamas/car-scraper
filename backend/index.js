import express from 'express';
import cors from 'cors';

import db from './lib/db';
import { getAllPrices } from './lib/scraper';
import './lib/cron';

const app = express();
const port = 8996;
app.use(cors());

app.get('/scrape', async (req, res, next) => {
  const prices = await getAllPrices();
  res.json({ prices });
});

app.get('/data', async (req, res, next) => {
  const prices = db.get('data').value();
  res.json(prices);
});

app.listen(port, () => console.log(`Example App running on port ${port}`));
