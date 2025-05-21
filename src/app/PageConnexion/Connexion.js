
'use client';
import '../../app/(style)/style.sass'; // Import du fichier SCSS spécifique
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ConnexionForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de connexion
  };

  const goToSignup = () => {
    router.push('/inscription'); // à adapter selon ta route réelle
  };

  return (
    // Le conteneur principal contient tout, y compris l'image de fond
    <div className="connexion-container">
      {/* Carte de connexion au centre */}
      <div className="connexion-card">
        <h1 className="title">Chasseur,<br />connecte-toi</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              placeholder="Adresse email"
              className="custom-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Mot de passe"
              className="custom-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="connect-btn">
            SE CONNECTER
          </button>
          <button type="button" className="signup-btn" onClick={goToSignup}>
            Pas encore de compte ? Inscris-toi ici
          </button>
        </form>
      </div>
    </div>
  );
}
