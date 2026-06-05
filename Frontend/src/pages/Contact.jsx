import { useState } from 'react';
import '../assets/css/Contact.css';
import Form from '../components/Form';

function Contact() {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('¡Mensaje enviado! Nos comunicaremos contigo pronto.');
    setContactData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">

        <div className="contact-info">
          <h2 className="contact-title">Contactanos</h2>
          <div className="contact-item">
            <div className="contact-icon">✉</div>
            <div className="contact-text">
              <span>contacto@storeshop.com</span>
              <small>Email</small>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">📍</div>
            <div className="contact-text">
              <span>Concepción del Uruguay</span>
              <small>Ubicación</small>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">📱</div>
            <div className="contact-text">
              <span>@storeshop</span>
              <small>Instagram</small>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <Form title="Enviar mensaje" onSubmit={handleSubmit} submitText="Enviar" message={status}>
            <input
              className="contact-input"
              type="text"
              placeholder="Nombre"
              value={contactData.name}
              onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
            />
            <input
              className="contact-input"
              type="email"
              placeholder="Email"
              value={contactData.email}
              onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
            />
            <textarea
              className="contact-textarea"
              placeholder="Mensaje..."
              value={contactData.message}
              onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
            />
          </Form>
        </div>

      </div>
    </div>
  );
}

export default Contact;
