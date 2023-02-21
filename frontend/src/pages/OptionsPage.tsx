import { Fragment, useContext } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { Link } from 'react-router-dom';
import './OptionsPage.css';
import { AuthContext } from '../context/auth-context';

const OptionsPage: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const onLogout = () => {
    authCtx.logout();
  };

  return (
    <Fragment>
      <ButtonGroup
        orientation='vertical'
        aria-label='vertical outlined button group'>
        <Button key='1'>
          <Link style={{ color: 'inherit' }} to='/my-listings'>
            View my Virtual Houses
          </Link>
        </Button>
        <Button key='2'>
          <Link to='/upload-listing' style={{ color: 'inherit' }}>
            Upload a Listing
          </Link>
        </Button>
        <Button key='3'>
          <Link to='/search-listing' style={{ color: 'inherit' }}>
            Search for a Listing
          </Link>
        </Button>
        <Button key='4' onClick={onLogout}>
          LOGOUT
        </Button>
      </ButtonGroup>
    </Fragment>
  );
};

export default OptionsPage;
