'use client';

// auth-utils.js - Fichier utilitaire pour la gestion de l'authentification

/**
 * Vérifie si l'utilisateur est connecté
 * @returns {boolean} True si l'utilisateur est connecté
 */
export function isAuthenticated() {
  // Vérifie si on est dans un environnement navigateur
  if (typeof window === 'undefined') return false;

  try {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return false;

    const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadJson);

    // Vérifie l'expiration du token
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      localStorage.removeItem('token');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la vérification du token :', error);
    return false;
  }
}


/**
 * Vérifie si l'utilisateur connecté est un administrateur
 * @returns {boolean} True si l'utilisateur est un administrateur
 */
export function isAdmin() {
  if (typeof window === 'undefined') return false;

  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return false;

    const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadJson);

    console.log(payload.sub);
    // Ici on regarde "sub" au lieu de role
    return payload.sub === "Admin";
  } catch (error) {
    console.error('Erreur lors de la vérification du rôle admin:', error);
    return false;
  }
}


/**
 * Obtient les données de l'utilisateur connecté
 * @returns {Object|null} Les données de l'utilisateur ou null s'il n'est pas connecté
 */
export function getUserData() {
  if (typeof window === 'undefined') return null;
  
  const userAuth = localStorage.getItem('userAuth');
  if (!userAuth) return null;
  
  try {
    return JSON.parse(userAuth);
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error);
    return null;
  }
}

/**
 * Déconnecte l'utilisateur
 */
export function logout() {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('token');

  // Vous pourriez également vouloir effacer d'autres données spécifiques à l'utilisateur
}