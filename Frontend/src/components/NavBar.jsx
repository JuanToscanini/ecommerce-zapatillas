import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import '../assets/css/NavBar.css';

const categorias = [
    { href: '/', text: 'Inicio', end: true },
    { href: '/catalogo/hombres', text: 'Hombre' },
    { href: '/catalogo/mujer', text: 'Mujer' },
    { href: '/catalogo/ninos', text: 'Niños' },
];

function getTokenData() {
    try {
        const token = localStorage.getItem('token');
        if (!token) return null;
        return JSON.parse(atob(token.split('.')[1]));
    } catch {
        return null;
    }
}

function NavBar({ cantidadCarrito }) {
    const navigate = useNavigate();
    useLocation();

    const tokenData = getTokenData();
    const isLoggedIn = !!tokenData;
    const isAdmin = tokenData?.role === 'admin';

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">

            {/* Sección 1 — Logo */}
            <div className="navbar-logo">
                <NavLink to="/" className="navbar-brand">
                    STORE <span className="brand-dot">·</span> SHOP
                </NavLink>
            </div>
            <div className="navbar-sep" />

            {/* Sección 2 — Categorías */}
            <div className="navbar-cats">
                {categorias.map((cat) => (
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
            <div className="navbar-sep" />

            {/* Sección 3 — Acciones */}
            <div className="navbar-actions">
                <button className="navbar-cart-btn" onClick={() => navigate('/carrito')}>
                    <FiShoppingCart />
                    Carrito
                    {cantidadCarrito > 0 && (
                        <span className="navbar-cart-count">{cantidadCarrito}</span>
                    )}
                </button>

                {isAdmin && (
                    <NavLink to="/usuarios" className="navbar-action-link">
                        Usuarios
                    </NavLink>
                )}

                {isLoggedIn ? (
                    <button className="navbar-auth-btn" onClick={logout}>
                        Cerrar sesión
                    </button>
                ) : (
                    <NavLink to="/login" className="navbar-auth-btn">
                        Iniciar sesión
                    </NavLink>
                )}
            </div>

        </nav>
    );
}

export default NavBar;
