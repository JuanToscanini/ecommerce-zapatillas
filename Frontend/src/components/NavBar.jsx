import { Link, useLocation } from 'react-router-dom';
import '../assets/css/NavBar.css';
import { ShoppingCart, SportShoe } from 'lucide-react';

function NavBar({ links, cantidadCarrito }) {
  const location = useLocation(); // para saber en qué página estás
  
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <SportShoe size={35} />
      </Link>

      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              to={link.href} 
              className={location.pathname === link.href ? 'active' : ''}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>

      <div className="cart">
        <ShoppingCart size={25} style={{ marginRight: '1rem' }}/>
        {cantidadCarrito}
      </div>
    </nav>
  );
}

export default NavBar;