import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import ModalComponent from './ModalComponent';

const CardComponent = ({img_url,room_number,simple_description, price, nop, desc})=> {
  
  return (
    <div>
      <Card sx={{ maxWidth: 400, minWidth: 320 , padding: 1.5, color:'whitesmoke', background:'#343a40'}}>
        <CardMedia
          sx={{ height: 200 }}
          image={img_url}
          title={room_number}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <b>{room_number}</b>
          </Typography>
          <Typography variant="body2" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <span>{simple_description}</span>
            <ModalComponent prix={price} img={img_url} description={desc} titre={room_number} nbPers={nop}/>
          </Typography>
        </CardContent>
        <div style={{display: 'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{display: 'flex', alignItems:'center', justifyContent:'space-around', color: "#e0cc1c"}}>
            <SellRoundedIcon/>
            <strong>{price}Ar/nuit</strong>
          </div>

          <CardActions>
            <Button variant='contained' size="small" style={{background:'#e0cc1c', fontWeight:'bold'}}>Reserver</Button>
          </CardActions>
        </div>

      </Card>
    </div>
    
  );
}

export default CardComponent;