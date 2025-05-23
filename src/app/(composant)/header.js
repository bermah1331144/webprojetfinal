"use client"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import '../(style)/style.sass'
import { isAuthenticated, isAdmin, logout, getUserData } from '../utils/auth'
import {recupererPanier} from '../(hook)/panier';

export default function header() {
  const [cartCount, setCartCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdminUser, setIsAdminUser] = useState(false)
  const [userName, setUserName] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  // Vérifier l'état d'authentification au chargement
  useEffect(() => {
    checkAuthStatus();
    
    // Ajouter un event listener pour surveiller les changements dans localStorage
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      // Nettoyage
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    async function loadCartCount() {
      try {
        const panier = await recupererPanier();
        const total = panier.reduce((acc, item) => acc + (parseInt(item.quantite, 10) || 0), 0);
        setCartCount(total);
      } catch (error) {
        console.error("Erreur lors du chargement du panier :", error);
      }
    }
  
    loadCartCount();
  
    // Écoute les changements (ex: une autre partie de l'app met à jour IndexedDB)
    const interval = setInterval(loadCartCount, 1000); // toutes les secondes
    return () => clearInterval(interval);
  }, []);

  function checkAuthStatus() {
    const authenticated = isAuthenticated();
    const adminStatus = isAdmin();
    const userData = getUserData();
    
    setIsLoggedIn(authenticated);
    setIsAdminUser(adminStatus);
    setUserName(userData?.name || 'Utilisateur');
  }

  function handleStorageChange(e) {
    // Mettre à jour l'état si le localStorage change
    if (e.key === 'userAuth') {
      checkAuthStatus();
    }
  }

  const toggleDropdown = () => setShowDropdown(!showDropdown)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setIsAdminUser(false);
    setUserName('');
    setShowDropdown(false);
  }

  return  (
    <nav className="navbar navbar-expand-lg navbar-dark py-2 shadow-sm" style={{ backgroundColor: '#EFDCAB' }}>
    <div className="container-fluid justify-content-end">
      {/* Logo - aligné à gauche */}
      <Link href="/" className="navbar-brand d-flex align-items-center w-25">
        <img src="/logo.png" alt="GrindHunter" className="me-2" height={40} />
        <span className="fw-bold fs-4 d-none d-sm-inline" style={{ color: '#443627' }}>GrindHunter</span>
      </Link>
  
      {/* Hamburger menu - déplacé à sa position correcte */}
      <button 
        className="navbar-toggler ms-auto me-2" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
  
      {/* Menu de navigation - collapsible et centré */}
      <div className="collapse navbar-collapse pe-custom" id="navbarNav">
        <ul className="navbar-nav justify-content-center mx-auto text-end text-lg-center w-100">
          <li className="nav-item mx-2">
            <Link href="/" className="btn custom-btn py-2 mt-2">Accueil</Link>
          </li>
          <li className="nav-item mx-2">
            <Link href="/catalogue" className="btn custom-btn py-2 mt-2">Catalogue</Link>
          </li>
          <li className="nav-item mx-2">
            {isAdminUser &&(
              <Link href="/admin/ajout-item" className="btn custom-btn py-2 mt-2">Ajout item</Link>
            )} 
          </li>
          <li className="nav-item mx-2">
            {isAdminUser ? (
              <Link href="/modificationItem" className="btn custom-btn py-2 my-2">Modifier item</Link>
            ) : (
              <Link href="/page2" className="btn custom-btn py-2 my-2">À venir</Link>
            )}
          </li>
        </ul>
      </div>
  
      {/* Boutons (panier et user) - alignés à droite */}
      <div className="d-flex align-items-center justify-content-end w-25" ref={dropdownRef}>
        {/* Panier - conditionnel */}
        {isLoggedIn && (
          <div className="position-relative me-3">
            <Link href="/panier">
              <i className="bi bi-cart-fill fs-4 custom-btn icons"></i>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        )}
  
        {/* Utilisateur */}
        <div className="position-relative">
          <div className="btn p-1" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
            <i className="bi bi-person-circle fs-4 custom-btn icons"></i>
          </div>
  
          {showDropdown && (
            <div className="dropdown-menu show shadow border-0" style={{
              position: 'absolute',
              top: '110%',
              right: 0,
              backgroundColor: '#EFDCAB',
              borderRadius: '10px',
              minWidth: '200px',
              maxWidth: '90vw',
              zIndex: 9999,
              padding: '1rem'
            }}>
              {!isLoggedIn ? (
                <>
                  <Link href="/inscription" className="btn custom-btn w-100 mb-2" onClick={() => setShowDropdown(false)}>S'inscrire</Link>
                  <Link href="/PageConnexion" className="btn custom-btn w-100" onClick={() => setShowDropdown(false)}>Se connecter</Link>
                </>
              ) : (
                <>
                  <div>
                    <div style={{ color: '#443627', fontWeight: 'bold' }}>{userName} {isAdminUser && '(Admin)'}</div>
                    <small style={{ color: '#7c4b16' }}>Voir mon profil</small>
                  </div>
                  <Link href="/profil" className="btn custom-btn w-100 mb-2" onClick={() => setShowDropdown(false)}>Mon profil</Link>
                  <button className="btn btn-danger w-100" onClick={handleLogout}>Se déconnecter</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  </nav>
  )
}