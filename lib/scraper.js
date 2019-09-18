import axios from 'axios';
import cheerio from 'cheerio';

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

export { getHTML, getCarDeals, getPageCount };
