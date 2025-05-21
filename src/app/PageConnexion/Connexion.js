'use client';

import '../../app/(style)/style.sass';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ConnexionForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const userAuth = localStorage.getItem('userAuth');
    if (userAuth) {
      const userData = JSON.parse(userAuth);
      // Si l'utilisateur est déjà connecté, rediriger vers la page principale
      router.push('/pagePrincipale');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setDebugInfo('');

    // Validation basique
    if (!email || !password) {
      setMessage('Veuillez remplir tous les champs');
      setIsLoading(false);
      return;
    }

    try {
      // Solution temporaire - Authentification côté client
      // À utiliser uniquement pour le débogage, ne pas laisser en production
      if (email === 'admin@gmail.com' && password === 'Admin1234') {
        console.log('Authentification admin réussie');
        setMessage('Connexion administrateur réussie ! Redirection...');
        
        // Stocker les informations utilisateur et son rôle dans localStorage
        const userData = {
          email: email,
          roleId: 2, // Admin (roleId 2 selon votre bd.json)
          name: 'Administrateur',
          isLoggedIn: true,
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('userAuth', JSON.stringify(userData));
        
        // Simuler un délai pour montrer le message de succès
        setTimeout(() => {
          router.push('/pagePrincipale'); // Adaptez selon votre route principale
        }, 1500);
        
        setIsLoading(false);
        return;
      }
    

      // Afficher dans la console les données envoyées
      console.log('Tentative de connexion avec:', { email, password });
      
      // Appel à l'API de connexion avec mode de débogage
      const apiUrl = '/api/login';
      setDebugInfo(`Envoi de la requête à ${apiUrl}...`);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      setDebugInfo(prevInfo => `${prevInfo}\nRéponse reçue: status ${response.status}`);
      
      // Vérifier le type de contenu
      const contentType = response.headers.get('content-type');
      setDebugInfo(prevInfo => `${prevInfo}\nType de contenu: ${contentType || 'non défini'}`);
      
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Réponse non-JSON reçue (${contentType || 'inconnu'})`);
      }
      
      const data = await response.json();
      setDebugInfo(prevInfo => `${prevInfo}\nDonnées reçues: ${JSON.stringify(data)}`);
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur de connexion');
      }
      
      // Connexion réussie - Stocker les informations de l'utilisateur
      const userData = {
        email: data.user.email,
        roleId: data.user.roleId || 1, // Utiliser le roleId retourné par l'API ou 1 par défaut
        name: data.user.name || email.split('@')[0],
        isLoggedIn: true,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('userAuth', JSON.stringify(userData));
      
      setMessage('Connexion réussie ! Redirection...');
      
      // Rediriger vers la page principale après un court délai
      setTimeout(() => {
        router.push('/pagePrincipale'); // Adaptez selon votre route principale
      }, 1500);
      
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setMessage(`Erreur de connexion: ${error.message}`);
      setDebugInfo(prevInfo => `${prevInfo}\nErreur: ${error.toString()}`);
    } finally {
      setIsLoading(false);
    }
  };

  const goToSignup = () => {
    router.push('/inscription');
  };

  return (
    <div className="connexion-container">
      <div className="connexion-card">
        <h1 className="title">Chasseur,<br />connecte-toi</h1>
        
        {message && (
          <div className={`message ${message.includes('réussie') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              placeholder="Adresse email"
              className="custom-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-container">
            <input
              type="password"
              placeholder="Mot de passe"
              className="custom-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="connect-btn" 
            disabled={isLoading}
          >
            {isLoading ? 'CONNEXION...' : 'SE CONNECTER'}
          </button>
          
          <button 
            type="button" 
            className="signup-btn" 
            onClick={goToSignup}
            disabled={isLoading}
          >
            Pas encore de compte ? Inscris-toi ici
          </button>
        </form>
        
        {/* Zone de débogage - À supprimer en production */}
        {debugInfo && (
          <div className="debug-info">
            <details>
              <summary>Informations de débogage</summary>
              <pre>{debugInfo}</pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}