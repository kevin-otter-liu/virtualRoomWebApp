import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { Fragment, useContext, useState } from 'react';
import './NavigationBar.css';
import HouseboatIcon from '@mui/icons-material/Houseboat';
import { AccountCircle, ExpandLess, ExpandMore } from '@mui/icons-material';
import { AuthContext } from '../../context/auth-context';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const menuId = 'primary-search-account-menu';
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate()

  const authCtx = useContext(AuthContext);

  const onLogout = () => {
    authCtx.logout();
    navigate('/')
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Fragment>
      <AppBar
        position='fixed'
        style={{ zIndex: 0 }}
        sx={{ backgroundColor: 'gray' }}>
        <Toolbar variant='dense'>
          <Link to='/' style={{ color: 'inherit' }}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}>
              <HouseboatIcon
                sx={{
                  width: 40,
                  height: 40,
                  border: '3px dashed white',
                  borderRadius: '50%',
                }}
              />
            </IconButton>
          </Link>

          <Typography variant='h4' color='inherit'>
            VIRTUAL HOUSE
          </Typography>
          <div className='right-nav-controls'>
            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                gap: '10px',
              }}>
              <AccountCircle
                sx={{
                  width: 40,
                  height: 40,
                  border: '3px dashed white',
                  borderRadius: '50%',
                }}
              />
              {anchorEl ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <Menu
              style={{ marginTop: '50px' }}
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem
                style={{
                  display: 'flex',
                  gap: '5px',
                  alignItems: 'center',
                }}
                onClick={onLogout}>
                <LogoutIcon />
                <div>LOGOUT</div>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <div className='navigation-bar-space' />
    </Fragment>
  );
};

export default NavigationBar;
