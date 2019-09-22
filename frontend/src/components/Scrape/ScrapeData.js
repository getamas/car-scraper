import React, { useContext } from 'react';

import { ScrapeContext } from './ScrapeContext';

function ScrapeData() {
  const { scrapes } = useContext(ScrapeContext);
  return (
    <div>
      <h2>Your Data:</h2>
      <ul>
        {scrapes.map((scrape, index) => <li key={index}>{scrape.prices}</li>)}
      </ul>
    </div>
  );
}

export default ScrapeData;