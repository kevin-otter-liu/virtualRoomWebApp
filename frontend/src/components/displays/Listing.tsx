import { Box, Button, Divider, ListItem, Typography } from '@mui/material';
import { Fragment, useCallback, useEffect, useState } from 'react';
import ax from 'axios';
import ListingProp from '../../types/displays/ListingProp';
import './Listing.css';
import ListingBuildingCanvas from '../canvas-objects/ListingBuildingCanvas';

const axios = ax.create({
  baseURL: import.meta.env.VITE_API_HOST,
});

const Listing: React.FC<ListingProp> = (listingProp) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('#');
  const [showBuildingCanvas, setShowBuildingCanvas] = useState<boolean>(false);
  const [fbxUrl, setFbxUrl] = useState<string | null>(null);
  const [isDeleted, setIsDeleted] = useState<Boolean>(false);

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

  const deleteListing = useCallback((id: string) => {
    // fetch request
    const send_req = async () => {
      let res = await axios.delete(
        `/api/listing/?listing_id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      return res
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

  const onDeleteListing: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    let res = await deleteListing(listingProp.listing.id);
    console.log(res)
    if (res.status === 200){
      setIsDeleted(true)
    }
  };

  const render = (): JSX.Element => {
    return (
      <ListItem
        style={{
          display: 'flex',
          backgroundColor: 'lightblue',
          borderRadius: '10px',
          boxShadow: '5px 10px',
          marginBottom: '20px',
          border: '5px dashed white',
        }}>
        <img className='listing-img' src={thumbnailUrl} />
        <div className='listing-description-wrapper'>
          <div>
            <Typography variant='h4'>{listingProp.listing.name}</Typography>
            <Typography variant='body1'>
              Developer: {listingProp.listing.developer_name}
            </Typography>
            <Typography>Location: {listingProp.listing.location}</Typography>
            <Typography>
              Project completion date:{' '}
              {new Date(
                listingProp.listing.completion_date
              ).toLocaleDateString()}
            </Typography>
          </div>

          <Box
            component='div'
            sx={{
              backgroundColor: 'white',
              border: '3px dashed black',
              padding: '5px',
              borderRadius: '5px',
              height: '30%',
            }}>
            <Typography component='div' variant='body1' color='text.primary'>
              {listingProp.listing.description}
            </Typography>
          </Box>

          <div>
            Contact email:{' '}
            <a href={`mailto:${listingProp.listing.contact_email}`}>
              {listingProp.listing.contact_email}
            </a>
          </div>
          <div>posted on: {datePosted}</div>
          <Button
            color='secondary'
            onClick={onViewListingButtonClick}
            variant='outlined'>
            View Listing {`>>`}{' '}
          </Button>
          {listingProp.isCompany && (
            <Button
              color='warning'
              onClick={onDeleteListing}
              variant='outlined'>
              Delete Listing
            </Button>
          )}
        </div>
      </ListItem>
    );
  };

  let datePosted = new Date(listingProp.listing.createdAt).toUTCString();
  return (
    <Fragment>
      {showBuildingCanvas && fbxUrl && (
        <ListingBuildingCanvas
          onClose={onBuildingCanvasClose}
          rawBuildingDataUrl={fbxUrl}
        />
      )}
      {!isDeleted && render()}
      <Divider variant='inset' component='li' />
    </Fragment>
  );
};

export default Listing;
