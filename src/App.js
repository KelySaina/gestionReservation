import './App.css';
import Landing from './Pages/Landing.jsx';
import Clients from './Pages/Clients.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/Clients" element={<Clients/>} />
      </Routes>
    </Router>
  );
}

export default App;
