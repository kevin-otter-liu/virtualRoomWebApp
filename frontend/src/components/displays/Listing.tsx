import {
  Avatar,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { Fragment } from 'react';
import ListingProp from '../../types/displays/ListingProp';
import './Listing.css';

const Listing: React.FC<ListingProp> = (listingProp) => {
  return (
    <Fragment>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={listingProp.listing.name} src='#' />
        </ListItemAvatar>
        <img
          className='listing-img'
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBFC61sdjubNIUq69lpBkn1GRPavy560hSWXdJ94gx&s'
        />
        <ListItemText
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
        <Button variant='outlined'>View Listing {`>`} </Button>
      </ListItem>
      <Divider variant='inset' component='li' />
    </Fragment>
  );
};

export default Listing;
