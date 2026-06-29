import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { FiShoppingCart, FiX, FiMenu } from 'react-icons/fi';
import '../assets/css/NavBar.css';
import useCart from '../hooks/useCart';
import { useState } from 'react';


const categorias = [
    { href: '/productos', text: 'Productos' },
    { href: '/catalogo/hombres', text: 'Hombre' },
    { href: '/catalogo/mujer', text: 'Mujer' },
    { href: '/catalogo/ninos', text: 'Niños' },
    { href: '/contacto', text: 'Contacto' }
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

function NavBar() {
    const navigate = useNavigate();
    useLocation();
    const { cartQuantity } = useCart();

    const tokenData = getTokenData();
    const isLoggedIn = !!tokenData;
    const isAdmin = tokenData?.role === 'admin';
    const [menuAbierto, setMenuAbierto] = useState(false);

    const cerrarMenu = () => setMenuAbierto(false);

    const logout = () => {
        localStorage.removeItem('token');
        cerrarMenu();
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

            {/* Botón hamburguesa — solo visible en mobile */}
            <button className="navbar-hamburger" onClick={() => setMenuAbierto(!menuAbierto)}>
                {menuAbierto ? <FiX /> : <FiMenu />}
            </button>

            {/* Sección 2 — Categorías (desktop) */}
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

            {/* Sección 3 — Acciones (desktop) */}
            <div className="navbar-actions">
                <button className="navbar-cart-btn" onClick={() => navigate('/carrito')}>
                    <FiShoppingCart />
                    Carrito
                    {cartQuantity > 0 && (
                        <span className="navbar-cart-count">{cartQuantity}</span>
                    )}
                </button>

                {isAdmin && (
                    <NavLink to="/usuarios" className="navbar-action-btn">
                        Usuarios
                    </NavLink>
                )}
                {isAdmin && (
                    <NavLink to="/crear-producto" className="navbar-action-btn">
                        Nuevo producto
                    </NavLink>
                )}
                {isLoggedIn && (
                    <NavLink to="/pedidos" className="navbar-action-btn">
                        {isAdmin ? 'Pedidos' : 'Mis pedidos'}
                    </NavLink>
                )}
                {isLoggedIn && (
                    <NavLink to="/mi-perfil" className="navbar-action-btn">
                        Mi perfil
                    </NavLink>
                )}

                {isLoggedIn ? (
                    <button className="navbar-action-btn" onClick={logout}>
                        Cerrar sesión
                    </button>
                ) : (
                    <NavLink to="/login" className="navbar-action-btn">
                        Iniciar sesión
                    </NavLink>
                )}
            </div>

            {/* Overlay oscuro detrás del drawer */}
            {menuAbierto && <div className="navbar-overlay" onClick={cerrarMenu} />}

            {/* Drawer slide-out — solo mobile */}
            <div className={`navbar-drawer${menuAbierto ? ' abierto' : ''}`}>
                <div className="drawer-cats">
                    {categorias.map((cat) => (
                        <NavLink
                            key={cat.href}
                            to={cat.href}
                            end={cat.end}
                            onClick={cerrarMenu}
                            className={({ isActive }) => `navbar-cat${isActive ? ' active' : ''}`}
                        >
                            {cat.text}
                        </NavLink>
                    ))}
                </div>

                <div className="drawer-sep" />

                <div className="drawer-actions">
                    <button className="navbar-cart-btn" onClick={() => { cerrarMenu(); navigate('/carrito'); }}>
                        <FiShoppingCart />
                        Carrito
                        {cartQuantity > 0 && (
                            <span className="navbar-cart-count">{cartQuantity}</span>
                        )}
                    </button>

                    {isAdmin && (
                        <NavLink to="/usuarios" onClick={cerrarMenu} className="navbar-action-btn">
                            Usuarios
                        </NavLink>
                    )}
                    {isAdmin && (
                        <NavLink to="/crear-producto" onClick={cerrarMenu} className="navbar-action-btn">
                            Nuevo producto
                        </NavLink>
                    )}
                    {isLoggedIn && (
                        <NavLink to="/pedidos" onClick={cerrarMenu} className="navbar-action-btn">
                            {isAdmin ? 'Pedidos' : 'Mis pedidos'}
                        </NavLink>
                    )}
                    {isLoggedIn && (
                        <NavLink to="/mi-perfil" onClick={cerrarMenu} className="navbar-action-btn">
                            Mi perfil
                        </NavLink>
                    )}

                    {isLoggedIn ? (
                        <button className="navbar-action-btn" onClick={logout}>
                            Cerrar sesión
                        </button>
                    ) : (
                        <NavLink to="/login" onClick={cerrarMenu} className="navbar-action-btn">
                            Iniciar sesión
                        </NavLink>
                    )}
                </div>
            </div>

        </nav>
    );
}

export default NavBar;
