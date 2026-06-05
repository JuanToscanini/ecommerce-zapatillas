import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Catalogo from './pages/Catalogo';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './App.css';
import FormProduct from './pages/FormProduct';
import DetailProduct from './pages/DetailProduct';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from './pages/Users';
import MyProfile from './pages/MyProfile';
import EditProduct from './pages/EditProduct';
import EditUser from './pages/EditUser';

function App() {
  const links = [
    { href: "/", text: "Inicio" },
    { href: "/catalogo/hombres", text: "Hombres" },
    { href: "/catalogo/ninos", text: "Niños" },
    { href: "/catalogo/mujer", text: "Mujer" },
    { href: "/contacto", text: "Contacto" },
    { href: "/crear-producto", text: "Crear Producto" },
    { href: "/producto/:id", text: "Detalle Producto" }
  ];

  return (
    <div className="app-container">
      <NavBar links={links} cantidadCarrito={0} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/catalogo/:categoria" element={<Catalogo />} />
          <Route path="/crear-producto" element={<FormProduct />} />
          <Route path="/producto/:id" element={<DetailProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/usuarios" element={<Users />} />
          <Route path="/mi-perfil" element={<MyProfile />} />
          <Route path="/productos/editar/:id" element={<EditProduct />} />
          <Route path="/usuarios/editar/:id" element={<EditUser />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App
