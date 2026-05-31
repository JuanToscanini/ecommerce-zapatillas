import '../assets/css/Contact.css';

function Contact() {
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
          <input className="contact-input" type="text" placeholder="Nombre" />
          <input className="contact-input" type="email" placeholder="Email" />
          <textarea className="contact-textarea" placeholder="Mensaje..."></textarea>
          <button className="contact-btn">Enviar</button>
        </div>

      </div>
    </div>
  );
}

export default Contact;
