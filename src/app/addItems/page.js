"use client";


import './style.sass';
import '../(style)/style.sass';
import { useEffect, useState } from "react";
import { isAdmin } from "../(hook)/auth";

export default function Page() {
    //Permet de prendre les info ecrit par usager
    const defaultItem = {
        imgLien: "",
        nom: "",
        description: "",
        rarity: 0,
        ingrediants: [],
        prixVente: 0,
        prixAchat: 0,
        quantite: 0
    }
    const [item, setItem] = useState(defaultItem);

    useEffect(() => {
        if(!isAdmin()){
            window.location.href = "/pagePrincipale";
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === "number" ? parseFloat(value) || 0 : value;
      
        setItem((prevItem) => ({
          ...prevItem,
          [name]: newValue,
        }));
    };

    //dois faire un fetch push pour ajouter un item dans BD
    const handleSubmit = async (e) => {
        e.preventDefault();
        
         if(!item.imgLien || !item.nom || !item.description || !item.rarity || !item.prixVente || !item.prixAchat) {
            alert("Veuillez remplir tous les champs.");
            return ;
        } 

        try {
            const rawToken = localStorage.getItem('token');
            const token = rawToken?.replace(/^"(.*)"$/, '$1');
            const response = await fetch(`https://projet-prog4e09.cegepjonquiere.ca/api/Items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(item),
            });
            if (response.ok) {
                console.log("Item ajouté avec succès");
                setItem(defaultItem);
            } else {
                console.error("Erreur lors de l'ajout de l'item");
            }
        } catch (err) {
            console.error("Erreur lors de l'ajout de l'item", err);
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
                            <label htmlFor="imgLien" className="form-label">URL de l'image:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="imgLien"
                                name="imgLien"
                                value={item.imgLien}
                                onChange={handleChange}  
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nom" className="form-label">Nom:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nom" 
                                name="nom"
                                value={item.nom}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description:</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={item.description}
                                onChange={handleChange}
                                required
                            
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rarity" className="form-label">Rareté:</label>
                            <select id="monChoix" name="rarity" required className="form-control" value={item.rarity} onChange={handleChange}>
                                <option value="">-- Select Rarity --</option>
                                {[2, 3, 4, 5, 6, 7].map(val => (
                                <option key={val} value={val}>{val}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="prixVente" className="form-label">Prix de vente:</label>
                            <input 
                                type="number"
                                className="form-control"
                                id="prixVente"
                                name="prixVente"
                                value={item.prixVente}
                                onChange={handleChange}
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
                                value={item.prixAchat}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantite" className="form-label">Quantité:</label>
                            <input 
                                type="number"
                                className="form-control"
                                id="quantite"
                                name="quantite" 
                                value={item.quantite}
                                onChange={handleChange}
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