"use client";
import useCart from '../(hook)/useCart';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {ajouterOuMettreAJourArticle} from '../(hook)/panier';
import Notification from '../(composant)/notification';

export default function CardFlow() {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  
  const { addToCart, notificationMessage, showNotification, closeNotification } = useCart();

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
        const source = Array.isArray(data) ? data : data.items;
        setItems(source);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const totalCards = items.length;

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
      <Notification message={notificationMessage} visible={showNotification} duration={3000} onClose={() => closeNotification()} />
      
      <div className="carousel-inner">
        <div className="header-with-cart row justify-content-end">
          <h1 className="carousel-title col-12">Nos parties vedettes</h1>

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
            {items.map((item, index) => (
              <div key={item.id} className={`carousel-card ${getCardClassName(index)}`}>
                <div className="card-content">
                  <div className="card-image">
                    <img src={item.imgLien} alt={item.title} />
                    <div className="image-overlay"></div>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-description">{item.description}</p>
                    <p className='card-description fw-bold'>Rareté: {item.rarity}</p>
                    <p className='card-description fw-bold'>Prix: {item.prixAchat}$</p>
                    <div className="card-actions">
                      <Link href={`/details/${item.id}`} className="card-button">
                        Voir détails
                      </Link>
                      <button 
                        className="cart-button"
                        onClick={() => addToCart(item)}
                      >
                        🛒 
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