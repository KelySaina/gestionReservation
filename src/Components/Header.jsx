import '../assets/bootstrap/css/bootstrap.min.css'
import { Link } from 'react-router-dom';

const HeaderComponent = () =>{
    return(
        <div>
            <nav class="navbar navbar-dark navbar-expand-lg fixed-top bg-dark" id="mainNav">
                <div class="container" style={{display:'flex', alignItems:'center', justifyContent: 'space-evenly'}}>
                    <Link to="/" class="navbar-brand" href="#page-top">KS Hotel</Link>
                    <div class="intro-lead-in"><span style={{color:'whitesmoke'}}>"La reference hoteliere de la grande ville"</span></div>
                </div>
            </nav>
        </div>

    );
}

export default HeaderComponent;