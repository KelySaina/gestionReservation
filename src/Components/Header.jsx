import '../assets/bootstrap/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { Typography } from '@mui/material';

const HeaderComponent = () =>{
    return(
        <div>
            
            <Typography class="navbar navbar-dark navbar-expand-lg fixed-top bg-dark" id="mainNav" style={{display:'flex', alignItems:'center', justifyContent: 'space-evenly', flexDirection:{xs:'row'}}}>
                <div class="container" style={{width:'90%',display:'flex', alignItems:'center', justifyContent: 'space-evenly'}}>
                    <Link to="/" class="navbar-brand" href="#page-top">KS Hotel</Link>
                    <div class="intro-lead-in"><Typography sx={{color:'whitesmoke', fontSize:{xs:'14px'}}}>"La reference hoteliere de la grande ville"</Typography></div>
                </div>
                <div style={{width:'10%'}}>
                    <Link to='/annulerReserver' style={{color:'red'}}><EventBusyIcon size='large' titleAccess='Annuler reservation'/></Link>
                </div>
            </Typography>
        </div>

    );
}

export default HeaderComponent;