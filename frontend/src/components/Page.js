import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { ScrapeProvider } from './Scrape/ScrapeContext';

function useScrapes() {
  const [scrapes, setScrapes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:8996/data`

      const { data } = await axios.get(url)
      setScrapes(data);
    }

    fetchData();
  }, [])

  return scrapes;
}

function Page({ children }) {
  const scrapes = useScrapes();
  return (
    <ScrapeProvider value={{scrapes}}>
      <div className="page-container">
        {children}
      </div>
    </ScrapeProvider>
  )
}

export default Page;