import { List, Typography } from '@mui/material';
import { ListingData } from '../../types/data/ListingData';
import ListingsContainerProp from '../../types/displays/ListingsContainerProp';
import Listing from './Listing';
import './ListingsContainer.css';

const ListingsContainer: React.FC<ListingsContainerProp> = (prop) => {
  const displayLists = (listings: ListingData[]) => {
    if (listings.length === 0) {
      return (
        <div className='listing-error'>
          <Typography variant='h2' color='primary'>
            Oops! No projects found
          </Typography>
        </div>
      );
    }

    return (
      <div>
        {listings.map((listingData, i) => {
          return <Listing isCompany={prop.isCompany} key={i.toString()} listing={listingData} />;
        })}
      </div>
    );
  };

  return <List sx={{ width: '100%' }}>{displayLists(prop.listings)}</List>;
};

export default ListingsContainer;
