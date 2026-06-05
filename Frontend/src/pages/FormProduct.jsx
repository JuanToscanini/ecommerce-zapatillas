import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../assets/css/FormProduct.css';
import Form from '../components/Form';

const API_URL = import.meta.env.VITE_API_BASE_URL;

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
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${API_URL}/products`, product);
            setProduct({
                name: '',
                details: '',
                price: '',
                image: '',
                badge: '',
                stock: '',
                category: '',
                active: true
            });
            toast.success('Producto guardado correctamente');
            setMensaje('Producto guardado correctamente');
            setError('');
        } catch (err) {
            console.error(err);
            toast.error('Error al guardar el producto');
            setError('Error al guardar el producto');
            setMensaje('');
        }
    };

    return (
        <main>
            <div className="app-title">
                <h1>Crear Producto</h1>
            </div>
            <Form title="Nuevo producto" onSubmit={handleSubmit} submitText="Crear" message={mensaje} error={error}>
                <input type="text" placeholder="Nombre" value={product.name} onChange={(e) => setProduct({...product, name: e.target.value})} />
                <input type="number" placeholder="Precio" value={product.price} onChange={(e) => setProduct({...product, price: e.target.value})} />
                <input type="text" placeholder="Descripción" value={product.details} onChange={(e) => setProduct({...product, details: e.target.value})} />
                <input type="text" placeholder="Badge" value={product.badge} onChange={(e) => setProduct({...product, badge: e.target.value})} />
                <input type="text" placeholder="Categoría" value={product.category} onChange={(e) => setProduct({...product, category: e.target.value})} />
                <input type="number" placeholder="Stock" value={product.stock} onChange={(e) => setProduct({...product, stock: e.target.value})} />
                <input type="text" placeholder="Imagen (URL)" value={product.image} onChange={(e) => setProduct({...product, image: e.target.value})} />
                <label>
                    Activo
                    <input type="checkbox" checked={product.active} onChange={(e) => setProduct({...product, active: e.target.checked})} />
                </label>
            </Form>
        </main>
    );
}

export default FormProduct;