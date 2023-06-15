import React from "react";
import { Dialog } from "@mui/material";
import { useState, useEffect } from "react";

const SuccessReservation = ()=>{
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
    return(
        <>
            <Dialog maxWidth={"md"} open={isDetailsOpen} onClose={closeNotif}>
                <button onClick={closeNotif}>x</button>
            </Dialog>
        </>
    )
}

export default SuccessReservation;