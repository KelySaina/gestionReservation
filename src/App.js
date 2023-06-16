import './App.css';
import Landing from './Pages/Landing.jsx';
import Clients from './Pages/Clients.jsx';
import Reserver from './Pages/Reserver';
import DecodeQR from './Pages/DecodeQR'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/clients" element={<Clients/>} />
        <Route path="/reserver" element={<Reserver/>} />
        <Route path="/annulerReserver" element={<DecodeQR/>} />
      </Routes>
    </Router>
  );
}

export default App;
