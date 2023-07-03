import React, { useEffect, useState, useRef } from "react";
import ContainerComponent from "./ContainerComponent";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  ButtonGroup,
  Dialog,
  DialogContent,
  TextField
} from "@mui/material";
import TableComponent from "./TableComponent";
import TableFooter from "@mui/material/TableFooter";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";
import axios from "axios";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { ToastContainer, toast } from 'react-toastify';

export default function TableRoom() {

  const server = "localhost:1060"

  useEffect(() => {
    getAllRoom()
  }, []);

  const header = [
    "NUMERO DE CHAMBRE",
    "PRIX",
    "CAPACITE",
    "DESCRIPTION",
    "IMAGE",
    "ACTION",
  ];

  const [rows, setRows] = useState([]);

  const getAllRoom = async () => {
    const response = await axios.get(`http://${server}/api/handles.php?action=getAllRoom`);
    const data = response.data;
  
    const roomObjects = Object.values(data[0]).filter(obj => typeof obj === 'object');
    setRows(roomObjects);
  };

  function toFormData(f){
    const fd = new FormData();
    for (let key in f){
        if(f.hasOwnProperty(key)){
            fd.append(key,f[key])
        }
    }
    return fd;
}

  const [roomNewInfo, setRoomNewInfo] = useState({
    id:'',
    nPrix:'',
    nCap:'',
    nDesc:'',
    nImg:''
  })

  const getRoomData = async (id) => {
    const fd = {
      "id": id
    }

    const f = toFormData(fd)

    const response = await axios.post(`http://${server}/api/handles.php?action=getRoomData`,f);
    const data = response.data[0][0];
    if (data) {
      const { price, number_of_person, description, img_url } = data;
  
      setRoomNewInfo((prevRoomInfo) => ({
        ...prevRoomInfo,
        id: id,
        nPrix: price,
        nCap: number_of_person,
        nDesc: description,
        nImg: img_url
      }));
    setMod(true)
    }
  }

  const handleChange2 = (event) => {
    const { name, value } = event.target;

    if (value.trim() === ''){
      setDisableValider(true)
    }else{
      setDisableValider(false)
    }

    if ((name === 'nCap' && parseInt(value.trim()) <= 0) || (name === 'nCap' && value.trim() === '')){
      setDisableValider(true)
    }else{
      setDisableValider(false)
    }
  
    if (name === 'nPrix' || name === 'nCap') {

      const numericValue = value.replace(/[^0-9]/g, ''); 
  
      setRoomNewInfo((prevInfo) => ({
        ...prevInfo,
        [name]: numericValue,
      }));
    } else {
      setRoomNewInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };
  

  const submitMod = async () =>{
    const fd = toFormData(roomNewInfo)
    const response = await axios.post(`http://${server}/api/handles.php?action=modRoom`,fd);
    if(response.data[0].info === 'error'){
      toast.error('Une erreur s\'est produite')
    }else{
      toast.success(response.data[0].msg)
      setRoomNewInfo('')
      setMod(false)
      getAllRoom()
    }
    
  }
  
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
  const [mod, setMod] = useState(false)

  const fileInputRef = useRef(null);

  const handleImageChange = async (file) => {
  if (file) {
    const fileName = file.name;
    const filePath = `/images/${fileName}`;

    const fd = {
      "filepath": filePath
    }

    const f = toFormData(fd)

    const response = await axios.post(`http://${server}/api/handles.php?action=checkImg`,f);

    if (response.data[0]){
      toast.error("Cette image est deja prise")
      setDisableValider(true)
    }else{
      const image = new Image();
      image.src = filePath;

      image.onload = () => {
        setIsValidImage(true)
        setDisableValider(false)
        setRoomNewInfo((prevEmployee) => ({
          ...prevEmployee,
          nImg: filePath,
        }));
      };

      image.onerror = () => {
        setIsValidImage(false)
        setDisableValider(true)
      };
    }
    
  }
};

  const [disableValider, setDisableValider] = useState(false)
  const [isValidImage, setIsValidImage] = useState(true)


  return (
    <>
      <Dialog fullWidth={true} open={mod} onClose={() => setMod(false)}>
        
        <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px', justifyContent: 'space-around' }}>
          <h4 style={{textAlign:'center', marginBottom:'15px'}}>Modifier une chambre</h4>
          <TextField style={{ marginBottom: '15px' }} size='small' label="Nouveau prix" type='text' name='nPrix' value={roomNewInfo.nPrix} onChange={handleChange2} fullWidth />
          <TextField style={{ marginBottom: '15px' }} size='small' label="Nouvelle capacite" type='text' name='nCap' value={roomNewInfo.nCap} onChange={handleChange2} fullWidth />
          <TextField style={{ marginBottom: '15px' }} size='small' label="Nouvelle description" type='text' name='nDesc' value={roomNewInfo.nDesc} onChange={handleChange2} fullWidth />
          <TextField error={!isValidImage} helperText={!isValidImage ? 'Veuillez selectionner une image dans le dossier public/images ' : ''} onClick={() => fileInputRef.current.click()} style={{ marginBottom: '15px' }} size='small' label="Nouvelle image" type='text' name='nImg' value={roomNewInfo.nImg} onChange={handleChange2} fullWidth/>
          <input
            style={{ display: 'none' }}
            type='file'
            accept='image/*'
            onChange={(event) => handleImageChange(event.target.files[0])}
            ref={fileInputRef}
          />
          <div>
            <Button disabled={disableValider} style={{ margin: '10px' }} color='success' variant="contained" onClick={()=>{submitMod()}}>
              Valider
            </Button>
            <Button style={{ margin: '10px' }} variant="outlined" color="error" onClick={() => setMod(false)}>
              Annuler
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <ContainerComponent >
        <Card>
          <CardContent>
            <Typography
              color="#660B32"
              gutterBottom
              variant="h5"
              component="div"
            >
              Chambres
            </Typography>
          </CardContent>

          <TableComponent>
            <TableHead>
              <TableRow>
                {header.map((column) => (
                  <TableCell key={column}><b>{column}</b></TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                rows.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      {row.room_number.toUpperCase()}
                    </TableCell>
                    <TableCell>
                      {row.price} Ar
                    </TableCell>
                    <TableCell>
                      {row.number_of_person} personne(s)
                    </TableCell>
                    <TableCell>
                      {row.description.replace(/:/g, " - ")}
                    </TableCell>
                    <TableCell>
                      {row.img_url}
                    </TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <Button onClick={()=>{getRoomData(row.room_number)}} startIcon={<BorderColorIcon/>} variant='contained' color="primary" style={{fontWeight:'bolder'}}>
                          Modifier
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
            
          </TableComponent>
        </Card>
      </ContainerComponent>
      <ToastContainer/>
    </>
  );
}
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}
