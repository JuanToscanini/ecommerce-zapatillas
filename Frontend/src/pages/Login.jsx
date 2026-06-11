import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import Form from '../components/Form';

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
        <div className="login-page auth-page">
            <Form
                title="Iniciar sesión"
                onSubmit={handleSubmit}
                submitText={loading ? 'Ingresando...' : 'Entrar'}
                submitDisabled={loading}
                className="auth-form-card"
            >
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
            </Form>
            <p className="auth-note">
                ¿Aun no tenés cuenta? <a href="/register">Registrar sesión</a>
            </p>
        </div>
    );
}

export default Login;
