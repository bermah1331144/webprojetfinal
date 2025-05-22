"use client";

import FormIngrediant from "./formIngrediant";
import { useState } from "react";
import './style.sass';
import '../(style)/style.sass';

export default function Page() {
    
    //dois faire un fetch push pour ajouter un item dans BD

    //doit prendre les info ecrit par usager et les add a la bd

    //doit monter un form pour ajouter un item
    
    return (
        <div id="imgFondForm"className="container-fluid h-80">
            <div className="row ">
                <div id="addItem"className="col-4 mx-auto my-5">
                    <form className="justify-content-center mx-auto">
                            <h1>Ajout d'un nouvel item</h1>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image:</label>
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                name="image"
                                accept="image/*"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description:</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                required
                            
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nom:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name" 
                                name="name"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="rarity" className="form-label">Rareté:</label>
                            <select id="rarity" name="rarity" required className="form-control">
                                <option value="Commun">Commun</option>
                                <option value="Rare">Rare</option>
                                <option value="Épique">Épique</option>                            <option value="Légendaire">Légendaire</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <p>DEBUT FORM INGREDIANT</p>
                            <FormIngrediant/>
                            <p>FIN FORM INGREDIANT</p>
                        </div>  

                        <div className="mb-3">
                            <label htmlFor="prixVente" className="form-label">Prix de vente:</label>
                            <input 
                                type="number"
                                className="form-control"
                                id="prixVente"
                                name="prixVente"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="prixAchat" className="form-label">Prix d'achat:</label>
                            <input 
                                type="number"
                                className="form-control"
                                id="prixAchat"
                                name="prixAchat" 
                                required
                            />
                        </div>
                            <button className="btn custom-btn mt-3 col-12" type="submit">Ajouter</button>
                    </form>
                </div>
            </div>
        </div>
             
    );
}