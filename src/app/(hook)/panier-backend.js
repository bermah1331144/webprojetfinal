"use client";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../(hook)/auth";
export default function usePanierBackend() {
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
      setIsLoggedIn(isAuthenticated());
  }, []);

  const addToCart = (item) => {
    if (!isLoggedIn) {
      setNotificationMessage("Veuillez vous connecter pour ajouter un article au panier.");
      setShowNotification(true);
      return;
    }
    addItemCommande(item.id, 1);
    setNotificationMessage(`${item.nom} a été ajouté au panier !`);
    setShowNotification(true);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };
  
  return {
    addToCart,
    notificationMessage,
    showNotification,
    closeNotification,
  };
}

export async function addItemCommande(idItem, quantite){
  const rawToken = localStorage.getItem('token');
  const token = rawToken?.replace(/^"(.*)"$/, '$1');
  const commande = await recupererPanier();
  const idCommande = commande.id;

  try {
    const response = await fetch(`https://projet-prog4e09.cegepjonquiere.ca/api/CommandeItems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({commandeId: idCommande, itemId: idItem, quantite })
    });
  }
  catch (error) {
    console.error("Erreur lors de l'ajout de l'item au panier :", error);
  }
}

export async function recupererPanier() {
  const rawToken = localStorage.getItem('token');
  const token = rawToken?.replace(/^"(.*)"$/, '$1');

  const response = await fetch(`https://projet-prog4e09.cegepjonquiere.ca/api/Commandes/activeCommande`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) throw new Error("Échec de la récupération du panier");

  const commande = await response.json();
  return commande || [];
}
export async function completerCommande() {
  const rawToken = localStorage.getItem('token');
  const token = rawToken?.replace(/^"(.*)"$/, '$1');

  const commande = await recupererPanier();

  const response = await fetch(`https://projet-prog4e09.cegepjonquiere.ca/api/Commandes/completeCommande/${commande.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) throw new Error("Échec de la récupération du panier");

  return await response.json();
}
