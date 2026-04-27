import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Contact from './pages/contact';
import Catalogo from './pages/catalogo';
import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/catalogo/:categoria" element={<Catalogo />} />
      </Routes>
    </div>
    
  );
}

export default App
