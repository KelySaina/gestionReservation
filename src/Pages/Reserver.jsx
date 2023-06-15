import { Card, CardContent, InputAdornment, CardMedia, Typography } from "@mui/material";
import Header from "../Components/Header"
import Footer from "../Components/Footer"
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
import { useState } from "react";
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import BadgeIcon from '@mui/icons-material/Badge';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import axios from "axios";
import SuccessReservation from "../Components/SuccessReservationComponent";


const Reserver = () =>{

    const location = useLocation();
    const qP = new URLSearchParams(location.search);
    const url = qP.get('arg1')
    const titre = qP.get('arg2')
    const description = qP.get('arg3')
    const prix = qP.get('arg4')

    const [fullName, setFullName] = useState('');
    const [isValidName, setIsValidName] = useState(true);
    const [isTextFieldPhoneVisible, setIsTextFieldPhoneVisible] = useState(false);

    const handleInputNameChange = (event) => {
        const inputValue = event.target.value;
        setFullName(inputValue.trim());
        if (inputValue.trim() === '') {
            setIsValidName(true);
        } else {
            setIsValidName(/^[A-Za-z\s-]+$/.test(inputValue));
            (/^[A-Za-z\s-]+$/.test(inputValue))?setIsTextFieldPhoneVisible(true):setIsTextFieldPhoneVisible(false)
        }
    };

    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValidPhone, setIsValidPhone] = useState(true);
    const [isTextFieldDAVisible, setIsTextFieldDAVisible] = useState(false);

    const handleInputPhoneChange = (event) => {
        const inputValue = event.target.value;
        setPhoneNumber(inputValue);

        if(inputValue.trim()=== ''){
            setIsValidPhone(true);
            setIsTextFieldDAVisible(false)
            setIsTextFieldVisible(false)
        }else if (inputValue.length < 10){
            if((/^\d+$/.test(inputValue))){
                setIsValidPhone(true);
            }else{
                setIsValidPhone(false);
                setIsTextFieldDAVisible(false)
                setIsTextFieldVisible(false)
            }
        }else{
            setIsValidPhone(/^03[23489]\d{7}$/.test(inputValue));
            (/^03[23489]\d{7}$/.test(inputValue))?setIsTextFieldDAVisible(true)&&setIsTextFieldVisible(false):setIsTextFieldDAVisible(false)&&setIsTextFieldVisible(false)
        }
    };

    const [arrivalDate, setArrivalDate] = useState('');
    const [isValidDate, setIsValidDate] = useState(true);
    const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);

    const handleArrivalDateChange = (event) => {
        const selectedDate = event.target.value;
        setArrivalDate(selectedDate);
        const currentDate = new Date().toLocaleDateString().valueOf();        
        const enteredDate = new Date(selectedDate).toLocaleDateString().valueOf();
        setIsValidDate((enteredDate >= currentDate));
        if(enteredDate>=new Date(setOffDate).toLocaleDateString().valueOf()){
            setSetOffDate('')
            setIsValidSODate(true)
            setIsButtonVisible(false)
        }
        (enteredDate >= currentDate)?setIsTextFieldVisible(true):setIsTextFieldVisible(false) && setSetOffDate('')
    };

    const [setOffDate, setSetOffDate] = useState('');
    const [isValidSODate, setIsValidSODate] = useState(true);
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    const handleSetOffDateChange = (event) => {
        const selectedDate = event.target.value;
        const enteredDate = new Date(selectedDate).toLocaleDateString().valueOf();
        setSetOffDate(selectedDate);
        setIsValidSODate((new Date(arrivalDate).toLocaleDateString().valueOf() <= enteredDate));
        
        (new Date(arrivalDate).toLocaleDateString().valueOf() <= enteredDate)?setIsButtonVisible(true):setIsButtonVisible(false)
    };
    const [isOpen,setIsOpen] = useState(false)

    const validerClick = async ()=>{
        const fd = {
            "fullName": fullName,
            "room_number": titre,
            "phone": phoneNumber,
            "dateA": arrivalDate,
            "dateS": setOffDate
        }

        const postForm = toFormData(fd)
        

        const response = await axios.post("http://localhost:1060/api/handles.php?action=postReservation", postForm);
        console.log(response.data);
        if(response.data[0].info === 'success'){
            console.log("succes")
            setIsOpen(true)
        }else{
            console.log("error")
        }
    }

    function toFormData(f){
        const fd = new FormData();
        for (let key in f){
            if(f.hasOwnProperty(key)){
                fd.append(key,f[key])
            }
        }
        return fd;
    }





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
            <Card sx={{marginTop:{xs:'50px', lg:'100px'}, display:'flex', flexDirection:{xs:'column', lg:'row'}, alignItems:'center', justifyContent:'center', padding: 0.7}}>

            
                    <CardMedia sx={{ height: {xs:'30vh',md:'40vh', lg: '85vh'}, width:{xs:'100vw',lg: '60vw'}, padding:'3px'}} 
                        image={url}
                    />

                    <CardContent sx={{width:{xs:'100vw',lg: '40vw'}, height: { lg: '85vh'}, background:'#343a40'}}>
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
                                    <Card key={index} sx={{ width:{xs:'75px',md:'85px',lg:'100px'}, height:{xs:'60px',md:'70px',lg:'80px'}, color:'whitesmoke', background:'transparent', border:'3px solid #e0cc1c'}}>
                                        <CardContent sx={{fontSize:{xs:'11px',md:'13px', lg:'15px'}, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                                            
                                            <span>{icons[index+1]}</span>
                                            
                                            <span>{d}</span>

                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                        </Grid>
                        <div>
                            <TextField style={{ marginTop: 15, color: 'whitesmoke'}}
                                label="Nom complet"
                                fullWidth
                                required
                                placeholder='Ex: John Doe'
                                size="medium"
                                value={fullName}
                                onChange={handleInputNameChange}
                                error={!isValidName}
                                helperText={!isValidName ? 'Veuillez entrer un nom valide' : ''}
                                InputProps={{
                                    style: { color: 'whitesmoke'},
                                    endAdornment: (
                                        <InputAdornment position="start">
                                          <BadgeIcon style={{color:'whitesmoke'}}/>
                                        </InputAdornment>
                                    ),
                                }}
                                InputLabelProps={{
                                    style: { color: '#e0cc1c' },
                                }}
                            />

                            {
                                isTextFieldPhoneVisible&&(
                                <TextField style={{ marginTop: 15, color: 'whitesmoke'}}
                                label="Téléphone"
                                fullWidth
                                required
                                placeholder='Ex: 03X XX XXX XX'
                                size="medium"
                                value={phoneNumber}
                                onChange={handleInputPhoneChange}
                                error={!isValidPhone}
                                helperText={!isValidPhone && phoneNumber !== '' ? 'Veuillez entrer un numéro de téléphone valide' : ''}
                                InputProps={{
                                    style: { color: 'whitesmoke' },
                                    endAdornment: (
                                        <InputAdornment position="start">
                                          <SmartphoneIcon style={{color:'whitesmoke'}}/>
                                        </InputAdornment>
                                    ),
                                }}
                                inputProps={{
                                    maxLength: 10,
                                }}
                                InputLabelProps={{
                                    style: { color: '#e0cc1c' },
                                }}
                                />
                                )
                            }

                            {
                                isTextFieldDAVisible&&(
                                <TextField style={{ marginTop: 15, color: 'whitesmoke'}}
                                    label="Date d'arrivee"
                                    type="date"
                                    fullWidth
                                    required
                                    size="medium"
                                    InputLabelProps={{
                                        shrink: true,
                                        style: { color: '#e0cc1c' },
                                    }}
                                    InputProps={{
                                        style: { color: 'whitesmoke' },
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <EditCalendarRoundedIcon style={{color:'whitesmoke'}} />
                                            </InputAdornment>
                                        ),
                                    }} 
                                    value={arrivalDate}
                                    onChange={handleArrivalDateChange}
                                    error={!isValidDate}
                                    helperText={!isValidDate && arrivalDate !== '' ? "La date d'arrivée ne peut pas être antérieure à la date actuelle" : ''} 
                                />
                                )
                            }
                            
                            {
                                isTextFieldVisible &&(
                                <TextField style={{ marginTop: 15, color: 'whitesmoke'}}
                                label="Date de sortie"
                                type="date"
                                fullWidth
                                required
                                size="medium"
                                InputLabelProps={{
                                    shrink: true,
                                    style: { color: '#e0cc1c' },
                                }}
                                InputProps={{
                                    style: { color: 'whitesmoke'},
                                    endAdornment: (
                                        <InputAdornment position="start">
                                          <EditCalendarRoundedIcon style={{color:'whitesmoke'}}/>
                                        </InputAdornment>
                                    ),
                                }}
                                value={setOffDate}
                                onChange={handleSetOffDateChange}
                                error={!isValidSODate}
                                helperText={!isValidSODate && setOffDate !== '' ? "La date d'arrivée ne peut pas être antérieure à la date d'arrivee" : ''} 
                                
                                />
                                )
                            }
                            
                        </div>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            {isButtonVisible&&(
                                <Button variant='contained' onClick={validerClick} size="large" style={{background:'green', fontWeight:'bold', marginTop: '15px'}}>
                                    VALIDER
                                </Button>
                                )
                            }
                        </div>
                    </CardContent>
                   
            </Card>
            {
                isOpen && (
                    <SuccessReservation/>
                )
            }
            
            <Footer/>
        </>
    )
}

export default Reserver;