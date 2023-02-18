import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Fragment, useState } from 'react';
import './NavigationBar.css';
import HouseboatIcon from '@mui/icons-material/Houseboat';
import { AccountCircle } from '@mui/icons-material';

const NavigationBar = () => {
  const menuId = 'primary-search-account-menu';
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Fragment>
      <AppBar color='primary'>
        <Toolbar variant='dense'>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}>
            <HouseboatIcon />
          </IconButton>
          <Typography variant='h6' color='inherit' component='div'>
            Virtual House
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size='large'
            edge='end'
            aria-label='account of current user'
            aria-controls={menuId}
            aria-haspopup='true'
            onClick={handleProfileMenuOpen}
            color='inherit'>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className='navigation-bar-space' />
    </Fragment>
  );
};

export default NavigationBar;
