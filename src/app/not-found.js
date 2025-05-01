"use client";
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './(style)/404-style.scss';

export default function() {
    const [monsterClass, setMonsterClass] = useState('');

    useEffect(() => {
      const totalMonsters = 5; // Tu dois avoir .bg-random-1 à .bg-random-4 dans ton SCSS
      const randomIndex = Math.floor(Math.random() * totalMonsters) + 1;
      setMonsterClass(`bg-random-${randomIndex}`);
      console.log(`bg-random-${randomIndex}`);
    }, []);
  
  return (
    <>
      <Head>
        <title>404 - Monstre introuvable | GrindHunter</title>
        <meta name="description" content="Ce territoire est vide... aucune trace de votre requête." />
      </Head>

      <div className="errorPage">
        {/* Monstre en arrière-plan */}
        <div id="monstre" className={`monsterBackground ${monsterClass}`}></div>
        
        {/* Contenu superposé */}
        <div className="overlayContent">
          <h1 className="title">404 - Monstre introuvable</h1>
          <p className="subtitle">Ce territoire est vide... aucune trace de votre requête.</p>
          
          <div className="actionButtons">
            <Link href="/" passHref>
              <button className="btn btn-danger">Retour au camp</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}