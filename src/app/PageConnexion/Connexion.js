'use client';

import '../../app/(style)/style.sass';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';

export default function ConnexionForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userAuth = localStorage.getItem('userAuth');
    if (userAuth) {
      const userData = JSON.parse(userAuth);
      window.location.href = '/pagePrincipale';
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!email || !password) {
      setMessage('Veuillez remplir tous les champs');
      return;
    }

    try {
      const response = await fetch('/api/connexion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      const utilisateur = {
        id: data.utilisateur.id,
        nom: data.utilisateur.nom,
        prenom: data.utilisateur.prenom,
        email: data.utilisateur.email,
        roleId: data.utilisateur.roleId,
        isLoggedIn: true,
        loginTime: new Date().toISOString()
      };

      setMessage('Connexion réussie !');
      localStorage.setItem('userAuth', JSON.stringify(utilisateur));
      setTimeout(() => {
        window.location.href = '/pagePrincipale';
      }, 1500);
    } catch (err) {
      setMessage(`Erreur de connexion: ${err.message}`);
    }
  };

  const goToSignup = () => {
    router.push('/inscription');
  };

  return (
    <div className="connexion-container h-80">
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
      </div>
    </div>
  );
}
