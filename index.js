import { getHTML, getCarDeals, getPageCount } from './lib/scraper';

const BASE_URL = `https://auto.jofogas.hu/magyarorszag/auto`;
const car = {
  brand: 'skoda',
  model: 'superb',
};

let prices = [];

function flattenPrices() {
  return (prices = [].concat.apply([], prices));
}

async function getAllPrices() {
  // Get initial html and pageCount
  const html = await getHTML(`${BASE_URL}/${car.brand}/${car.model}`);
  const pageCount = await getPageCount(html);

  // Get all prices for each page
  for (let currentPage = 1; currentPage <= pageCount; currentPage++) {
    const params = {
      o: currentPage,
    };
    const currentPageHtml = await getHTML(
      `${BASE_URL}/${car.brand}/${car.model}`,
      params,
    );
    const currentPagePrices = await getCarDeals(currentPageHtml);

    prices.push(currentPagePrices);
  }

  flattenPrices();
}

async function go() {
  await getAllPrices();
}

go();
