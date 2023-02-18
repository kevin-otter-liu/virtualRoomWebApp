import { List, Typography } from '@mui/material';
import { ListingData } from '../../types/data/ListingData';
import ListingsContainerProp from '../../types/displays/ListingsContainerProp';
import Listing from './Listing';
import './ListingsContainer.css';

const ListingsContainer: React.FC<ListingsContainerProp> = (prop) => {
  const displayLists = (listings: ListingData[]) => {
    if (listings.length === 0) {
      return (
        <div className='listings-error'>
          <Typography color='primary'>Oops! No projects found</Typography>
        </div>
      );
    }

    return listings.map((listingData, i) => {
      return <Listing key={i.toString()} listing={listingData} />;
    });
  };

  return <List>{displayLists(prop.listings)}</List>;
};

export default ListingsContainer;
