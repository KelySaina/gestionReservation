import React, { useState }  from 'react';
import QrReader from 'qrcode-reader';
import '../assets/decode.css'
import { Typography } from '@mui/material';
import imgQR from '../assets/qrscan.png'
import { useRef } from 'react';
import AnnulerReservation from '../Components/annulerReservation';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer'
const QRCodeDecoder = () => {
  const [qrCodeResult, setQRCodeResult] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showInput, setShowInput] = useState(true)
  const [showOk, setShowOk] = useState(false)
  const [showNotOk, setShowNotOk] = useState(false)

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const qr = new QrReader();
          qr.callback = (error, result) => {
            if (error) {
              setShowOk(false)
              setShowNotOk(true)
              setQRCodeResult('QR Code non reconnu');
            } else {
              setShowOk(true)
              setShowNotOk(false)
              setQRCodeResult(result.result);
            }
          };
          qr.decode(e.target.result);
          setSelectedImage(URL.createObjectURL(file));
          setShowInput(false)

        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error(error);
        setQRCodeResult('Une erreur s\'est produite lors du scan du code QR');
      }
    }
    
  };

  

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };


  return (
    <>
    <div style={{display:'flex', flexDirection:'column'}}>
      
    
    <div style={{background:'#343a40'}}>
    <p>
      {qrCodeResult.toString().split("_")[qrCodeResult.toString().split("_").length - 1]}
    </p>
      <Link style={{float:'right', margin:'12px'}}  to='/clients'>Retour</Link> 
    </div>
     
    <div className='all' style={{display:'flex', flexDirection:'column', overflowY:'none'}}>
   
      <Typography>
        Votre <b>QR Code</b> de reservation
      </Typography>
      {showInput &&(
        <div style={{marginTop:'50px'}}>
        <img
          width='200px'
          src={imgQR}
          alt=""
          onClick={handleImageClick}
          style={{cursor:'pointer', border:'2.5px solid #e0cc1c', borderRadius:'5px'}}

        />
        <input ref={fileInputRef} style={{display: 'none'}} type="file" accept="image/png" onChange={handleImageUpload} />
        </div>
      )}
    
      
    {selectedImage &&(
      <div className="file-upload">
        <img width='200px' src={selectedImage} alt="Selected QR Code" onClick={handleImageClick} />
        <input ref={fileInputRef} style={{display: 'none'}} type="file" accept="image/png" onChange={handleImageUpload} />
      </div>
    )}
    
    {showOk && (
      <div>
        <AnnulerReservation id={qrCodeResult.toString().split('_')[1]} time={qrCodeResult.toString().split('_')[qrCodeResult.toString().split('_').length - 1]}/>
      </div>
    )}
    
    {showNotOk && (
      <div>
        <p>{qrCodeResult}</p>
      </div>
    )}
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default QRCodeDecoder;
