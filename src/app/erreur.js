"use client";
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './(style)/404-style.scss';

export default function LoadingErrorPage() {
  const [monsterClass, setMonsterClass] = useState('');

  useEffect(() => {
    const totalMonsters = 5;
    const randomIndex = Math.floor(Math.random() * totalMonsters) + 1;
    setMonsterClass(`bg-random-${randomIndex}`);
    console.log(`bg-random-${randomIndex}`);
  }, []);

  return (
    <>
      <Head>
        <title>Erreur de chargement | GrindHunter</title>
        <meta name="description" content="Un problème est survenu pendant le chargement de la page. Veuillez réessayer plus tard." />
      </Head>

      <div className="errorPage">
        {/* Monstre en arrière-plan */}
        <div id="monstre" className={`monsterBackground ${monsterClass}`}></div>

        {/* Contenu superposé */}
        <div className="overlayContent">
          <h1 className="title">Une erreur est survenue lors du chargement...</h1>
          <p className="subtitle">Impossible d’accéder à cette page pour le moment. Peut-être qu’un monstre a mangé les données !</p>

          <div className="actionButtons">
            <button className="btn btn-primary" onClick={() => location.reload()}>
              Réessayer
            </button>
            <Link href="/" passHref>
              <button className="btn btn-danger">Retour au camp</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
