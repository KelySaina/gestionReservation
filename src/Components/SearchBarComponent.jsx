import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { useState } from 'react';

const SearchBarComponent = ({ onSearch }) =>{
    const [searchText, setSearchText] = useState('');
    const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };
    return(
        <div style={{display:'flex', justifyContent:'center', marginTop:'115px', marginBottom:'15px'}}>
            <TextField
                variant='outlined'
                size="small"
                placeholder='Ex: 2000Ar, 2pers, simple'
                label='Search rooms'
                InputProps={{
                    endAdornment: <SearchIcon fontSize='small' />,
                }}
                value={searchText}
                onInput={handleInputChange}
            />
        </div>
        
    );
}

export default SearchBarComponent;