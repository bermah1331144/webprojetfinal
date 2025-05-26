'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, isAdmin, logout, getUserData } from './auth-utils';

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Vérifier l'état d'authentification au chargement
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
    setUserName(userData?.name || '');
  }

  function handleStorageChange(e) {
    // Mettre à jour l'état si le localStorage change (par exemple, lors d'une déconnexion dans un autre onglet)
    if (e.key === 'userAuth') {
      checkAuthStatus();
    }
  }

  function handleLogout() {
    logout();
    setIsLoggedIn(false);
    setIsAdminUser(false);
    setUserName('');
    router.push('/connexion');
  }

  function navigateTo(path) {
    router.push(path);
  }

  return (
    <nav className="navigation">
      <div className="logo" onClick={() => navigateTo('/pagePrincipale')}>
        <span>MonApplication</span>
      </div>
      
      <div className="nav-links">
        <button onClick={() => navigateTo('/pagePrincipale')}>Accueil</button>
        
        {/* Liens visibles uniquement pour les utilisateurs connectés */}
        {isLoggedIn && (
          <>
            <button onClick={() => navigateTo('/profile')}>Mon profil</button>
            
            {/* Liens visibles uniquement pour les administrateurs */}
            {isAdminUser && (
              <>
                <button onClick={() => navigateTo('/admin/ajout-item')} className="admin-link">
                  Ajouter un item
                </button>
                <button onClick={() => navigateTo('/admin/gestion-items')} className="admin-link">
                  Gérer les items
                </button>
              </>
            )}
            
            <div className="user-info">
              <span>{userName} {isAdminUser ? '(Admin)' : '(User)'}</span>
              <button onClick={handleLogout} className="logout-btn">
                Déconnexion
              </button>
            </div>
          </>
        )}
        
        {/* Liens visibles uniquement pour les utilisateurs non connectés */}
        {!isLoggedIn && (
          <>
            <button onClick={() => navigateTo('/connexion')}>Connexion</button>
            <button onClick={() => navigateTo('/inscription')}>Inscription</button>
          </>
        )}
      </div>
    </nav>
  );
}