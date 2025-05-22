import Link from "next/link";

export default function({item, addToCart}){
    return <>
        <div className="catalogue-card" key={item.id}>
                <div className="image-wrapper">
                    <img src={item.imgLien} alt={item.nom} />
                </div>
                <div className="card-catalogue">
                    <h3>{item.nom}</h3>
                    <p className="description">{item.description}</p>
                    <p><strong>Rareté :</strong> {item.rarity}</p>
                    <p className="prix"><strong>Prix :</strong> {item.prixAchat} $</p>
                    <div className="row justify-content-around">
                        <Link href={`/details/${item.id}`} className="card-button col-5">
                            Voir détails
                        </Link>
                        <button onClick={() => addToCart(item)} className="col-5">🛒</button>
                    </div>
                </div>
        </div>
    </>
}