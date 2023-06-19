import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AnnulerReservation = ({id, time})=>{
    const server='localhost:1060'
    const [roomData, setRoomData] = useState([])

    const [isOpen, setIsOpen] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)

    const [titre, setTitre] = useState('')

    const checkValid = ()=>{
        const currentTime = new Date();
        currentTime.getHours()
        currentTime.getMinutes()

        const resTime = new Date()
        const resTimeArr = time.split(":")
        resTime.setHours(resTimeArr[0])
        resTime.setMinutes(resTimeArr[1])
        

        const resTimeMin = resTime.getHours()*60 + resTime.getMinutes()
        const currentTimeMin = currentTime.getHours()*60 + currentTime.getMinutes()

        const timeDiff = Math.abs(currentTimeMin - resTimeMin)

        if(timeDiff<= 360){
            return false
        }
        return true

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

    const fd = {
        "id": id
    }

    const redirect = ()=>{
        window.location.href ='/annulerReserver'
    }

    useEffect(()=>{
        getRoomDet()
    },[])

    const getRoomDet = async ()=>{
        const f = toFormData(fd)
        const response = await axios.post("http://"+server+"/api/handles.php?action=getRoomRes", f);
        if(response.data[0].info === 'success'){
            const data =response.data[0].reservationRoomdet[0];
            setRoomData(data)
            if(checkValid()){
                setIsOpen2(true)
                setIsOpen(false)
            }else{
                setIsOpen2(false)
                setIsOpen(true)
            }
            setTitre(data.description.split(":")[0])
        }else{
            setIsOpen(false)
            setIsOpen2(true)
        }
    }

    const cancelRes = async ()=>{
        console.log("Cancel")
        const f = toFormData(fd)
        const response = await axios.post("http://"+server+"/api/handles.php?action=cancelRes", f);
        
        console.log(response.data[0].info)

        if(response.data[0].info === 'success'){
            toast.success(response.data[0].message);
        }else{
            toast.error(response.data[0].message);
        }

        setTimeout(()=>{
            window.location.href='/clients'
        },3000)
    }



    return(
        <>
            <div>
            <Dialog open={isOpen}>
                <DialogContent>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>Voulez-vous vraiment annuler votre reservation?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <img src={roomData.img_url} alt={roomData.room_number} width='100%' height='175px'/>
                            </Typography>

                            <Typography>
                                <b>{titre}</b>
                            </Typography >
                            <Typography style={{display:'flex', alignItems:'center'}}>
                                <EscalatorWarningIcon/><strong>{roomData.number_of_person} personnes</strong>
                            </Typography>
                            <Typography style={{display:'flex', alignItems:'center'}}>
                                <SellRoundedIcon/><strong>{roomData.price} Ar</strong>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <div style={{float:'right'}}>
                        <Button onClick={cancelRes}>
                            Oui
                        </Button>
                        <Button onClick={redirect}>
                            Non
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={isOpen2}>
                <DialogContent sx={{textAlign:'center'}}>
                    <h4>Votre Code QR ne correspond a aucune reservation</h4>
                    <Button variant='contained' onClick={redirect}>
                        <b>OK</b>
                    </Button>
                </DialogContent>
            </Dialog>
            </div>
            <ToastContainer/>
        </>
    )
}

export default AnnulerReservation;