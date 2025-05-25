"use client";
import { useState, useEffect } from "react";

export default function() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch("http://localhost:3001/items");
                const data = await response.json();
                setItems(data);
            } catch (err) {
                console.error("Erreur lors du chargement des items :", err);
            }
        };

        fetchItems();
    }, []);

    return (
        <>
            {items.map((item, index) => (
                <p key={index}>
                    {`new Item { Id = ${item.id}, Nom = "${item.nom}", Description = "${item.description}", ImgLien = "${item.imgLien}", Rarity = ${item.rarity}, Recette = [], PrixAchat = ${item.prixAchat}, PrixVente = ${item.prixVente}, Quantite = ${item.quantite} },`}
                </p>
            ))}
        </>
    );
}
