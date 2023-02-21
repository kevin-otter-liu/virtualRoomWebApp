import './MyListingsPage.css';

import ax from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { ListingData } from '../types/data/ListingData';
import ListingsContainer from '../components/displays/ListingsContainer';
import { Typography } from '@mui/material';

const axios = ax.create({
  baseURL: 'http://' + import.meta.env.VITE_API_HOST,
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
      console.log(res.data);

      setListings(res.data as ListingData[]);
    };
    return send_req();
  }, []);

  return (
    <div>
      <Typography variant='h2'>Your Listings</Typography>
      <ListingsContainer listings={listings} />
    </div>
  );
};

export default MyListingsPage;
