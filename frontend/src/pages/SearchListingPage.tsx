import { Fragment, useState } from 'react';
import SearchBar from '../components/displays/SearchBar';
import ax, { AxiosResponse } from 'axios';
import { ListingData } from '../types/data/ListingData';
import Listing from '../components/displays/Listing';
import ListingsContainer from '../components/displays/ListingsContainer';
import NavigationBar from '../components/displays/NavigationBar';

const axios = ax.create({
  baseURL: 'http://' + import.meta.env.VITE_API_HOST,
});

const options = ['option1', 'option2'];

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
      <SearchBar onSearch={onSearch} />
      <ListingsContainer listings={listings} />
    </Fragment>
  );
};

export default SearchListingPage;
