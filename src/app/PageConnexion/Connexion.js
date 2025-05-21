'use client';

import '../../app/(style)/style.sass';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

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
    setIsLoading(true);
    setMessage('');

    if (!email || !password) {
      setMessage('Veuillez remplir tous les champs');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Réponse inattendue du serveur');
      }

      const data = await response.json();
      console.log("Réponse API :", data);

      if (!data.user || !data.user.roleId) {
        console.error('Rôle utilisateur invalide:', data.user);
        throw new Error("Le rôle de l'utilisateur est invalide ou manquant");
      }

      const roleId = Number(data.user.roleId);
      if (isNaN(roleId)) {
        throw new Error("Le rôle de l'utilisateur est non numérique");
      }

      const userData = {
        email: data.user.email,
        roleId: roleId,
        name: data.user.nom || email.split('@')[0],
        isLoggedIn: true,
        loginTime: new Date().toISOString()
      };

      localStorage.setItem('userAuth', JSON.stringify(userData));

      window.location.reload();

      setMessage('Connexion réussie ! Redirection...');
      setTimeout(() => {
        window.location.href = '/pagePrincipale';
      }, 1500);

    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setMessage(`Erreur de connexion: ${error.message}`);
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
      </div>
    </div>
  );
}
