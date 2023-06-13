import React from 'react';
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import TvIcon from "@mui/icons-material/Tv";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import BathtubIcon from "@mui/icons-material/Bathtub";
import WcIcon from "@mui/icons-material/Wc";
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import {
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Dialog,
    IconButton,
    Typography,
    Button,
    Grid
  } from "@mui/material";
import { useState } from 'react';

const ModalComponent = ({ img, titre, description, nbPers, prix }) => {
    
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const openDetails = () => {
      setIsDetailsOpen(true);
    };
  
    const closeDetails = () => {
      setIsDetailsOpen(false);
    };
    
    const icons = [""]

    description.split(":").map((d)=>{
      if (d === 'TV LCD') {
        icons.push(<TvIcon />)
      }
      if (d === 'Telephone') {
        icons.push(<PhoneInTalkIcon />)
      }
      if (d === 'Douche') {
        icons.push(<BathtubIcon />)
      }
      if (d === 'WC') {
        icons.push(<WcIcon />)
      }
    })
  return (
    <>
    <div>
        <Button size="small" onClick={openDetails} style={{color:'#e0cc1c', width:'82px'}}><b>Details</b></Button>
    </div>
    <Dialog maxWidth={"md"} open={isDetailsOpen} onClose={closeDetails}>
          <Card sx={{ display: "flex", padding: 1,  background:'#343a40' , color:'whitesmoke'}}>
            <CardMedia
              component="img"
              sx={{ width: '100%', display: { xs: 'none', sm: 'block' } }}
              image={img}
              alt={titre}
            />
            <CardContent sx={{ width: '100%' }}>

                <Typography component="div" variant="h5" style={{textAlign:'center'}}>
                  {titre}
                </Typography>
                <Typography>
                    {
                        description.split(":")[0]+" incluant:"
                    }
                </Typography>
                    <Grid container spacing={1} style={{ color:'#e0cc1c',display:'flex', alignItems:'center', justifyContent:'center', marginTop:'10px'}}>
                    {
                        description.split(":").slice(1).map((d, index) => (
                            <Grid item key={index}>
                                <Card key={index} style={{ paddingTop:'5px', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', width:'100px', height:'100px', color:'whitesmoke', background:'transparent', border:'3px solid #e0cc1c'}}>
                                    <IconButton style={{color:'whitesmoke'}}>
                                      {icons[index+1]}
                                    </IconButton>
                                    <CardContent>
                                      {d}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                    </Grid>
                
                <Typography style={{ display: "flex", alignItems: "center", justifyContent:'space-between', margin:'10px'}}>
                  <Typography style={{ display: "flex", alignItems: "center", flexDirection:'column'}}>
                    <IconButton  style={{color:'whitesmoke'}}>
                      <SellRoundedIcon />
                    </IconButton>
                    <span>{prix}Ar/nuit</span>
                  </Typography>
                  <Typography style={{ display: "flex", alignItems: "center", flexDirection:'column'}}>
                    <IconButton  style={{color:'whitesmoke'}}>
                      <EscalatorWarningIcon />
                    </IconButton>
                    <span>{nbPers} personnes</span>
                  </Typography>
                </Typography>
                <CardActions style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                    <Button variant='contained' size="small" style={{background:'#e0cc1c', fontWeight:'bold'}}>
                      Reserver
                    </Button>
                    <Button size="small" onClick={closeDetails} style={{color:'#e0cc1c', width:'82px'}}>
                      <b>FERMER</b>
                    </Button>
                </CardActions>
            </CardContent>
            
          </Card>
      </Dialog>
    </>
  );
};

export default ModalComponent;