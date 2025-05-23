"use client";


import './style.sass';
import '../(style)/style.sass';
import { useEffect, useState, useContext } from "react";

export default function Page() {

    //Permet de prendre les info ecrit par usager
    const [items, setItems] = useState({
        image: "",
        name: "",
        description: "",
        rarity: 0,
        ingrediants: [],
        prixVentre: 0,
        prixAchat: 0
    });

        const [ingrediants, setIngrediants] = useState({
        ingrediant1: "",
        ingrediant2: "",
        ingrediant3: ""
    });

    const [choix, setChoix] = useState("");

    //gestion de chamgement dans le form
    const handleCharge = (e) => {
        setItems({
            ...items,
            [e.target.name]: e.target.value
        });
    }

    //gestion de chamgement dans le form pour les ingrediants
        const handleChargeingrediants = (e) => {

        setIngrediants({
            ...ingrediants,
            [e.target.name]: e.target.value
        });
    }

    //gestion de changements dans les champs du formaulaire pour la rarity
    const handleSelectChange = (event) => {
        setChoix(event.target.value);
        };

    //dois faire un fetch push pour ajouter un item dans BD
    const handleSubmit = async (e) => {
        e.preventDefault();
        
/*         if(!items.image || !items.name || !items.description || !items.rarity || !items.ingrediants || !items.prixVentre || !items.prixAchat) {
            alert("Veuillez remplir tous les champs.");
            return ;
        } */

        try {
            const response = await fetch(`http://localhost:3001/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(items),
            });
            if (response.ok) {
                console.log("Item ajouté avec succès");
                setItems({
                    image: "",
                    name: "",
                    description: "",
                    rarity: 0,
                    ingrediants: [],
                    prixVentre: 0,
                    prixAchat: 0
                });
            } else {
                console.error("Erreur lors de l'ajout de l'item");
            }
        } catch (err) {
            console.error("Erreur lors de l'ajout de l'item", err);
        }
    }
        const handleSubmitingrediant = (e) => {
        e.preventDefault();

        if(!ingrediants.ingrediant1 || !ingrediants.ingrediant2 || !ingrediants.ingrediant3) {
            alert("Veuillez remplir tous les champs");
            return ;
        }

        try {
            const response = fetch(`http://localhost:3001/ingrediants`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(ingrediants),
            });
            if (response.ok) {
                console.log("Ingrédiant ajouté avec succès");
                setIngrediants({
                    ingrediant1: "",
                    ingrediant2: "",
                    ingrediant3: ""
                });
            } else {
                console.error("Erreur lors de l'ajout de l'ingrediant");
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    //doit prendre les info ecrit par usager et les add a la bd
    //doit monter un form pour ajouter un item
    return (
        <div id="imgFondForm"className="container-fluid h-80">
            <div id="fondPage" className="row ">
                <div id="addItem"className="col-4 mx-auto my-5">
                    <form id="formAddItem" onSubmit={handleSubmit}  className="justify-content-center mx-auto">
                            <h1>Ajout d'un nouvel item</h1>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image:</label>
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                name="image"
                                accept="image/*"
                                value={items.image}
                                onChange={handleCharge}
                                
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nom:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name" 
                                name="name"
                                value={items.name}
                                onChange={handleCharge}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description:</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={items.description}
                                onChange={handleCharge}
                                required
                            
                            ></textarea>
                        </div>



                        <div className="mb-3">
                            <label htmlFor="rarity" className="form-label">Rareté:</label>
                            <select id="monChoix" name="rarity" required className="form-control" value={choix} onChange={(e) => setRarity(e.target.value)}>
                                <option value="Commun">Commun</option>
                                <option value="Rare">Rare</option>
                                <option value="Épique">Épique</option>                            
                                <option value="Légendaire">Légendaire</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="ingredient1" className="form-label">Ingrédient 1:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ingredient1"
                                name="ingredient1"
                                value={items.ingrediant1}
                                onChange={handleChargeingrediants}
                                required
                            />
                        </div>

                        <div className="mb-3">    
                            <label htmlFor="ingredient2" className="form-label">Ingrédient 2:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ingredient2"
                                name="ingredient2"
                                value={items.ingrediant2}
                                onChange={handleChargeingrediants}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="ingredient3" className="form-label">Ingrédient 3:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ingredient3"
                                name="ingredient3"
                                value={items.ingrediant3}
                                onChange={handleChargeingrediants}
                            />
                        </div>

                        

                        <div className="mb-3">
                            <label htmlFor="prixVente" className="form-label">Prix de vente:</label>
                            <input 
                                type="number"
                                className="form-control"
                                id="prixVente"
                                name="prixVente"
                                value={items.prixVente}
                                onChange={handleCharge}
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
                                value={items.prixAchat}
                                onChange={handleCharge}
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