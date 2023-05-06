import { Fragment, useState } from 'react';
import SearchBar from '../components/displays/SearchBar';
import ax from 'axios';
import { ListingData } from '../types/data/ListingData';
import ListingsContainer from '../components/displays/ListingsContainer';
import NavigationBar from '../components/displays/NavigationBar';

import './SearchListingPage.css';

const axios = ax.create({
  baseURL: import.meta.env.VITE_API_HOST,
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
    <div className='search-page'>
      <NavigationBar />
      <SearchBar onSearch={onSearch} />
      <ListingsContainer isCompany={false} listings={listings} />
    </div>
  );
};

export default SearchListingPage;
