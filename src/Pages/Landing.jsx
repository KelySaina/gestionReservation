import TypeWriterEffectComponent from '../Components/TypeWriterEffectComponent.jsx';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '../assets/bootstrap/css/bootstrap.min.css'
import "../assets/fonts/font-awesome.min.css"
import { Link } from 'react-router-dom';
import HeaderComponent from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';

const Landing = ()=>{



    return(
        <>
            <div id="page-top">
                <HeaderComponent/>
                <header class="masthead" style={{backgroundImage:"url('/images/r11.jpeg')", backgroundSize:'cover'}}>
                    <div class="container">
                        <div class="intro-text">

                            <div class="intro-heading" style={{color:'#e0cc1c', height:'135px'}}><span><TypeWriterEffectComponent text="Des prix abordables:Des chambres confortables:Un sejour inoubliable"/> </span></div>
                            <Link to="/Clients">
                                <Button variant="contained" endIcon={<ArrowForwardIcon />} size="large" style={{backgroundColor:'#e0cc1c', padding:'17px', fontWeight:'bolder'}}>
                                    PARCOURIR
                                </Button>
                            </Link>
                            
                        </div>
                    </div>
                </header>
                <section id="services">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12 text-center">
                                <h2 class="text-uppercase section-heading">Services</h2>
                                <h3 class="text-muted section-subheading">Nous mettons a votre disposition une large gamme de chambres</h3>
                            </div>
                        </div>
                        <div class="row text-center">
                            <div class="col-md-4"><span class="fa-stack fa-4x"><i class="fa fa-circle fa-stack-2x text-primary"></i><i class="fa fa-bed fa-stack-1x fa-inverse"></i></span>
                                <h4 class="section-heading">Confortables</h4>
                                <p class="text-muted">Des chambres confortables pour vos vacances.</p>
                            </div>
                            <div class="col-md-4"><span class="fa-stack fa-4x"><i class="fa fa-circle fa-stack-2x text-primary"></i><i class="fa fa-dollar fa-stack-1x fa-inverse"></i></span>
                                <h4 class="section-heading">Abordables</h4>
                                <p class="text-muted">Des chambres dont les prix vous conviendront.</p>
                            </div>
                            <div class="col-md-4"><span class="fa-stack fa-4x"><i class="fa fa-circle fa-stack-2x text-primary"></i><i class="fa fa-universal-access fa-stack-1x fa-inverse"></i></span>
                                <h4 class="section-heading">Inoubliables</h4>
                                <p class="text-muted">Des chambres qui vous rappelerons votre sejour.</p>
                            </div>
                        </div>
                    </div>
                </section>
                
            </div>
            <Footer/>
        </>
    );

}

export default Landing;