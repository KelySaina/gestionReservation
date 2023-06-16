import React from "react";
import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import QRCode from 'qrcode.react';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import { toPng } from 'html-to-image';


const SuccessReservation = ({text})=>{
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    useEffect(()=>{
        openNotif();
    },[])
    const openNotif = () => {
        setIsDetailsOpen(true);
    };

    const closeNotif = () => {
        setIsDetailsOpen(false);
        window.location.href='/clients'
    };

    const saveQRCodeAsPNG = async () => {
        const qrCode = document.getElementById('qr-code')
        const date = new Date().toLocaleDateString()
        const pngDataUrl = await toPng(qrCode)
        const link = document.createElement('a')
        link.href = pngDataUrl
        link.download = 'KS_Hotel_Reservation_'+date+'.png'
        link.click()
        closeNotif()
    }
    return(
        <>
            <Dialog maxWidth={"md"} open={isDetailsOpen} >

                <DialogContent sx={{display:'flex', flexDirection:'column', alignItems:'center',justifyContent:'center', background:'#343a40', color:'whitesmoke'}}>

                    <p style={{display:'flex', flexDirection:'column', alignItems:'center',justifyContent:'center', textAlign:'center'}}>
                        <Typography>
                            <TaskAltRoundedIcon style={{fontSize:'80px', color:'green'}}/>
                        </Typography>
                        <Typography>
                            <strong>Veuiller telecharger le code QR ci-dessous</strong>
                        </Typography>
                        <Typography>
                            Il vous sera necessaire pour <b>Annuler</b> ou <b>Confirmer</b> votre reservation
                        </Typography>
                    </p>
                    <p><QRCode  id='qr-code' value={text} style={{border:'3px solid yellow', borderRadius:'5px', padding:'4px', background:'white'}}/></p>
                    <p>
                        <Button size="large" onClick={saveQRCodeAsPNG} startIcon={<DownloadRoundedIcon fontSize="medium"/>} variant="contained" style={{background:'#e0cc1c', color:'#343a40'}}>
                            <b>TELECHARGER</b>
                        </Button>
                    </p>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default SuccessReservation;