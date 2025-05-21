// Exemple de fichier API pour la route /api/login (à placer dans le dossier /app/api/login/route.js)
// Ce fichier montre comment vous pourriez implémenter une API de connexion avec Next.js 13+

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Fonction pour lire les données depuis bd.json
const getUsersFromDb = () => {
  try {
    const filePath = path.join(process.cwd(), 'bd.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileData);
    return data.utilisateurs || []; // Supposons que les utilisateurs sont dans un tableau "users"
  } catch (error) {
    console.error('Erreur lors de la lecture de bd.json:', error);
    return [];
  }
};

// Gestionnaire de la requête POST
export async function POST(request) {
  try {
    // Récupérer et parser le corps de la requête
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Récupérer les utilisateurs depuis bd.json
    const users = getUsersFromDb();
    
    // Trouver l'utilisateur correspondant
    const user = users.find(u => u.email === email);
    
    // Vérifier si l'utilisateur existe
    if (!user) {
      return NextResponse.json(
        { message: 'Utilisateur non trouvé' },
        { status: 401 }
      );
    }
    
    // Vérifier le mot de passe
    // Note: Dans un vrai système, le mot de passe serait haché et non stocké en clair
    if (user.password !== password) {
      return NextResponse.json(
        { message: 'Mot de passe incorrect' },
        { status: 401 }
      );
    }
    
    // Préparer les données utilisateur à renvoyer
    // Exclure le mot de passe des données renvoyées
    const userData = {
      id: user.id,
      email: user.email,
      nom: user.nom,
      roleId: user.roleId // 1 pour utilisateur normal, 2 pour admin
    };
    
    // Renvoyer les données utilisateur
    return NextResponse.json({
      message: 'Connexion réussie',
      user: userData
    });
    
  } catch (error) {
    console.error('Erreur lors du traitement de la demande de connexion:', error);
    return NextResponse.json(
      { message: 'Erreur serveur', error: error.message },
      { status: 500 }
    );
  }
}