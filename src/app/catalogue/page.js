"use client";
import React, { useEffect, useState } from "react";
import "../(style)/catalogue.scss";

export default function Catalogue() {
    const [items, setItems] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [selectedRarity, setSelectedRarity] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3001/items");
        const data = await response.json();
  
        // Filtrage
        let filtered = data.filter(item =>
          item.nom.toLowerCase().includes(searchText.toLowerCase()) &&
          (selectedRarity ? item.rarity == selectedRarity : true) &&
          item.prixAchat >= minPrice &&
          item.prixAchat <= maxPrice
        );
  
        // Tri
        if (sortOption === "alpha-asc") {
          filtered.sort((a, b) => a.nom.localeCompare(b.nom));
        } else if (sortOption === "alpha-desc") {
          filtered.sort((a, b) => b.nom.localeCompare(a.nom));
        } else if (sortOption === "price-asc") {
          filtered.sort((a, b) => a.prixAchat - b.prixAchat);
        } else if (sortOption === "price-desc") {
          filtered.sort((a, b) => b.prixAchat - a.prixAchat);
        }
        
  
        setItems(filtered);
      } catch (err) {
        console.error("Erreur lors du chargement des items :", err);
      }
    };
  
    fetchItems();
    }, [searchText, selectedRarity, sortOption, minPrice, maxPrice]);

  const resetFilters = () => {
    setSearchText("");
    setSelectedRarity("");
    setSortOption("");
    setMinPrice(0);
    setMaxPrice(1000);
  };

  return (
    <div className="catalogue-layout">
      {/* Barre de recherche */}
      <div className="top-search-bar">
        <input
          type="text"
          placeholder="🔍 Rechercher un item..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="main-content">
        {/* Filtres à gauche */}
        <aside className="filters">
          <h2>Filtres</h2>
          <div className="filter-group">
            <label>Tri :</label>
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="">-- Aucun --</option>
                <option value="alpha-asc">Ordre alphabétique (A-Z)</option>
                <option value="alpha-desc">Ordre alphabétique (Z-A)</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
            </select>
            </div>
          <div className="filter-group">
            <label>Rareté :</label>
            <select value={selectedRarity} onChange={(e) => setSelectedRarity(e.target.value)}>
              <option value="">Toutes</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Prix minimum :</label>
            <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            <span>{minPrice} $</span>

            <label>Prix maximum :</label>
            <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <span>{maxPrice} $</span>
            </div>
            <button className="reset-button" onClick={resetFilters} disabled={!searchText && !selectedRarity && !sortOption && minPrice === 0 && maxPrice === 1000}>
                Réinitialiser les filtres
            </button>

        </aside>

        {/* Catalogue à droite */}
        <section className="catalogue-section">
        <div className="catalogue-header">
            <p className="results-count">{items.length} résultat{items.length > 1 ? "s" : ""} trouvé{items.length > 1 ? "s" : ""}</p>
        </div>

        <div className="catalogue-grid">
            {items.map(item => (
            <div className="catalogue-card" key={item.id}>
                <div className="image-wrapper">
                <img src={item.imgLien} alt={item.nom} />
                </div>
                <div className="card-content">
                <h3>{item.nom}</h3>
                <p className="description">{item.description}</p>
                <p><strong>Rareté :</strong> {item.rarity}</p>
                <p className="prix"><strong>Prix :</strong> {item.prixAchat} $</p>
                <button>🛒 Ajouter au panier</button>
                </div>
            </div>
            ))}
        </div>
        </section>
      </div>
    </div>
  );
}
