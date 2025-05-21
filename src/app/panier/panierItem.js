import React from 'react';

export default function PanierItem({ item, onQuantiteChange }) {

  return (
    <div className="col-12 border border-3 border-primary rounded-5 row my-3">
        <img src={item.imgLien} alt={item.nom} className='col-12 col-md-5 col-xl-4' />
        <div className='col-12 col-md-7 col-xl-8 d-flex flex-column justify-content-between'>
            <div>
                <h3 className='mt-4'>{item.nom}</h3>
                <p>{item.description}</p>
            </div>
            <div className='row align-items-center'>
                <p className='col-12 col-md-11'><strong>Prix : </strong>{item.prixVente}$</p>
                <div className="quantite-controle col-12 col-md-1 justify-content-md-end mb-3">
                    <button onClick={() => onQuantiteChange(item.id, item.quantite - 1)} disabled={item.quantite <= 1}>-</button>
                    <span>{item.quantite}</span>
                    <button onClick={() => onQuantiteChange(item.id, item.quantite + 1)}>+</button>
                </div>
            </div>
        </div>

    </div>
  );
}