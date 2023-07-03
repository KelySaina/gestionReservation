import '../assets/bootstrap/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ListIcon from '@mui/icons-material/List';
import { useState } from 'react';
import TableRoom from "../Components/TableRoom"; 
import TableReservation from "../Components/TableReservation";

const HeaderAdminComponent = () =>{

    const [isVisible, setIsVisible] = useState(false)
    const [isVisibleRoom, setIsVisibleRoom] = useState(false)
    const [isVisibleRes, setIsVisibleRes] = useState(false)

    return(
        <>
        <div>
            <Typography class="navbar navbar-dark navbar-expand-lg fixed-top bg-dark" id="mainNav" style={{display:'flex', alignItems:'center', justifyContent: 'space-evenly', flexDirection:{xs:'row'}}}>
                <div class="container" style={{height:'20px',width:'90%',display:'flex', alignItems:'center', justifyContent: 'space-between'}}>
                    <Link to="/" class="navbar-brand" href="#page-top">KS Hotel</Link>
                    <div class="intro-lead-in"><Typography sx={{color:'whitesmoke', fontSize:{xs:'14px'}}}>Espace Administrateur</Typography></div>
                </div>
                <div style={{width:'10%'}}>
                    <Link to='/login' style={{color:'whitesmoke'}}><LogoutIcon size='medium' titleAccess='Log out'/>Log out</Link>
                </div>
            </Typography>
            <div style={{margin:'auto', marginTop:'60px',display:'flex', alignItems:'center', justifyContent: 'center'}}>
                <span style={{display:isVisible?'inline':'none', width:'100px'}}><Link style={{color:"#660B32"}} onClick={()=>{setIsVisibleRes(false);setIsVisible(false);setIsVisibleRoom(true)}}>Chambres</Link></span>
                <div class="bg-dark" style={{margin:'0 12px 0 12px', width:'55px', height:'55px', borderRadius:'50%',display:'flex', alignItems:'center', justifyContent: 'center'}}>
                    <IconButton onClick={()=>{isVisible?setIsVisible(false):setIsVisible(true)}}>
                        <ListIcon sx={{color:'whitesmoke'}}/>
                    </IconButton>
                </div>
                <span style={{display:isVisible?'inline':'none', width:'100px' }}><Link style={{color:"#660B32"}} onClick={()=>{setIsVisibleRes(true);setIsVisible(false);setIsVisibleRoom(false)}}>Reservations</Link></span>
            </div>
        </div>
        <div>
            {
                isVisibleRoom && (
                    <TableRoom/>
                )
            }
            {
                isVisibleRes && (
                    <TableReservation/>
                )
            }
        </div>
        </>
    );
}

export default HeaderAdminComponent;