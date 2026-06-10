import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Form from '../components/Form';
import '../assets/css/Users.css';

const API_URL = import.meta.env.VITE_API_BASE_URL;

function getRole() {
    try {
        const token = localStorage.getItem('token');
        if (!token) return null;
        return JSON.parse(atob(token.split('.')[1])).role;
    } catch {
        return null;
    }
}

function Users() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (getRole() !== 'admin') {
            navigate('/');
            return;
        }
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`${API_URL}/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(data);
        } catch {
            toast.error('Error al cargar usuarios');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password) {
            toast.error('Completá todos los campos');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_URL}/users`, form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Usuario creado');
            setForm({ name: '', email: '', password: '', role: 'user' });
            fetchUsers();
        } catch (err) {
            toast.error(err.response?.data?.error || 'Error al crear usuario');
        }
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <div className="users-page">
            <div className="users-container">
                <h2 className="page-heading">Usuarios</h2>
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u._id}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.role}</td>
                                <td>
                                    <button
                                        className="app-btn"
                                        onClick={() => navigate(`/usuarios/editar/${u._id}`)}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Form title="Nuevo usuario" onSubmit={handleSubmit} submitText="Crear usuario" className="users-form-card">
                    <input type="text" placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <input type="password" placeholder="Contraseña" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                        <option value="user">Cliente</option>
                        <option value="admin">Admin</option>
                    </select>
                </Form>
            </div>
        </div>
    );
}

export default Users;
