import {
  Avatar,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { Fragment, Suspense, useCallback, useEffect, useState } from 'react';
import ax from 'axios';
import ListingProp from '../../types/displays/ListingProp';
import './Listing.css';
import ListingBuildingCanvas from '../canvas-objects/ListingBuildingCanvas';

const axios = ax.create({
  baseURL: 'http://' + import.meta.env.VITE_API_HOST,
});

const Listing: React.FC<ListingProp> = (listingProp) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('#');
  const [showBuildingCanvas, setShowBuildingCanvas] = useState<boolean>(false);
  const [fbxUrl, setFbxUrl] = useState<string | null>(null);

  useEffect(() => {
    getThumbnail(listingProp.listing.id);
  }, [listingProp.listing.id]);

  // request to get thumbnail images of listing
  const getThumbnail = useCallback((id: string) => {
    // fetch request
    const send_req = async () => {
      let res = await axios.get(
        `/api/listing/thumbnail-image?listing_id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      setThumbnailUrl(res.data.url);
    };
    return send_req();
  }, []);

  // request to get thumbnail images of listing
  const getFbxUrl = useCallback((id: string) => {
    // fetch request
    const send_req = async () => {
      let res = await axios.get(`/api/listing/fbx?listing_id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setFbxUrl(res.data.url);
    };
    return send_req();
  }, []);

  const onBuildingCanvasClose = () => {
    setShowBuildingCanvas(false);
  };

  // on view listing button click
  const onViewListingButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async (e) => {
    await getFbxUrl(listingProp.listing.id);
    setShowBuildingCanvas(true);
  };

  return (
    <Fragment>
      {showBuildingCanvas && fbxUrl && (
        <ListingBuildingCanvas
          onClose={onBuildingCanvasClose}
          rawBuildingDataUrl={fbxUrl}
        />
      )}
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={listingProp.listing.name} src='#' />
        </ListItemAvatar>
        <img className='listing-img' src={thumbnailUrl} />
        <ListItemText
          style={{ paddingRight: '10px' }}
          primary={listingProp.listing.name}
          secondary={
            <div>
              <Typography
                component='div'
                variant='caption'
                color='text.primary'>
                Developer: {listingProp.listing.developer}
              </Typography>
              <Typography
                component='div'
                variant='caption'
                color='text.primary'>
                Location: {listingProp.listing.location}
              </Typography>
              <Typography component='div' variant='body1' color='text.primary'>
                Description: {listingProp.listing.description}
              </Typography>
              <Typography
                component='div'
                variant='overline'
                color='text.primary'>
                posted on: {listingProp.listing.createdAt}
              </Typography>
            </div>
          }
        />
        <Button onClick={onViewListingButtonClick} variant='outlined'>
          View Listing {`>`}{' '}
        </Button>
      </ListItem>
      <Divider variant='inset' component='li' />
    </Fragment>
  );
};

export default Listing;
