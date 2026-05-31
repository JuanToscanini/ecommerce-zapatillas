import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../assets/css/DetailProduct.css';

const API_URL = import.meta.env.VITE_API_BASE_URL;

function DetailProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [talle, setTalle] = useState('');

    const handleAddToCart = async () => {
        if (product.stock === 0) {
            toast.warning('Sin stock disponible');
            return;
        }

        const cartId = localStorage.getItem('cartId');

        try {
            await axios.put(`${API_URL}/carts/${cartId}`, {
                productId: product._id,
                quantity: 1
            });
            toast.success('Producto agregado al carrito');
        } catch (err) {
            console.error(err);
            toast.error('Error al agregar al carrito');
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError('Error al cargar el producto');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Producto no encontrado</div>;

    return (
        <main>
            <div className="app-title">
                <h1>Detalle del Producto</h1>
            </div>
            <div className="product-detail-container">
                <div className="product-image-section">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info-section">
                    <h2 className="product-name">{product.name}</h2>
                    {product.badge && <span className="product-badge">{product.badge}</span>}
                    <p className="product-price">${product.price}</p>
                    <p className="product-description">{product.details}</p>
                    <div className="product-meta">
                        <p><strong>Categoría:</strong> {product.category}</p>
                        <p><strong>Stock disponible:</strong> {product.stock} unidades</p>
                    </div>
                    <div className="product-actions">
                        <label className="size-label">
                            Elegir talle:
                            <input
                                type="number"
                                value={talle}
                                onChange={(e) => setTalle(e.target.value)}
                                placeholder="Ej: 42"
                                min="20"
                                max="55"
                                className="size-input"
                            />
                        </label>
                        <button className="add-to-cart-btn" onClick={handleAddToCart}>Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default DetailProduct;
