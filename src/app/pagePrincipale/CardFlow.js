"use client";
import React, { useEffect, useState } from 'react';

export default function CardFlow() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  const backgroundImages = [
    '/habitat/desert.png',
    '/habitat/mheau.jpg',
    '/habitat/mhforet.jpg',
    '/habitat/mhice2.jpg'
  ];

  useEffect(() => {
    fetch('/api/cards')
      .then(res => res.json())
      .then(data => {
        const mapped = data.map(item => ({
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

  const handleAddToCart = (cardId) => {
    alert(`Partie de monstre ${cardId} ajoutée au panier!`);
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
      <div className="carousel-inner">
        <h2 className="carousel-title">Parties de monstres</h2>

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
                      <button className="cart-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(card.id);
                        }}
                        aria-label="Ajouter au panier"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={goToPrevious} className="nav-button prev-button" aria-label="Précédent" disabled={isAnimating}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button onClick={goToNext} className="nav-button next-button" aria-label="Suivant" disabled={isAnimating}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

              {/* Indicateurs numérotés */}
        <div className="carousel-indicators numbered">
          {/* {cards.map((_, index) => (
            // <button
            //   key={index}
            //   className={`indicator ${index === currentIndex ? 'active' : ''}`}
            //   onClick={() => {
            //     if (!isAnimating) {
            //       setIsAnimating(true);
            //       setCurrentIndex(index);
            //       setTimeout(() => setIsAnimating(false), 500);
            //     }
            //   }}
            //   aria-label={`Aller à la carte ${index + 1}`}
            // >
            //   {index + 1}
            // </button>
          ))} */}
        </div>

      </div>
    </div>
  );
}
