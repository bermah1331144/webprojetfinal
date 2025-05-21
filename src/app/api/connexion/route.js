import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
      const { email, password } = await req.json();
  
      const utilisateurs = await fetch('http://localhost:3001/utilisateurs');
      const utilisateursJson = await utilisateurs.json();
  
      const utilisateur = utilisateursJson.find(u => u.email === email);
      if (!utilisateur) {
        return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 401 });
      }
  
      const passwordMatch = await bcrypt.compare(password, utilisateur.password);
      if (!passwordMatch) {
        return NextResponse.json({ message: 'Mot de passe incorrect' }, { status: 401 });
      }
  
      const { password: _, ...utilisateurSansMotDePasse } = utilisateur;
  
      return NextResponse.json({
        message: 'Connexion réussie',
        utilisateur: utilisateurSansMotDePasse
      });
    } catch (error) {
      console.error('Erreur serveur :', error);
      return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 });
    }
}