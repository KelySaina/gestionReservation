import React, { useState }  from 'react';
import QrReader from 'qrcode-reader';
import '../assets/decode.css'
import { Typography } from '@mui/material';
import imgQR from '../assets/qrscan.png'
import { useRef } from 'react';

const QRCodeDecoder = () => {
  const [qrCodeResult, setQRCodeResult] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showInput, setShowInput] = useState(true)
  const [showOk, setShowOk] = useState(false)

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const qr = new QrReader();
          qr.callback = (error, result) => {
            if (error) {
              console.error(error);
              setShowOk(false)
              setQRCodeResult('QR Code non reconnu');
            } else {
              setShowOk(true)
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
        setQRCodeResult('Failed to decode QR code from the image.');
      }
    }
  };

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const ok = ()=>{
    console.log(qrCodeResult.toString().split('_')[1])
  }

  return (
    <>
    <div className='all'>
      <Typography>
        Entrez le <b>QR Code</b> obtenu lors de votre reservation
      </Typography>
      {showInput &&(
        <div>
        <img
          width='200px'
          src={imgQR}
          alt=""
          onClick={handleImageClick}
        />
        <input ref={fileInputRef} style={{display: 'none'}} type="file" accept="image/png" onChange={handleImageUpload} />
        </div>
      )}
    
      
    {selectedImage &&(
      <div className="file-upload">
        <img width='300px' src={selectedImage} alt="Selected QR Code" onClick={handleImageClick} />
        <input ref={fileInputRef} style={{display: 'none'}} type="file" accept="image/png" onChange={handleImageUpload} />
      </div>
    )}
    
    {showOk && (
      <div>
        <p>QR Code Result:</p>
        <button onClick={ok}>ok</button>
      </div>
    )}
    
    </div>
    </>
  );
};

export default QRCodeDecoder;
