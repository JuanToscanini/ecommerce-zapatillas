import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import '../assets/css/Cart.css';

const formatARS = (value) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);

function Cart() {
    const { cartItems, increaseQty, decreaseQty, removeFromCart, clearCart, cartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty">
                <p className="cart-empty__msg">Tu carrito está vacío</p>
                <Link to="/catalogo/hombres" className="app-btn cart-empty__link">
                    Ver productos
                </Link>
            </div>
        );
    }

    function handleClearCart() {
        if (window.confirm('¿Vaciar el carrito? Se eliminarán todos los productos.')) {
            clearCart();
        }
    }

    return (
        <div className="cart-page">
            <h1 className="cart-title">Tu carrito</h1>

            <ul className="cart-list">
                {cartItems.map((item) => (
                    <li key={item._id} className="cart-item">
                        <img
                            className="cart-item__img"
                            src={item.imagen || `https://placehold.co/80x80/eaebec/999999?text=${encodeURIComponent(item.nombre || 'Producto')}`}
                            alt={item.nombre}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://placehold.co/80x80/eaebec/999999?text=${encodeURIComponent(item.nombre || 'Producto')}`;
                            }}
                        />

                        <div className="cart-item__info">
                            <p className="cart-item__name">{item.nombre}</p>
                            <p className="cart-item__unit">{formatARS(item.precio)} c/u</p>
                        </div>

                        <div className="cart-item__qty">
                            <button
                                className="qty-btn"
                                onClick={() => decreaseQty(item._id)}
                                aria-label="Disminuir cantidad"
                            >
                                −
                            </button>
                            <span className="qty-value">{item.quantity}</span>
                            <button
                                className="qty-btn"
                                onClick={() => increaseQty(item._id)}
                                aria-label="Aumentar cantidad"
                            >
                                +
                            </button>
                        </div>

                        <p className="cart-item__subtotal">{formatARS(item.precio * item.quantity)}</p>

                        <button
                            className="cart-item__remove"
                            onClick={() => removeFromCart(item._id)}
                            aria-label="Eliminar producto"
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>

            <div className="cart-footer">
                <p className="cart-total">
                    Total: <strong>{formatARS(cartTotal)}</strong>
                </p>
                <div className="cart-footer__actions">
                    <button className="app-btn cart-btn--clear" onClick={handleClearCart}>
                        Vaciar carrito
                    </button>
                    <button className="app-btn cart-btn--checkout">
                        Finalizar compra
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
