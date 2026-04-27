import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function Contact() {
    const links = [
        { href: "/", text: "Inicio" },
        { href: "/catalogo/hombres", text: "Hombres" },
        { href: "/catalogo/ninos", text: "Niños" },
        { href: "/catalogo/mujer", text: "Mujer" },
        { href: "/contacto", text: "Contacto" }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NavBar links={links} cantidadCarrito={0} />
            <main>
                <div className="app-title">
                    <h1>Store Shop</h1>
                </div>
                <div>
                    <h1>Contacto</h1>
                    <p>Email: contacto@storeshop.com</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Contact;
