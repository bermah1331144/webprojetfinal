"use client"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import '../(style)/style.sass'
import { isAuthenticated, isAdmin, logout, getUserData } from './auth'
import {recupererPanier} from '../(js)/panier';


export default function Navbar() {
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
    <nav className="navbar navbar-expand-lg navbar-dark py-3 shadow-sm" style={{ backgroundColor: '#EFDCAB' }}>
  <div className="container-fluid d-flex align-items-center justify-content-between">
    
    {/* Logo */}
    <Link href="/" className="navbar-brand d-flex align-items-center m-0">
      <img src="/logo.png" alt="GrindHunter" className="me-2" height={40} />
      <span className="fw-bold fs-4 d-none d-sm-inline" style={{ color: '#443627' }}>GrindHunter</span>
    </Link>

    {/* Collapse (liens) */}
    <div className="collapse navbar-collapse pe-5" id="navbarNav">
      <ul className="navbar-nav mx-auto justify-content-center">  {/* Ajout de 'mx-auto' ici */}
        <li className="nav-item mx-2">
          <Link href="/" className="btn custom-btn py-2">Accueil</Link>
        </li>
        <li className="nav-item mx-2">
          {isAdminUser ? (
            <Link href="/admin/ajout-item" className="btn custom-btn py-2">Ajout item</Link>
          ) : (
            <Link href="/page1" className="btn custom-btn py-2">À venir</Link>
          )}
        </li>
        <li className="nav-item mx-2">
          {isAdminUser ? (
            <Link href="/admin/modifier-item" className="btn custom-btn py-2">Modifier item</Link>
          ) : (
            <Link href="/page2" className="btn custom-btn py-2">À venir</Link>
          )}
        </li>
      </ul>
    </div>

    {/* Icônes à droite */}
    <div className="d-flex align-items-center gap-3" ref={dropdownRef}>
      {/* Panier */}
      <div className="position-relative">
        <Link href="/panier">
          <i className="bi bi-cart-fill fs-4 custom-btn icons"></i>
          {cartCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* Utilisateur */}
      <div className="position-relative">
        <div className="btn" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
          <i className="bi bi-person-circle fs-4 custom-btn icons"></i>
        </div>

        {showDropdown && (
          <div className="dropdown-menu show shadow border-0" style={{
            position: 'absolute',
            top: '110%',
            right: 0,
            backgroundColor: '#EFDCAB',
            borderRadius: '10px',
            minWidth: '220px',
            zIndex: 9999,
            padding: '1rem'
          }}>
            {/* Dropdown content */}
            <div className="d-flex align-items-center mb-3 pb-3 border-bottom" style={{ borderColor: '#F2F6D0' }}>
              <img src="/avatar.png" alt="avatar" className="rounded-circle me-2"
                style={{ width: '40px', height: '40px', objectFit: 'cover', border: '2px solid #D98324' }} />
              <div>
                <div style={{ color: '#443627', fontWeight: 'bold' }}>{userName} {isAdminUser && '(Admin)'}</div>
                <small style={{ color: '#7c4b16' }}>Voir mon profil</small>
              </div>
            </div>

            {!isLoggedIn ? (
              <>
                <div className="mb-3"><i className="bi bi-universal-access-circle me-2 text-success"></i> Accessibilité</div>
                <div className="mb-2"><i className="bi bi-shield-lock-fill me-2 text-warning"></i> Confidentialité</div>
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
      {/* Toggler (toujours visible sur mobile) */}
      <button className="navbar-toggler p-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon" style={{ backgroundColor: '#D98324' }}></span>
      </button>
    </div>
  </div>
</nav>
  )
}