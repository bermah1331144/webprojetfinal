import React from 'react';

export default function BottomSection() {
  return (
    <div className="bottom-content py-4">
      <div className="container">
        <div className="row">
          {/* Left Section with Rare Monsters */}
          <div className="col-md-6 order-md-1 order-2 mb-4 mb-md-0 left-section">
            <div className="row">
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="col-md-2 mb-3 mb-md-0">
                  {/* Contenu vide */}
                </div>
              </div>
              <div className="col-md-8">
                <h3 className="section-title mb-2">Les monstres les plus rares</h3>
                <p className="section-text">
                  Partez à la recherche des créatures les plus insaisissables de Monster Hunter World. 
                  Ces monstres légendaires représentent le défi ultime pour tout chasseur qui se respecte, 
                  offrant des matériaux rares et une réputation inégalée à ceux qui parviennent à les vaincre.
                </p>
              </div>
            </div>
          </div>
         
          {/* Right Section with Popular Equipment */}
          <div className="col-md-6 order-md-2 order-1 right-section">
            <div className="info-card card">
              <div className="info-header card-header">
                <h3 className="section-title mb-0">Les équipements populaires</h3>
              </div>
              <ul className="info-list list-group list-group-flush">
                <li className="info-item list-group-item">
                  Grande Épée Wyverne Ignition "Impact" - L'arme emblématique créée par la communauté, combinant puissance brute et design spectaculaire
                </li>
                <li className="info-item list-group-item">
                  Armure Fatalis - L'équipement ultime offrant d'excellentes résistances et des bonus de compétences inégalés pour tous les styles de jeu
                </li>
                <li className="info-item list-group-item">
                  Lance-foudre Kjarr - Arc électrique extrêmement puissant contre les monstres vulnérables à l'élément foudre, fabriqué à partir de matériaux Kulve Taroth
                </li>
                <li className="info-item list-group-item">
                  Manteau d'assassin - Accessoire spécialisé permettant aux chasseurs de se déplacer furtivement et d'augmenter considérablement les dégâts de leurs attaques critiques
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}