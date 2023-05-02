import SearchIcon from '@mui/icons-material/Search';
import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import SearchBarProps from '../../types/displays/SearchBarProps';
import './SearchBar.css';

const SearchBar: React.FC<SearchBarProps> = (props) => {
  let [searchFactor, setSearchFactor] = useState<string>('');

  const onTextChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchFactor(e.currentTarget.value);
  };

  const onSearch = async () => {
    props.onSearch(searchFactor);
  };
  return (
    <div className='search-bar'>
      <Typography variant='h1' className='search-bar-title'>
        SEARCH FOR PROJECTS
      </Typography>
      <TextField
        id='outlined-basic'
        label='Search for projects!'
        variant='outlined'
        InputLabelProps={{ sx: { fontSize: 24 } }}
        onChange={onTextChange}
      />
      <Button sx={{ fontSize: '1.5rem' }} onClick={onSearch} variant='outlined'>
        <SearchIcon />
        <p> Search</p>
      </Button>
    </div>
  );
};

export default SearchBar;
