import NavBar from '../components/NavBar'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import { useState } from 'react';


function Home() {
    const [count, setCount] = useState(0);
    const links = [
        { href: "/", text: "Inicio" },
        { href: "/catalogo/hombres", text: "Hombres" },
        { href: "/catalogo/ninos", text: "Niños" },
        { href: "/catalogo/mujer", text: "Mujer" },
        { href: "/contacto", text: "Contacto" }
    ];
  return (
    <div >
      <NavBar links={links} cantidadCarrito={0} />
      <main>
        <div className="app-title">
          <h1>Store Shop</h1>
        </div>
        <div>
          <ProductCard nombre="Producto 1" precio={100} badge="Nuevo" categoria="Hombres" descripcion="Descripcion del producto 1" imagen="/imgProduct/Shoes.png"/>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default Home