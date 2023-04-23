import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ReservationScreen from './screens/ReservationScreen';
import Navbar from './components/Navbar.js';
import Dashboard from './screens/Dashboard';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ReservationScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
