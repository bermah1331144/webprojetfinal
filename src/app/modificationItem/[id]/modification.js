'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { getUserData, isAdmin } from '../../utils/auth';

export default function EditItemPage() {
  const router = useRouter();
  const params = useParams();
  const itemId = params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [checkComplete, setCheckComplete] = useState(false);
  const [item, setItem] = useState({
    imgLien: '',
    description: '',
    id: '',
    nom: '',
    rarity: 1,
    recette: [],
    prixVente: 0,
    prixAchat: 0,
  });

  // Fonction simplifiée qui envoie exactement le même format que le composant d'origine
  const getAuthHeaders = () => {
    const userData = getUserData();
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (userData) {
      // Format exact comme indiqué dans le code d'origine
      headers['x-user-auth'] = encodeURIComponent(JSON.stringify(userData));
    }
    
    return headers;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adminStatus = isAdmin();
      setUserIsAdmin(adminStatus);
      setCheckComplete(true);
      
      if (adminStatus && itemId) {
        fetchItem();
      } else {
        setIsLoading(false);
      }
    }
  }, [itemId]);

  const fetchItem = async () => {
    try {
      const response = await fetch(`/api/items/${itemId}`);
      if (!response.ok) throw new Error('Erreur lors de la récupération de l\'item');
      const data = await response.json();
      setItem(data);
    } catch (error) {
      console.error('Erreur :', error);
      alert('Erreur lors du chargement de l\'item');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: ['prixVente', 'prixAchat', 'rarity'].includes(name) 
        ? parseInt(value, 10) 
        : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Vérifier à nouveau l'authentification avant la soumission
    if (!isAdmin()) {
      alert('Vous devez être administrateur pour effectuer cette action');
      router.push('/PageConnexion');
      return;
    }

    setIsLoading(true);

    try {
      // Créer une requête avec exactement les mêmes en-têtes que dans le code d'origine
      const response = await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || 'Erreur lors de la mise à jour');
      }

      alert('Item mis à jour avec succès !');
      router.push('/admin/items');
    } catch (error) {
      console.error('Erreur :', error);
      alert('Erreur lors de la mise à jour : ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet item ?')) return;

    // Vérifier à nouveau l'authentification avant la suppression
    if (!isAdmin()) {
      alert('Vous devez être administrateur pour effectuer cette action');
      router.push('/PageConnexion');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || 'Erreur lors de la suppression');
      }

      alert('Item supprimé avec succès !');
      router.push('/admin/items');
    } catch (error) {
      console.error('Erreur :', error);
      alert('Erreur lors de la suppression : ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Affiche message d'accès non autorisé au lieu de rediriger
  if (checkComplete && !userIsAdmin) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center text-red-500">
          <p>Accès non autorisé. Vous devez être administrateur pour accéder à cette page.</p>
          <button 
            onClick={() => router.push('/PageConnexion')} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  if (!checkComplete || (userIsAdmin && isLoading)) {
    return <div className="text-center p-10">Chargement...</div>;
  }

  if (!itemId) return <div className="p-6 text-red-500">Aucun ID détecté</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Modifier un item</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={item.nom}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="rarity" className="block text-sm font-medium text-gray-700 mb-1">Rareté</label>
            <input
              type="number"
              id="rarity"
              name="rarity"
              value={item.rarity}
              onChange={handleChange}
              min="1"
              max="10"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="prixAchat" className="block text-sm font-medium text-gray-700 mb-1">Prix d'achat</label>
            <input
              type="number"
              id="prixAchat"
              name="prixAchat"
              value={item.prixAchat}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="prixVente" className="block text-sm font-medium text-gray-700 mb-1">Prix de vente</label>
            <input
              type="number"
              id="prixVente"
              name="prixVente"
              value={item.prixVente}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="imgLien" className="block text-sm font-medium text-gray-700 mb-1">URL de l'image</label>
            <input
              type="url"
              id="imgLien"
              name="imgLien"
              value={item.imgLien}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {item.imgLien && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Aperçu :</p>
                <Image 
                  src={item.imgLien} 
                  alt={item.nom || 'Aperçu de l\'image'} 
                  width={100} 
                  height={100} 
                  className="border rounded-md"
                />
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={item.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Annuler
          </button>

          <div className="space-x-4">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400"
            >
              Supprimer
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isLoading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}