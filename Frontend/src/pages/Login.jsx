import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import '../assets/css/Login.css';

const API_URL = import.meta.env.VITE_API_BASE_URL;

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            toast.error('Completá todos los campos');
            return;
        }
        setLoading(true);
        try {
            const { data } = await axios.post(`${API_URL}/api/auth/login`, form);
            localStorage.setItem('token', data.token);
            const decodedUser = jwtDecode(data.token); //para leer el token y obtener el rol del usuario
            localStorage.setItem('user', JSON.stringify(decodedUser)); //guardar el rol del usuario en localStorage
            toast.success('Sesión iniciada');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">Iniciar sesión</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        className="login-input"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <button className="login-btn" type="submit" disabled={loading}>
                        {loading ? 'Ingresando...' : 'Entrar'}
                    </button>
                    <button className="login-btn-secondary" type="button" onClick={() => navigate('/register')}>
                        Crear cuenta
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
