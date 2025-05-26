"use client";
import { useEffect, useState } from 'react';
import './(style)/404-style.scss';

export default function Loading() {
  const [monsterClass, setMonsterClass] = useState('');

  useEffect(() => {
    const totalMonsters = 5;
    const randomIndex = Math.floor(Math.random() * totalMonsters) + 1;
    setMonsterClass(`bg-random-${randomIndex}`);
  }, []);

  return (
    <div className="errorPage">
      {/* Monstre en arrière-plan */}
      <div id="monstre" className={`monsterBackground ${monsterClass}`}></div>

      {/* Contenu superposé */}
      <div className="overlayContent">
        <h1 className="title">Chargement en cours...</h1>
        <p className="subtitle">Les monstres explorent le territoire pour trouver vos données.</p>
      </div>
    </div>
  );
}
