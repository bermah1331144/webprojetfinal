"use client";
import "../(style)/catalogue.scss";
import Card from "./card";
import { useState, useEffect } from "react";
import { isAdmin } from "../utils/auth";

export default function Catalogue() {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        if(!isAdmin()){
            window.location.href = "/pagePrincipale";
        }
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

    useEffect(() => {
        const filtered = items.filter(item =>
            typeof item.nom === 'string' &&
            item.nom.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredItems(filtered);
    }, [searchText, items]);

    const addToCart = (item) => {
        console.log("Added to cart:", item);
    };

    return (
        <>
            <section className="catalogue-section">
                <div className="catalogue-header">
                    <div className="top-search-bar">
                        <input type="text" placeholder="🔍 Rechercher un item..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    </div>
                    <p className="results-count text-center">
                        {filteredItems.length} résultat{filteredItems.length > 1 ? "s" : ""} trouvé{filteredItems.length > 1 ? "s" : ""}
                    </p>
                </div>

                <div className="catalogue-grid">
                    {filteredItems.map(item => (
                        <Card key={item.id} item={item} addToCart={addToCart} />
                    ))}
                </div>
            </section>
        </>
    );
}
