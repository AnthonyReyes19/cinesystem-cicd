import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sala from './pages/SalaCine';
import Ticket from './pages/Ticket';
import './App.css';

function App() {
  return (
    <div className="app-main">
      <nav>
        <h2>🎬 CineSystem - Grupo 5</h2>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sala" element={<Sala />} />
        <Route path="/ticket" element={<Ticket />} />
      </Routes>
    </div>
  );
}

export default App;