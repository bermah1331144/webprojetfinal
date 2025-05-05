"use client";
import React, { useEffect, useState } from 'react';


export default function CardCarousel({ cards = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);


  const backgroundImages = [
    '/habitat/desert.png',
    '/habitat/mheau.jpg',
    '/habitat/mhforet.jpg',
    '/habitat/mhice2.jpg'
  ]; // remplace avec les noms de tes vraies images
  
  const [bgIndex, setBgIndex] = useState(0);
  
  // Changement de fond toutes les 10 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 20000); // 10 secondes
  
    return () => clearInterval(interval);
  }, []);
  
  
  // Si aucune carte n'est fournie, utiliser des données d'exemple
  const defaultCards = [
    {
      id: 1,
      title: 'Dragon Noir',
      imageUrl: '/api/placeholder/400/320',
      description: 'Un monstre puissant avec des attaques de feu.'
    },
    {
      id: 2,
      title: 'Golem de Pierre',
      imageUrl: '/api/placeholder/400/320',
      description: 'Une créature résistante aux attaques physiques.'
    },
    {
      id: 3,
      title: 'Magicien Mystique',
      imageUrl: '/api/placeholder/400/320',
      description: 'Un lanceur de sorts avec des pouvoirs arcanes.'
    },
    {
      id: 4,
      title: 'Sorcière des Marais',
      imageUrl: '/api/placeholder/400/320',
      description: 'Manipule les éléments toxiques et les poisons.'
    },
    {
      id: 5,
      title: 'Chevalier Fantôme',
      imageUrl: '/api/placeholder/400/320',
      description: 'Un guerrier spectral qui hante les champs de bataille.'
    }
  ];
  
  const cardsToShow = cards.length > 0 ? cards : defaultCards;
  const totalCards = cardsToShow.length;
  
  // Ajouter des copies des cartes pour l'effet circulaire
  const extendedCards = [...cardsToShow];
  
  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalCards) % totalCards);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const handleAddToCart = (cardId) => {
    // Fonction à implémenter pour ajouter au panier
    console.log(`Ajouter la carte ${cardId} au panier`);
    alert(`Partie de monstre ${cardId} ajoutée au panier!`);
  };
  
  // Déterminer la classe CSS appropriée pour chaque carte
  const getCardClassName = (index) => {
    // Position relative de la carte par rapport à la carte actuelle
    const relativeIndex = (index - currentIndex + totalCards) % totalCards;
    
    // Retourner la classe appropriée basée sur la position relative
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
          {/* Background avec effet de profondeur */}
          <div className="carousel-background"
            style={{
              backgroundImage: `url(${backgroundImages[bgIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'background-image 1s ease-in-out'
            }}
          >

            <div className="grid-pattern"></div>
          </div>
          
          {/* Conteneur du carrousel */}
          <div className="carousel-stage">
            {extendedCards.map((card, index) => (
              <div 
                key={card.id}
                className={`carousel-card ${getCardClassName(index)}`}
              >
                <div className="card-content">
                  <div className="card-image">
                    <img 
                      src={card.imageUrl} 
                      alt={card.title} 
                    />
                    <div className="image-overlay"></div>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-description">{card.description}</p>
                    <div className="card-actions">
                      <button className="card-button">
                        Voir détails
                      </button>
                      <button 
                        className="cart-button"
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
          
          {/* Boutons de navigation avec flèches en HTML/CSS */}
          <button 
            onClick={goToPrevious}
            className="nav-button prev-button"
            aria-label="Précédent"
            disabled={isAnimating}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <button 
            onClick={goToNext}
            className="nav-button next-button"
            aria-label="Suivant"
            disabled={isAnimating}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        
        {/* Indicateurs de position */}
        <div className="carousel-indicators">
          {cardsToShow.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
              aria-label={`Aller à la carte ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}