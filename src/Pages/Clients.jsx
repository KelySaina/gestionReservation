import HeaderComponent from "../Components/Header";
import CardComponent from "../Components/CardComponent";
import SearchBarComponent from "../Components/SearchBarComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import Footer from "../Components/Footer";

const Clients = ()=>{
    const server = "localhost:1060"
    const [roomAvailable, setRoomAvailable] = useState([])
    const [filteredRoomDet, setFilteredRoomDet] = useState([]);

    useEffect(()=>{
        getRoomAvailable();
    },[])

    const getRoomAvailable = async () => {
        const response = await axios.get("http://"+server+"/api/handles.php?action=getRoomDet");
        const data = response.data;
        const roomArray = Object.values(data[0]).filter(
            (item) => typeof item === "object"
        );
        setRoomAvailable(roomArray)
        setFilteredRoomDet(roomArray)
    }

    const handleSearch = (searchText) => {
        const filteredRooms = roomAvailable.filter((room) =>
            searchText.includes('pers')?room.number_of_person.includes(searchText.split('pers')[0]) :
            room.price.includes(searchText) ||
            room.description.split(":")[0].toUpperCase().includes(searchText.toUpperCase())
        );
        setFilteredRoomDet(filteredRooms);
    };

    return(
        <>  
            <div style={{padding:'10px'}}>
                <HeaderComponent/>
                <div style={{marginTop: '100px'}}>
                    <SearchBarComponent onSearch={handleSearch}/>
                    <Grid container spacing={1.5} style={{display: 'flex', justifyContent: 'center', alignContent: 'flex-start'}}>
                    {
                        filteredRoomDet.map((room,i)=>(
                            <Grid item key={i}>
                                <CardComponent price={room.price} img_url={room.img_url} simple_description={room.description.split(":")[0]} room_number={room.room_number.toUpperCase()} nop={room.number_of_person} desc={room.description} />
                            </Grid>
                        ))
                    }
                    </Grid>
                </div>
                <Footer/>
            </div>
        </>
        
    );
}

export default Clients;