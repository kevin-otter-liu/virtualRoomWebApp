import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CardOptionProp from '../../types/displays/CardOptionProp';
import CancelIcon from '@mui/icons-material/Cancel';
import { Margin } from '@mui/icons-material';
import './CardOption.css';

const CardOption: React.FC<CardOptionProp> = (prop) => {
  return (
    <Box
      component='div'
      sx={{
        minWidth: '230px',
        width: '100%',
        height: '100%',
        border: '5px solid lightblue',
        boxShadow: '10px 20px #888888',
      }}>
      <Card variant='outlined'>
        <CardHeader
          sx={{
            font: '60',
            height: '15%',
          }}
          avatar={
            <Avatar
              sx={{ width: 80, height: 80, border: '10px solid lightblue' }}
              src='/assets/ui/avatar.jpg'
              aria-label='recipe'
            />
          }
          action={
            <IconButton aria-label='settings'>
              <CancelIcon sx={{ width: 50, height: 50 }} />
            </IconButton>
          }
          title={
            <Typography variant='h4' color='inherit'>
              {prop.title}
            </Typography>
          }
        />
        <img className='card-image' alt={prop.imgAlt} src={prop.imgSrc} />
        <CardContent>
          <Typography gutterBottom variant='h4' component='div'>
            {prop.body}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Button
            variant='outlined'
            size='large'
            sx={{ width: '100%', height: '100%', fontSize: '1.5rem' }}>
            <Link style={{ color: 'inherit' }} to={prop.urlRedirectTo}>
              {prop.buttonPrompt} {'>>'}
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CardOption;
