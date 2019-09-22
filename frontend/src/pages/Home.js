import React from 'react';

import Page from '../components/Page';
import ScrapeData from '../components/Scrape/ScrapeData';

function Home() {
  return (
    <Page>
      <p>Welcome to Node.js Scraper</p>
      <ScrapeData />
    </Page>
  );
}

export default Home;