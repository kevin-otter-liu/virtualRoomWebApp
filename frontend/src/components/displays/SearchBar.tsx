import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Button, TextField, Typography } from '@mui/material';
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
    <div className='navigation-bar-search-wrapper'>
      <Typography variant='h2' className='search-bar-title'>
        SEARCH FOR PROJECTS
      </Typography>
      <div className='navigation-bar-search-wrapper search-bar'>
        <TextField
          id='outlined-basic'
          label='Search for projects!'
          variant='outlined'
          style={{ width: '100%' }}
          onChange={onTextChange}
        />
        <Button onClick={onSearch} variant='outlined'>
          <SearchIcon />
          <p>Search</p>
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
