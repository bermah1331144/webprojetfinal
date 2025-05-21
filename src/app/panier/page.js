"use client";
import React, { useEffect, useState } from 'react';
import PanierItem from './panierItem';
import { recupererPanier, updateQuantite } from '../(js)/panier';
import '../(style)/panier.scss';
import Link from 'next/link';
import DescriptionCommande from '../(composant)/descriptionCommande';

export default function PanierPage() {
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

  const handleQuantiteChange = async (id, newQuantite) => {
    await updateQuantite(id, newQuantite);
    chargerPanier();
  };

  return (
    <div className="container h-80">
      <h1 className="text-center mb-4">Mon Panier</h1>
      <div className="row">
        {/* Colonne gauche : liste des articles */}
        <div className="col-12 col-lg-7 d-flex flex-column align-items-center">
        {articles.length === 0 ? (
            <p>Votre panier est vide.</p>
        ) : (
            articles.map((item) => (
            <div className="w-100 d-flex justify-content-center" key={item.id}>
                <PanierItem
                item={item}
                onQuantiteChange={handleQuantiteChange}
                />
            </div>
            ))
        )}
        </div>

        {/* EN FAIRE UN COMPOSANT A REUTILISER POUR LINTERFACE DE PAYMENT*/}
        <div className="col-12 col-lg-5 mb-4">
          <div className="border border-secondary rounded p-4 sticky-top mt-3 bg-light">
            <h3>Résumé du Panier</h3>
            {articles.map((item) => (
                <div key={item.id}  className="row">
                    <p className='col-8 border border-primary m-0 p-0 ps-1'>{item.nom}</p>
                    <p className='col-1 border border-primary m-0 p-0 text-end pe-1'>{item.quantite}</p>
                    <p className='col-3 border border-primary m-0 p-0 text-end pe-1'>{(item.prixVente * item.quantite).toFixed(2)} $</p>
                </div>
            ))}
            <DescriptionCommande articles={articles}/>
            <Link href="/payment"  className="btn btn-primary w-100 mt-3">Passer commande</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
