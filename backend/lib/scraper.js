import axios from 'axios';
import cheerio from 'cheerio';
import db from './db';

const BASE_URL = `https://auto.jofogas.hu/magyarorszag/auto`;
const car = {
  brand: 'skoda',
  model: 'superb',
  year: {
    from: 2017,
    to: 2017,
  },
};
const prices = [];

async function getHTML(url, params) {
  const { data: html } = await axios.get(url, { params });
  return html;
}

async function getCarDeals(html) {
  const $ = cheerio.load(html);
  const prices = $('.vehicle-item .price-value')
    .map(function() {
      return $(this).text();
    })
    .toArray();

  return prices;
}

async function getPageCount(html) {
  const $ = cheerio.load(html);

  const totalDeals = $(
    '.all-private-company-tabs .tab.active .badge-count',
  ).text();
  const dealsPerPage = $('.list-item').length;
  const pageCount = Math.ceil(Number(totalDeals) / dealsPerPage);

  return pageCount;
}

async function getAllPrices() {
  // Get initial html and pageCount
  const html = await getHTML(`${BASE_URL}/${car.brand}/${car.model}`);
  const pageCount = await getPageCount(html);

  // Get all prices for each page
  for (let currentPage = 1; currentPage <= pageCount; currentPage++) {
    const params = {
      o: currentPage,
      re: car.year.from,
      rs: car.year.to,
    };
    const currentPageHtml = await getHTML(
      `${BASE_URL}/${car.brand}/${car.model}`,
      params,
    );
    const currentPagePrices = await getCarDeals(currentPageHtml);

    prices.push(currentPagePrices);
  }

  // Return flattened prices array
  return [].concat.apply([], prices);
}

async function runCron() {
  const prices = await getAllPrices();
  db.get('data')
    .push({
      date: Date.now(),
      prices,
    })
    .write();
  console.log('Done!');
}

export { getHTML, getAllPrices, runCron };
