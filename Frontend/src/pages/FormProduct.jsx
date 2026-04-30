import { useState } from 'react';
import '../assets/css/FormProduct.css';

function FormProduct() {
    const [product, setProduct] = useState({
        name: '',
        details: '',
        price: '',
        image: '',
        badge: '',
        stock: '',
        category: '',
        active: true    
        
    });
    return (
        <main>
            <div className="app-title">
                <h1>Crear Producto</h1>
            </div>
            <form className="form-product">
                <input type="text" placeholder="Nombre" value={product.name} onChange={(e) => setProduct({...product, name: e.target.value})} />
                <input type="number" placeholder="Precio" value={product.price} onChange={(e) => setProduct({...product, price: e.target.value})} />
                <input type="text" placeholder="details" value={product.details} onChange={(e) => setProduct({...product, details: e.target.value})} />
                <input type="text" placeholder="badge" value={product.badge} onChange={(e) => setProduct({...product, badge: e.target.value})} />
                <input type="text" placeholder="Categoría" value={product.category} onChange={(e) => setProduct({...product, category: e.target.value})} />
                <input type="number" placeholder="Stock" value={product.stock} onChange={(e) => setProduct({...product, stock: e.target.value})} />
                <input type="text" placeholder="Imagen" value={product.image} onChange={(e) => setProduct({...product, image: e.target.value})} />
                <input type="checkbox" placeholder="Activo" value={product.active} onChange={(e) => setProduct({...product, active: e.target.checked})} />
                <button type="submit">Crear</button>
            </form>
        </main>
    );
}

export default FormProduct;