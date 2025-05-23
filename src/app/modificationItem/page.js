'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SelectItemPage() {
  const router = useRouter();
  const [itemId, setItemId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation de base
    if (!itemId || !itemId.trim()) {
      setError('Veuillez saisir un ID d\'item');
      return;
    }

    const id = parseInt(itemId.trim(), 10);
    if (isNaN(id) || id <= 0) {
      setError('L\'ID doit être un nombre valide');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Vérifier que l'item existe avant de rediriger
      const response = await fetch(`/api/items/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Aucun item trouvé avec cet ID');
        } else {
          setError('Erreur lors de la vérification de l\'item');
        }
        setIsLoading(false);
        return;
      }

      // L'item existe, on peut rediriger
      router.push(`/modificationItem/${id}`);
    } catch (error) {
      console.error('Erreur :', error);
      setError('Erreur lors de la vérification de l\'item');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Modifier un item</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="itemId" className="block text-sm font-medium text-gray-700 mb-2">
              ID de l'item à modifier
            </label>
            <input
              type="text"
              id="itemId"
              value={itemId}
              onChange={(e) => {
                setItemId(e.target.value);
                setError(''); // Réinitialiser l'erreur quand l'utilisateur tape
              }}
              placeholder="Saisissez l'ID de l'item"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Vérification...' : 'Continuer'}
          </button>
        </form>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
}