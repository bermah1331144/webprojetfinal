import Link from "next/link";

export default function Card({ item }) {
    return (
        <Link href={`/modifierItem/${item.id}`} className="catalogue-card">
                <div className="image-wrapper">
                    <img src={item.imgLien} alt={item.nom} />
                </div>
                <div className="card-catalogue">
                    <h3>{item.nom}</h3>
                    <p className="description">{item.description}</p>
                    <p><strong>Rareté :</strong> {item.rarity}</p>
                    <p className="prix"><strong>Prix :</strong> {item.prixAchat} $</p>
                
                </div>
        </Link>
    );
}