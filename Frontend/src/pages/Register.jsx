import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../assets/css/Register.css';

const API_URL = import.meta.env.VITE_API_BASE_URL;

function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password) {
            toast.error('Completá todos los campos');
            return;
        }
        setLoading(true);
        try {
            await axios.post(`${API_URL}/users`, form);
            toast.success('Cuenta creada. Podés iniciar sesión.');
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Error al registrarse');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <h2 className="register-title">Crear cuenta</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <input
                        className="register-input"
                        type="text"
                        placeholder="Nombre"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                        className="register-input"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                        className="register-input"
                        type="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <button className="register-btn" type="submit" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>
                <p className="register-login">
                    ¿Ya tenés cuenta? <a href="/login">Iniciar sesión</a>
                </p>
            </div>
        </div>
    );
}

export default Register;
