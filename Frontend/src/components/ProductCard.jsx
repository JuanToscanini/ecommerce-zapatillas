import '../assets/css/ProductCard.css';

function ProductCard({nombre, precio, descripcion, imagen, categoria, badge }) {
    return (
        <article className= "card">
            <div className="imageContainer">
                {badge && <span className="badge">{badge}</span>}
                <img
                    src={imagen || 'https://via.placeholder.com/300'}
                    alt={nombre}
                    className="image"
                />
            </div>
            <div className = "info">
                <p className= "category" >{categoria}</p>
                <h3 className="name">{nombre}</h3>
                <div className="priceRow">
                    <span className="price">${precio}</span>
                </div>
                {descripcion && <p className="description">{descripcion}</p>}
            </div>
        </article>
    );
}

export default ProductCard;