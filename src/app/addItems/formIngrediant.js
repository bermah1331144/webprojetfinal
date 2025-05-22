"use client";

import { useEffect, useState, useContext } from "react";

export default function FormIngrediant() {
    //gestion de chamgement dans le form
    const [ingrediants, setIngrediants] = useState({
        ingrediant1: "",
        ingrediant2: "",
        ingrediant3: ""
    });

    //gestion de chamgement dans le form
    const handleCharge = (e) => {

        setIngrediants({
            ...ingrediants,
            [e.target.name]: e.target.value
        });
    }

    //Prend les infos donner par le user et le push sur l BD
    const handleSubmit = (e) => {
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
    
    
    return <>
                <div>
                    <div id="recette-igendiants">
                        <div className="mb-3">
                            <label htmlFor="ingredient1" className="form-label">Ingrédient 1:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ingredient1"
                                name="ingredient1"
                                value={ingrediants.ingrediant1}
                                onChange={handleCharge}
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
                                
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="ingredient3" className="form-label">Ingrédient 3:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ingredient3"
                                name="ingredient3"
                            />
                        </div>
                            <div className="d-flex justify-content-end">
                                <button onClick={handleSubmit} className="btn custom-btn mt-3">Ajouter</button>
                            </div>
                        
                    </div>
                </div>
    
    
    </>;
}