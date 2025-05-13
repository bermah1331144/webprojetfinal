"use client";
import Link from "next/link";
import { useState } from "react";
import '../(style)/style.sass';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleConnexion = () => {
    setIsConnected(true);
    setMenuOpen(false);
  };

  const handleDeconnexion = () => {
    setIsConnected(false);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark py-3 shadow-sm" style={{ backgroundColor: '#EFDCAB' }}>
      <div className="container-fluid">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <img src="/logo.png" alt="GrindHunter" className="me-2" height={40} />
          <span className="fw-bold fs-4" style={{ color: '#443627' }}>GrindHunter</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item mx-1"><Link href="/" className="nav-link custom-btn">Accueil</Link></li>
            <li className="nav-item mx-1"><Link href="/page1" className="nav-link custom-btn">Link 2</Link></li>
            <li className="nav-item mx-1"><Link href="/page2" className="nav-link custom-btn">Link 3</Link></li>
            <li className="nav-item mx-1"><Link href="/page3" className="nav-link custom-btn">Link 4</Link></li>
          </ul>

          <form className="d-flex my-2 my-lg-0" role="search" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control me-2 custom-input"
              type="search"
              placeholder="Recherche..."
              aria-label="Recherche"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn custom-btn" type="submit">Rechercher</button>
          </form>

          <div className="dropdown position-relative ms-lg-3 mt-2 mt-lg-0">
            <button
              onClick={toggleMenu}
              className="btn rounded-circle"
              style={{ backgroundColor: '#D98324', color: '#FFFFFF' }}
            >
              <i className="bi bi-person-circle fs-4"></i>
            </button>

            {menuOpen && (
              <div className="position-absolute end-0 mt-2 shadow rounded w-100 w-lg-auto"
                style={{
                  minWidth: "200px",
                  zIndex: 1000,
                  backgroundColor: '#EFDCAB',
                  border: '1px solid #D98324'
                }}>

                {!isConnected ? (
                  <Link
                    href="/PageConnexion"
                    onClick={handleConnexion}
                    className="dropdown-item d-flex align-items-center py-2"
                    style={{ color: '#443627' }}
                  >
                    <i className="bi bi-box-arrow-in-right me-2" style={{ color: '#D98324' }}></i> Se connecter
                  </Link>
                ) : (
                  <>
                    <Link href="/profil" className="dropdown-item d-flex align-items-center py-2" style={{ color: '#443627' }}>
                      <i className="bi bi-person me-2" style={{ color: '#D98324' }}></i> Profil
                    </Link>
                    <Link href="/parametres" className="dropdown-item d-flex align-items-center py-2" style={{ color: '#443627' }}>
                      <i className="bi bi-gear me-2" style={{ color: '#D98324' }}></i> Paramètres
                    </Link>
                    <Link href="/confidentialite" className="dropdown-item d-flex align-items-center py-2" style={{ color: '#443627' }}>
                      <i className="bi bi-shield-lock me-2" style={{ color: '#D98324' }}></i> Données confidentielles
                    </Link>
                    <Link href="/accessibilite" className="dropdown-item d-flex align-items-center py-2" style={{ color: '#443627' }}>
                      <i className="bi bi-universal-access me-2" style={{ color: '#D98324' }}></i> Accessibilité
                    </Link>
                    <Link href="/avances" className="dropdown-item d-flex align-items-center py-2" style={{ color: '#443627' }}>
                      <i className="bi bi-sliders me-2" style={{ color: '#D98324' }}></i> Avancés
                    </Link>
                    <div className="dropdown-divider" style={{ borderTop: '1px solid #D98324' }}></div>
                    <button
                      onClick={handleDeconnexion}
                      className="dropdown-item d-flex align-items-center py-2"
                      style={{ color: '#443627' }}
                    >
                      <i className="bi bi-box-arrow-right me-2" style={{ color: '#D98324' }}></i> Se déconnecter
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
