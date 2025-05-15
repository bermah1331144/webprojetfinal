"use client";
import React, { useEffect, useState } from 'react';

export default function CardFlow() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const backgroundImages = [
    '/habitat/desert.png',
    '/habitat/mheau.jpg',
    '/habitat/mhforet.jpg',
    '/habitat/mhice2.jpg'
  ];

  useEffect(() => {
    fetch('/api/cards?page=1&limit=100')
      .then(res => res.json())
      .then(data => {
        const source = Array.isArray(data) ? data : data.items;
        const mapped = source.map(item => ({
          id: item.Id,
          title: item.Nom,
          imageUrl: item.imgLien || '/api/placeholder/400/320',
          description: item.description || `Rareté ${item.Rarity} - Prix: ${item.PrixAchat}z`
        }));
        setCards(mapped);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const totalCards = cards.length;

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % totalCards);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const addToCart = (cardId, cardTitle) => {
    console.log("Ajout au panier: ", cardId, cardTitle); // Vérifier dans la console
    
    // Augmenter le compteur global du panier
    setCartCount(prev => prev + 1);
    
    // Mettre à jour le nombre d'articles pour ce produit
    setCartItems(prev => {
      const newItems = { ...prev };
      if (newItems[cardId]) {
        newItems[cardId] = newItems[cardId] + 1;
      } else {
        newItems[cardId] = 1;
      }
      return newItems;
    });
    
    // Afficher la notification
    setNotificationMessage(`${cardTitle} a été ajouté au panier!`);
    setShowNotification(true);
    
    // Masquer la notification après 3 secondes
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const getCardClassName = (index) => {
    const relativeIndex = (index - currentIndex + totalCards) % totalCards;
    if (relativeIndex === 0) return 'card-active';
    if (relativeIndex === 1) return 'card-adjacent-right';
    if (relativeIndex === totalCards - 1) return 'card-adjacent-left';
    if (relativeIndex === 2) return 'card-far-right';
    if (relativeIndex === totalCards - 2) return 'card-far-left';
    return 'card-hidden';
  };

  return (
    <div className="carousel-container">
      {showNotification && (
        <div className="notification-wrapper">
          <div className="notification">
            {notificationMessage}
          </div>
        </div>
      )}
      
      <div className="carousel-inner">
        <div className="header-with-cart">
          <h2 className="carousel-title">Parties de monstres</h2>
          <div className="cart-icon">
            🛒 <span className="cart-count">{cartCount}</span>
          </div>
        </div>

        <div className="carousel-perspective">
          <div className="carousel-background"
            style={{
              backgroundImage: `url(${backgroundImages[bgIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'background-image 1s ease-in-out'
            }}>
            <div className="grid-pattern"></div>
          </div>

          <div className="carousel-stage">
            {cards.map((card, index) => (
              <div key={card.id} className={`carousel-card ${getCardClassName(index)}`}>
                <div className="card-content">
                  <div className="card-image">
                    <img src={card.imageUrl} alt={card.title} />
                    <div className="image-overlay"></div>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-description">{card.description}</p>
                    <div className="card-actions">
                      <button className="card-button">Voir détails</button>
                      <button 
                        className="cart-button"
                        onClick={() => addToCart(card.id, card.title)}
                      >
                        🛒 {cartItems[card.id] ? <span className="item-count">{cartItems[card.id]}</span> : ""}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={goToPrevious} className="nav-button prev-button" aria-label="Précédent" disabled={isAnimating}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button onClick={goToNext} className="nav-button next-button" aria-label="Suivant" disabled={isAnimating}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
