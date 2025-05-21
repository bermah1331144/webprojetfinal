"use client"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import '../(style)/style.sass'
<<<<<<< Updated upstream
=======
import { isAuthenticated, isAdmin, logout, getUserData } from './auth'
import {recupererPanier} from '../(js)/panier';
>>>>>>> Stashed changes

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const [cartCount, setCartCount] = useState(0);

<<<<<<< Updated upstream
=======
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

>>>>>>> Stashed changes
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

  const handleLogin = () => {
    setIsLoggedIn(true)
    setShowDropdown(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowDropdown(false)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark py-3 shadow-sm justify-content-center" style={{ backgroundColor: '#EFDCAB' }}>
      <div className="container-fluid row">
        <Link href="/" className="navbar-brand d-flex align-items-center col-3">
          <img src="/logo.png" alt="GrindHunter" className="me-2" height={40} />
          <span className="fw-bold fs-4" style={{ color: '#443627' }}>GrindHunter</span>
        </Link>

        <button className="navbar-toggler col-2 col-lg-9 row justify-content-lg-end justify-content-center" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon col-4" style={{ backgroundColor: '#D98324' }}></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between col-9 row" id="navbarNav">
          <div className="row col-8 justify-content-center align-items-center">
            <ul className="navbar-nav col-12 justify-content-center p-0">
              <li className="nav-item mx-2">
                <Link href="/" className="btn custom-btn py-2">Accueil</Link>
              </li>
              <li className="nav-item mx-2">
                <Link href="/page1" className="btn custom-btn py-2">Link 2</Link>
              </li>
              <li className="nav-item mx-2">
                <Link href="/page2" className="btn custom-btn py-2">Link 3</Link>
              </li>
            </ul>
          </div>
          <div className="position-relative" style={{ width: '40px', height: '40px' }}>
            <Link href="/panier">
              <i className="bi bi-cart-fill fs-4 custom-btn icons"></i>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="position-relative col-1 d-flex justify-content-end" ref={dropdownRef}>
            <div className="btn" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
              <i className="bi bi-person-circle fs-4 custom-btn icons"></i>
            </div>

            {showDropdown && (
              <div className="dropdown-menu show shadow border-0" style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                backgroundColor: '#EFDCAB', // $tertiary
                borderRadius: '10px',
                minWidth: '220px',
                zIndex: 9999,
                padding: '1rem'
              }}>
                {/* Section profil */}
                <div className="d-flex align-items-center mb-3 pb-3 border-bottom" style={{ borderColor: '#F2F6D0' }}>
                  <div>
                    <div style={{ color: '#443627', fontWeight: 'bold' }}>Utilisateur</div> {/* $primary */}
                    <small style={{ color: '#7c4b16' }}>Voir mon profil</small>
                  </div>
                </div>

                {/* Contenu dynamique */}
                {!isLoggedIn ? (
                  <>
                    <div className="mb-2"><i className="bi bi-shield-lock-fill me-2 text-warning"></i> Confidentialité</div>
                    <div className="mb-3"><i className="bi bi-universal-access-circle me-2 text-success"></i> Accessibilité</div>
                    <Link href="/PageConnexion" className="btn custom-btn w-100" onClick={() => setShowDropdown(false)}>Se connecter</Link>
                  </>
                ) : (
                  <>
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