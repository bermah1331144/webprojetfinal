'use client';
import '../../app/(style)/style.sass';
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
    <div className="card">
      <h1 className="title">Chasseur, connecte-toi</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Adresse email"
          className="custom-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="custom-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="custom-btn">
          Se connecter
        </button>
        <button type="button" className="link-btn" onClick={goToSignup}>
          Pas encore de compte ? Inscris-toi ici
        </button>
      </form>
    </div>
  );
}
