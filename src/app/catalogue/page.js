"use client";
import useCart from "../(hook)/useCart";
import Notification from "../(composant)/notification";
import React, { useEffect, useState} from "react";
import "../(style)/catalogue.scss";
import Card from "./card";

export default function Catalogue() {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [selectedRarity, setSelectedRarity] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);

    const { addToCart, notificationMessage, showNotification, closeNotification } = useCart();

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

    useEffect(() => {
      // Filtrage et tri à chaque changement de critère
      let filtered = items.filter(item =>
        typeof item.nom === 'string' &&
        item.nom.toLowerCase().includes(searchText.toLowerCase()) &&
        (selectedRarity ? item.rarity === selectedRarity : true) &&
        item.prixAchat >= minPrice &&
        item.prixAchat <= maxPrice
      );
    
      // Tri
      switch (sortOption) {
        case "alpha-asc":
          filtered.sort((a, b) => a.nom.localeCompare(b.nom));
          break;
        case "alpha-desc":
          filtered.sort((a, b) => b.nom.localeCompare(a.nom));
          break;
        case "price-asc":
          filtered.sort((a, b) => a.prixAchat - b.prixAchat);
          break;
        case "price-desc":
          filtered.sort((a, b) => b.prixAchat - a.prixAchat);
          break;
        default:
          break;
      }
    
      setFilteredItems(filtered);
    }, [searchText, selectedRarity, sortOption, minPrice, maxPrice, items]);

  const resetFilters = () => {
    setSearchText("");
    setSelectedRarity("");
    setSortOption("");
    setMinPrice(0);
    setMaxPrice(1000);
  };

  return (
      <div className="catalogue-layout">
        <Notification message={notificationMessage} visible={showNotification} duration={3000} onClose={() => closeNotification()}/>
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
              <Card key={item.id} item={item} addToCart={addToCart} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
