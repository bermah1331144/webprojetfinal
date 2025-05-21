'use client';

// auth-utils.js - Fichier utilitaire pour la gestion de l'authentification

/**
 * Vérifie si l'utilisateur est connecté
 * @returns {boolean} True si l'utilisateur est connecté
 */
export function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  
  const userAuth = localStorage.getItem('userAuth');
  if (!userAuth) return false;
  
  try {
    const userData = JSON.parse(userAuth);
    return !!userData.isLoggedIn;
  } catch (error) {
    console.error('Erreur lors de la vérification d\'authentification:', error);
    return false;
  }
}

/**
 * Vérifie si l'utilisateur connecté est un administrateur
 * @returns {boolean} True si l'utilisateur est un administrateur
 */
export function isAdmin() {
  if (typeof window === 'undefined') return false;
  
  const userAuth = localStorage.getItem('userAuth');
  if (!userAuth) return false;
  
  try {
    const userData = JSON.parse(userAuth);
    return userData.isLoggedIn && userData.roleId === 2; // roleId 2 pour admin
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
  
  localStorage.removeItem('userAuth');
  // Vous pourriez également vouloir effacer d'autres données spécifiques à l'utilisateur
}