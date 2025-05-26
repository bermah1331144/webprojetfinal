"use client";
import React, { useEffect, useState } from 'react';
import PanierItem from './panierItem';
import { recupererPanier, addItemCommande } from '../(hook)/panier-backend';
import '../(style)/panier.scss';
import Link from 'next/link';
import DescriptionCommande from '../(composant)/descriptionCommande';
import { isAuthenticated } from '../(hook)/auth';

export default function PanierPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/pagePrincipale";
    }
    if (typeof window !== 'undefined') {
      chargerPanier();
    }
    console.log(articles);
  }, []);

  const chargerPanier = async () => {
    const data = await recupererPanier();
    setArticles(data.items);
    console.log(articles);
  };

  const handleQuantiteChange = async (id, newQuantite) => {
    await addItemCommande(id, newQuantite);
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

        <div className="col-12 col-lg-5 mb-4">
          <div className="border border-secondary rounded p-4 sticky-top mt-3 bg-light">
            <DescriptionCommande articles={articles}/>
            <Link href="/Payment" className={`btn btn-primary w-100 mt-3 ${articles.length === 0 ? 'disabled' : ''}`} style={articles.length === 0 ? { pointerEvents: 'none' } : {}}>
              Passer commande
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
