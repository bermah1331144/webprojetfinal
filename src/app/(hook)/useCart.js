import { useState, useEffect } from "react";
import { ajouterOuMettreAJourArticle } from "./panier";

export default function useCart() {
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("userAuth");
    if (user !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  const addToCart = (item) => {
    if (!isLoggedIn) {
      setNotificationMessage("Veuillez vous connecter pour ajouter un article au panier.");
      setShowNotification(true);
      return;
    }
    ajouterOuMettreAJourArticle(item);
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