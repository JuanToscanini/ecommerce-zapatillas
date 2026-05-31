import { NavLink } from 'react-router-dom';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import '../assets/css/NavBar.css';

const cats = [
    { href: '/', text: 'Inicio', end: true },
    { href: '/catalogo/hombres', text: 'Hombres' },
    { href: '/catalogo/mujer', text: 'Mujer' },
    { href: '/catalogo/ninos', text: 'Niños' },
    { href: '/contacto', text: 'Contacto' },
    { href: '/crear-producto', text: 'Crear Producto' },
];

function NavBar({ cantidadCarrito }) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <NavLink to="/" className="navbar-brand">
                    <span className="brand-text">STORE</span>
                    <span className="brand-dot"></span>
                    <span className="brand-text">SHOP</span>
                </NavLink>
                <div className="navbar-cats">
                    {cats.map((cat) => (
                        <NavLink
                            key={cat.href}
                            to={cat.href}
                            end={cat.end}
                            className={({ isActive }) => `navbar-cat${isActive ? ' active' : ''}`}
                        >
                            {cat.text}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className="navbar-right">
                <FiSearch className="navbar-icon" />
                <div className="navbar-cart">
                    <FiShoppingCart className="navbar-icon" />
                    {cantidadCarrito > 0 && (
                        <span className="navbar-cart-count">{cantidadCarrito}</span>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
