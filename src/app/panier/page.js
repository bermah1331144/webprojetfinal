"use client";
import React, { useEffect, useState } from 'react';
import PanierItem from './panierItem';
import { recupererPanier, updateQuantite } from '../(js)/panier';
import '../(style)/panier.scss';

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
    if (newQuantite < 1) return;
    await updateQuantite(id, newQuantite);
    chargerPanier();
  };
  
  const totalArticles = articles.reduce((acc, item) => acc + item.quantite, 0);
  const totalPrixHT = articles.reduce((acc, item) => acc + item.prixVente * item.quantite, 0);
  const TVQ = totalPrixHT * 0.0975;
  const TPS = totalPrixHT * 0.05;

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
            <div className="row">
                <p className='col-8 border border-primary m-0 p-0 ps-1'><strong>Sous total</strong></p>
                <p className='col-1 border border-primary m-0 p-0 text-end pe-1'>{totalArticles}</p>
                <p className='col-3 border border-primary m-0 p-0 text-end pe-1'>{totalPrixHT} $</p>
                <p className='col-9 border border-primary m-0 p-0 ps-1'><strong>TVQ</strong></p>
                <p className='col-3 border border-primary m-0 p-0 text-end pe-1'>{TVQ.toFixed(2)} $</p>
                <p className='col-9 border border-primary m-0 p-0 ps-1'><strong>TPS</strong></p>
                <p className='col-3 border border-primary m-0 p-0 text-end pe-1'>{TPS.toFixed(2)} $</p>
                <p className='col-9 border border-primary m-0 p-0 ps-1'><strong>Total</strong></p>
                <p className='col-3 border border-primary m-0 p-0 text-end pe-1'><strong>{(totalPrixHT + TVQ + TPS).toFixed(2)} $</strong></p>
            </div>
            <button className="btn btn-primary w-100 mt-3">
              Valider la commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
