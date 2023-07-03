import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { useState } from 'react';




const SearchBarAd = ({ onSearch }) =>{
    const [searchText, setSearchText] = useState('');
    const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };
    return(
            <TextField
                variant='outlined'
                size="small"
                placeholder='Nom, Numero, Status'
                label='Rechercher'
                InputProps={{
                    endAdornment: <SearchIcon fontSize='small' />,
                }}
                value={searchText}
                onInput={handleInputChange}
            />
        
    );
}

export default SearchBarAd;