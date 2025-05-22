'use client';
import StripeWrapper from './StripeWrapper';
import DescriptionCommande from '../(composant)/descriptionCommande';
import { useEffect, useState } from 'react';
import { recupererPanier } from '../(hook)/panier';

export default function PaymentPage() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
        chargerPanier();
        }
    }, []);

    const chargerPanier = async () => {
        const data = await recupererPanier();
        setArticles(Array.isArray(data) ? data : []);
    };
    const totalPrixHT = articles.reduce((acc, item) => acc + item.prixVente * item.quantite, 0);
    const TVQ = totalPrixHT * 0.0975;
    const TPS = totalPrixHT * 0.05;
    return <>
        <div className='container py-5 h-80 justify-content-center align-items-center'>
            <div className='row'>
                <div className="col-6 px-5">
                    <h1>Paiement</h1>  
                    <StripeWrapper prixTotal={(totalPrixHT + TVQ + TPS).toFixed(2)}/>
                </div>
                <div className="col-6 px-5">
                    <h3>Descripton de la commande</h3> 
                    <DescriptionCommande articles={articles} />
                </div>
            </div>
        </div>
    </>
}
