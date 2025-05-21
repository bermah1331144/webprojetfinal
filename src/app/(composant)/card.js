import Link from "next/link";

export default function({item}){
    return <>
        <div key={item.id} className={`carousel-card ${getCardClassName(index)}`}>
            <div className="card-content">
                <div className="card-image">
                    <img src={item.imgLien} alt={item.title} />
                    <div className="image-overlay"></div>
                </div>
                <div className="card-body">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-description">{item.description}</p>
                    <p className='card-description fw-bold'>Rareté: {item.rarity}</p>
                    <p className='card-description fw-bold'>Prix: {item.prixAchat}$</p>
                    <div className="card-actions">
                        <Link href={`/details/${item.id}`} className="card-button">
                            Voir détails
                        </Link>
                        <button className="cart-button" onClick={() => addToCart(item)}>🛒 </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}