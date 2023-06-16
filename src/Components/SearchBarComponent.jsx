import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { useState } from 'react';

import EventBusyIcon from '@mui/icons-material/EventBusy';
import { Link } from "react-router-dom";

const SearchBarComponent = ({ onSearch }) =>{
    const [searchText, setSearchText] = useState('');
    const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };
    return(
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'115px', marginBottom:'15px'}}>
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
            <Link to='/annulerReserver' style={{color:'red'}}><EventBusyIcon size='large' titleAccess='Annuler reservation'/></Link>
        </div>
        
    );
}

export default SearchBarComponent;