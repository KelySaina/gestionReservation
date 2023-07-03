import '../assets/bootstrap/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ListIcon from '@mui/icons-material/List';
import { useState } from 'react';
import TableRoom from "../Components/TableRoom"; 
import TableReservation from "../Components/TableReservation";
import  TypeWriterEffectComponent from '../Components/TypeWriterEffectComponent'

const HeaderAdminComponent = () =>{

    const [isVisible, setIsVisible] = useState(false)
    const [isVisibleRoom, setIsVisibleRoom] = useState(false)
    const [isVisibleRes, setIsVisibleRes] = useState(false)
    const [isLandingVisible, setIsLandingVisible] = useState(true)

    return(
        <>
        <div>
            <Typography class="navbar navbar-dark navbar-expand-lg fixed-top bg-dark" id="mainNav" style={{display:'flex', alignItems:'center', justifyContent: 'space-evenly', flexDirection:{xs:'row'}}}>
                <div class="container" style={{height:'20px',width:'90%',display:'flex', alignItems:'center', justifyContent: 'space-between'}}>
                    <Link to="/" class="navbar-brand" href="#page-top">KS Hotel</Link>
                    <div class="intro-lead-in"><Typography sx={{color:'whitesmoke', fontSize:{xs:'14px'}}}>Espace Administrateur</Typography></div>
                </div>
                {/*<div style={{width:'10%'}}>
                    <Link to='/login' style={{color:'whitesmoke'}}><LogoutIcon size='medium' titleAccess='Log out'/>Log out</Link>
                </div>*/}
            </Typography>
            <div class="fixed-top" style={{margin:'auto', marginTop:'60px',display:'flex', alignItems:'center', justifyContent: 'center'}}>
                <span style={{display:isVisible?'inline':'none', width:'75px'}}><Link style={{color:"#e0cc1c"}} onClick={()=>{setIsVisibleRes(false);setIsVisible(false);setIsVisibleRoom(true);setIsLandingVisible(false)}}>Chambres</Link></span>
                <div class="bg-dark" style={{ margin:'0 12px 0 12px', width:'55px', height:'55px', borderRadius:'50%',display:'flex', alignItems:'center', justifyContent: 'center'}}>
                    <IconButton onClick={()=>{isVisible?setIsVisible(false):setIsVisible(true)}}>
                        <ListIcon sx={{color:'whitesmoke'}}/>
                    </IconButton>
                </div>
                <span style={{display:isVisible?'inline':'none', width:'75px' }}><Link style={{color:"#e0cc1c"}} onClick={()=>{setIsVisibleRes(true);setIsVisible(false);setIsVisibleRoom(false);setIsLandingVisible(false)}}>Reservations</Link></span>
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
            {
                isLandingVisible && (
                    <div class="intro-text"  style={{fontSize:'50px',fontWeight:'bolder',paddingTop:'200px',background:'url("/images/bg.jpeg")', backgroundSize:'cover', backgroundRepeat:'norepeat', width:'100%', height:'100vh', display:'flex', justifyContent:'center',alignItems:'center'}}>
                        <div class="intro-heading" style={{color:'#e0cc1c', height:'135px'}}><span><TypeWriterEffectComponent text="Des chambres confortables:Des prix abordables:Un sejour inoubliable"/> </span></div>
                    </div>
                )
            }
        </div>    
        </>
    );
}

export default HeaderAdminComponent;