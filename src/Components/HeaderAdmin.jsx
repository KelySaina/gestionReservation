import '../assets/bootstrap/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const HeaderAdminComponent = () =>{
    return(
        <div>
            
            <Typography class="navbar navbar-dark navbar-expand-lg fixed-top bg-dark" id="mainNav" style={{display:'flex', alignItems:'center', justifyContent: 'space-evenly', flexDirection:{xs:'row'}}}>
                <div class="container" style={{width:'90%',display:'flex', alignItems:'center', justifyContent: 'space-between'}}>
                    <Link to="/" class="navbar-brand" href="#page-top">KS Hotel</Link>
                    <div class="intro-lead-in"><Typography sx={{color:'whitesmoke', fontSize:{xs:'14px'}}}>Espace Administrateur</Typography></div>
                </div>
                <div style={{width:'10%'}}>
                    <Link to='/login' style={{color:'whitesmoke'}}><LogoutIcon size='medium' titleAccess='Log out'/>Log out</Link>
                </div>
            </Typography>
        </div>

    );
}

export default HeaderAdminComponent;