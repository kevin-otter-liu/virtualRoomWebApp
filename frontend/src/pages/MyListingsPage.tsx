import './MyListingsPage.css';

import ax from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { ListingData } from '../types/data/ListingData';
import ListingsContainer from '../components/displays/ListingsContainer';
import NavigationBar from '../components/displays/NavigationBar';

const axios = ax.create({
  baseURL: import.meta.env.VITE_API_HOST,
});

const MyListingsPage = () => {
  const [listings, setListings] = useState<ListingData[]>([]);

  useEffect(() => {
    getListings();
  }, []);

  const getListings = useCallback(() => {
    // fetch request
    const send_req = async () => {
      let res = await axios.get(`/api/listing`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      setListings(res.data as ListingData[]);
    };
    return send_req();
  }, []);

  return (
    <div className='page'>
      <NavigationBar />
      <div className='my-listings-title'>
        <h2>My Listings</h2>
      </div>
      <ListingsContainer listings={listings} />
    </div>
  );
};

export default MyListingsPage;
