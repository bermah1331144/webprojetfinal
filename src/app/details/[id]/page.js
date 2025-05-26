"use client";
import "../../(style)/detailsStyle.sass";
import './style.sass';
import { useEffect, useState } from "react";
import { use } from "react"; // ← pour unwrap params
import usePanier from '../../(hook)/panier-backend';
import Notification from '../../(composant)/notification';
import CommentaireSection from "./commentaireSection";

export default function PageDetails({ params }) {
    const { id } = use(params); // ✅ unwrap proprement le paramètre

    const [item, setItem] = useState(null);
    const { addToCart, notificationMessage, showNotification, closeNotification } = usePanier();

    useEffect(() => {
        async function getItem() {
            try {
                const response = await fetch(`https://projet-prog4e09.cegepjonquiere.ca/api/Items/${id}`);
                const data = await response.json();
                setItem(data);
            } catch (error) {
                console.error("Erreur lors de la recherche du produit", error);
            }
        }

        getItem();
    }, [id]);

    if (!item) return <p>Chargement...</p>;

    return (
        <>
            <Notification
                message={notificationMessage}
                visible={showNotification}
                duration={3000}
                onClose={closeNotification}
            />
            <div id="backgroundAfficheProduit" className="pt-5 py-5">
                <div id="afficheProduit" className="container-fluid">
                    <div id="boiteProduit">
                        <h1>{item.nom}</h1>
                        <div className="row justify-content-center">
                            <img src={item.imgLien} alt={item.nom} className="img-fluid col-md-3" />
                            <div className="col-12 text-center">
                                <h2>Description</h2>
                                <p>{item.description}</p>
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={() => addToCart(item)}>
                            <i className="bi bi-bag pe-2"></i>Ajouter au panier
                        </button>

                        <div className="zoneCommentaire mt-5">
                            <h3>Commentaires</h3>
                            <CommentaireSection idItem={id} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
