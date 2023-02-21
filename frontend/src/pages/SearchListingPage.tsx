import { Fragment, useState } from 'react';
import SearchBar from '../components/displays/SearchBar';
import ax from 'axios';
import { ListingData } from '../types/data/ListingData';
import ListingsContainer from '../components/displays/ListingsContainer';
import NavigationBar from '../components/displays/NavigationBar';

import './SearchListingPage.css';

const axios = ax.create({
  baseURL: 'http://' + import.meta.env.VITE_API_HOST,
});

const SearchListingPage = () => {
  const [listings, setListings] = useState<ListingData[]>([]);

  const onSearch = async (searchFactor: string) => {
    // fetch request
    let res = await axios.get(`/api/search?search_factors=${searchFactor}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    setListings(res.data as ListingData[]);
    // redirect
  };
  return (
    <Fragment>
      <NavigationBar />
      <div className='search-page'>
        <div className='search-results-container'>
          <SearchBar onSearch={onSearch} />
          <ListingsContainer listings={listings} />
        </div>
      </div>
    </Fragment>
  );
};

export default SearchListingPage;
