import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import React from "react";
import { Link, useLocation } from "react-router-dom";
import TvIcon from "@mui/icons-material/Tv";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import BathtubIcon from "@mui/icons-material/Bathtub";
import WcIcon from "@mui/icons-material/Wc";
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import {
    Grid
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Reserver = () =>{
    const location = useLocation();
    const qP = new URLSearchParams(location.search);
    const url = qP.get('arg1')
    const titre = qP.get('arg2')
    const description = qP.get('arg3')
    const prix = qP.get('arg4')

    const icons = [""]

    description.split(":").map((d)=>{
      if (d === 'TV LCD') {
        icons.push(<TvIcon sx={{fontSize:{xs:'10px', lg:'20px'}}} />)
      }
      if (d === 'Telephone') {
        icons.push(<PhoneInTalkIcon sx={{fontSize:{xs:'10px', lg:'20px'}}} />)
      }
      if (d === 'Douche') {
        icons.push(<BathtubIcon sx={{fontSize:{xs:'10px', lg:'20px'}}} />)
      }
      if (d === 'WC') {
        icons.push(<WcIcon sx={{fontSize:{xs:'10px', lg:'20px'}}} />)
      }
      return;
    })
    return(
        <>
            
            <Header/>
            <Card sx={{marginTop:{xs:'80px', lg:'100px'}, display:'flex', flexDirection:{xs:'column', lg:'row'}, alignItems:'center', justifyContent:'center', padding: 0.7}}>

            
                    <CardMedia sx={{ height: {xs:150, lg: '70vh'}, width:{xs:'100vw',lg: '50vw'}, padding:'3px'}} 
                        image={url}
                    />

                    <CardContent sx={{width:{xs:'100vw',lg: '50vw'}, height: { lg: '70vh'}, background:'#343a40'}}>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'2px'}}>
                            <Typography sx={{color:'#e0cc1c', fontSize:{lg:'18px', xs:'14px'}}}>
                                <SellRoundedIcon/><b>{prix}Ar/nuit</b>
                            </Typography>
                            <Link to='/clients'>Retour</Link>
                        </div>
                        

                        <Grid container spacing={1} style={{ color:'#e0cc1c',display:'flex', alignItems:'center', justifyContent:'center', marginTop:'10px'}}>
                        {
                            description.split(":").slice(1).map((d, index) => (
                                <Grid item key={index}>
                                    <Card key={index} sx={{ width:{xs:'75px',lg:'100px'}, height:{xs:'60px',lg:'80px'}, color:'whitesmoke', background:'transparent', border:'3px solid #e0cc1c'}}>
                                        <CardContent sx={{fontSize:{xs:'11px', lg:'15px'}, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                                            
                                            <span>{icons[index+1]}</span>
                                            
                                            <span>{d}</span>

                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                        </Grid>
                        <p>
                            <TextField style={{ marginTop: 15}}
                                label="Nom complet"
                                fullWidth
                                required
                                placeholder='Ex: John Doe'
                                size="small"

                            />

                            <TextField style={{ marginTop: 15}}
                                label="Téléphone"
                                fullWidth
                                required
                                placeholder='Ex: 03X XX XXX XX'
                                size="small"
                            />

                            <TextField style={{ marginTop: 15}}
                                label="Date d'arrivee"
                                type="date"
                                fullWidth
                                required
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            
                            <TextField style={{ marginTop: 15}}
                                label="Date de sortie"
                                type="date"
                                fullWidth
                                required
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            
                        </p>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <Button variant='contained' size="large" style={{background:'green', fontWeight:'bold'}}>
                                Valider
                            </Button>
                        </div>
                    </CardContent>
                   
            </Card>
            <Footer/>
        </>
    )
}

export default Reserver;