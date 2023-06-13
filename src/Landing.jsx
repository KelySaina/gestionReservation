import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/Carousel.css'
import TypeWriterEffectComponent from '../Components/TypeWriterEffectComponent';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TabComponent from '../Components/TabComponent'


const Landing = ()=>{

    const images=[
        '/images/r1.jpeg',
        '/images/r2.jpeg',
        '/images/r3.jpeg',
        '/images/r4.jpeg',
        '/images/r7.jpeg',
        '/images/r8.jpeg',
        '/images/r9.jpeg',
    ]
    return(
        <>

            <div  style={{
                display: 'flex',
                justifyContent: 'space-around',
                height: '100vh'
            }}>
                <div style={{width: "60%", backgroundImage:'url("/images/bg.jpeg")',backgroundRepeat: 'no-repeat', backgroundSize: 'cover', position:'relative', padding:'5px'}}>
                    <div style={{color:'whitesmoke', height: '80px', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', marginTop: '5px'}}>
                       <h2>BIENVENUE SUR LA PAGE EN LIGNE DE <span> KS </span> HOTEL</h2> 
                       <i>"La reference hoteliere de la grande ville"</i>
                    </div>                    

                    <div style={{display: 'flex', alignItems:'center', justifyContent:'space-between'}}>
                        <div>
                            <div className='typeWriterText'>
                                <h3>
                                    Des chambres <TypeWriterEffectComponent text="abordables:confortables:inoubliables"/> 
                                </h3>
                                <p>
                                    <Button variant="contained" endIcon={<ArrowForwardIcon />} size='large'>
                                        PARCOURIR
                                    </Button>
                                </p>
                            </div>
                            
                        </div>
                        <div style={{width: "50%", float: 'right', marginRight:'-25%', marginTop:'6vh', position: 'relative', zIndex: 2}}>
                            <Carousel showThumbs={false} autoPlay={true} interval={5000} infiniteLoop={true} showArrows={false} showStatus={false} showIndicators={false} stopOnHover={false} transitionTime={2000}>
                                {images.map((image, index) => (
                                    <div key={index} className='carouselDiv'>
                                        <img src={image} alt={`Slide ${index}`} />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        
                    </div>
                    
                    
                    
                </div>
                <div style={{width: "38%"}}>
                    <TabComponent/>
                </div>
                
            </div>
            
                
        </>
    )

}

export default Landing;