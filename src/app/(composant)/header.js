"use client"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import '../(style)/style.sass'
import { isAuthenticated, isAdmin, logout, getUserData } from './auth'

export default function Navbar() {
  const [search, setSearch] = useState("")
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

  return (
    <nav className="navbar navbar-expand-lg navbar-dark py-3 shadow-sm justify-content-center" style={{ backgroundColor: '#EFDCAB' }}>
      <div className="container-fluid row">
        <Link href="/" className="navbar-brand d-flex align-items-center col-3">
          <img src="/logo.png" alt="GrindHunter" className="me-2" height={40} />
          <span className="fw-bold fs-4" style={{ color: '#443627' }}>GrindHunter</span>
        </Link>

        <button className="navbar-toggler col-9 row justify-content-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon col-4" style={{ backgroundColor: '#D98324' }}></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between col-9 row" id="navbarNav">
          <div className="row col-8 justify-content-center align-items-center">
            <ul className="navbar-nav col-12 justify-content-center p-0">
              <li className="nav-item mx-2">
                <Link href="/" className="btn custom-btn py-2">Accueil</Link>
              </li>
              
              {/* Modification ici : affichage conditionnel selon le rôle */}
              <li className="nav-item mx-2">
                {isAdminUser ? (
                  <Link href="/admin/ajout-item" className="btn custom-btn py-2">Ajout item</Link>
                ) : (
                  <Link href="/page1" className="btn custom-btn py-2">Link 2</Link>
                )}
              </li>
              
              <li className="nav-item mx-2">
                {isAdminUser ? (
                  <Link href="/admin/modifier-item" className="btn custom-btn py-2">Modifier item</Link>
                ) : (
                  <Link href="/page2" className="btn custom-btn py-2">Link 3</Link>
                )}
              </li>
            </ul>
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
                backgroundColor: '#EFDCAB',
                borderRadius: '10px',
                minWidth: '220px',
                zIndex: 9999,
                padding: '1rem'
              }}>
                {/* Section profil */}
                <div className="d-flex align-items-center mb-3 pb-3 border-bottom" style={{ borderColor: '#F2F6D0' }}>
                  <img
                    src="/avatar.png"
                    alt="avatar"
                    className="rounded-circle me-2"
                    style={{ width: '40px', height: '40px', objectFit: 'cover', border: '2px solid #D98324' }}
                  />
                  <div>
                    <div style={{ color: '#443627', fontWeight: 'bold' }}>
                      {userName} {isAdminUser && '(Admin)'}
                    </div>
                    <small style={{ color: '#7c4b16' }}>Voir mon profil</small>
                  </div>
                </div>

                {/* Contenu dynamique */}
                {!isLoggedIn ? (
                  <> 
                    <div className="mb-3"><i className="bi bi-universal-access-circle me-2 text-success"></i> Accessibilité</div>
                    <div className="mb-2"><i className="bi bi-shield-lock-fill me-2 text-warning"></i> Confidentialité</div>
                   
                    <Link href="/PageConnexion" className="btn custom-btn w-100" onClick={() => setShowDropdown(false)}>Se connecter</Link>
                  </>
                ) : (
                  <>
                    <Link href="/profil" className="btn custom-btn w-100 mb-2" onClick={() => setShowDropdown(false)}>Mon profil</Link>
                    {isAdminUser && (
                      <div className="mb-2">
                        <div className="mb-2 mt-2 text-center fw-bold" style={{ color: '#443627' }}>Administration</div>
                        <Link href="/admin/ajout-item" className="btn custom-btn w-100 mb-2" onClick={() => setShowDropdown(false)}>Ajout item</Link>
                        <Link href="/admin/modifier-item" className="btn custom-btn w-100 mb-2" onClick={() => setShowDropdown(false)}>Modifier item</Link>
                      </div>
                    )}
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