import '../assets/css/ProductCard.css';

function ProductCard({name, details, price, image,  stock, category, active, badge}) {
    return (
        <article className= "card">
            <div className="imageContainer">
                {badge && <span className="badge">{badge}</span>}
                <img
                    src={image || `https://placehold.co/300x300/e2e8f0/64748b?text=${encodeURIComponent(name || 'Producto')}`}
                    alt={name}
                    className="image"
                />
            </div>
            <div className = "info">
                <p className= "category" >{category}</p>
                <h3 className="name">{name}</h3>
                <div className="priceRow">
                    <span className="price">${price}</span>
                </div>
                {details && <p className="description">{details}</p>}
            </div>
        </article>
    );
}

export default ProductCard;