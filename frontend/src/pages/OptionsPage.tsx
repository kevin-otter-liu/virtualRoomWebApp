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
    <ButtonGroup
      orientation='vertical'
      aria-label='vertical outlined button group'>
      <Button key='1'>
        <Link style={{color:'inherit'}} to='/virtual-house-create'>Create a Virtual House</Link>
      </Button>

      <Button key='2'>
        <Link style={{color:'inherit'}} to='/my-virtual-houses'>View my Virtual Houses</Link>
      </Button>
      <Button key='3'>
        <Link to='/search-virtual-houses' style={{color:'inherit'}}>
          Search Virtual Houses by location
        </Link>
      </Button>
      <Button key='4' onClick={onLogout}>
        LOGOUT
      </Button>
    </ButtonGroup>
  );
};

export default OptionsPage;
