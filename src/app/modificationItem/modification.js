'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({
    imgLien: '',
    description: '',
    id: '',
    nom: '',
    rarity: 1,
    recette: [],
    prixVente: 0,
    prixAchat: 0
  });

  useEffect(() => {
    // Récupérer les données du produit
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du produit');
        }
        const data = await response.json();
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur:', error);
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: ['prixVente', 'prixAchat', 'rarity'].includes(name) 
        ? parseInt(value, 10) 
        : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du produit');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error('Erreur:', error);
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) {
      setIsLoading(true);

      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la suppression du produit');
        }

        router.push('/admin/products');
        router.refresh();
      } catch (error) {
        console.error('Erreur:', error);
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return <div className="text-center p-10">Chargement...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Modifier le produit</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
              Nom du produit
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={product.nom}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="rarity" className="block text-sm font-medium text-gray-700 mb-1">
              Rareté
            </label>
            <input
              type="number"
              id="rarity"
              name="rarity"
              value={product.rarity}
              onChange={handleChange}
              min="1"
              max="10"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="prixAchat" className="block text-sm font-medium text-gray-700 mb-1">
              Prix d'achat
            </label>
            <input
              type="number"
              id="prixAchat"
              name="prixAchat"
              value={product.prixAchat}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="prixVente" className="block text-sm font-medium text-gray-700 mb-1">
              Prix de vente
            </label>
            <input
              type="number"
              id="prixVente"
              name="prixVente"
              value={product.prixVente}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="imgLien" className="block text-sm font-medium text-gray-700 mb-1">
              URL de l'image
            </label>
            <input
              type="url"
              id="imgLien"
              name="imgLien"
              value={product.imgLien}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {product.imgLien && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Aperçu:</p>
                <Image 
                  src={product.imgLien} 
                  alt={product.nom} 
                  width={100} 
                  height={100} 
                  className="border rounded-md"
                />
              </div>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Annuler
          </button>
          
          <div className="space-x-4">
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={isLoading}
            >
              Supprimer le produit
            </button>
            
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
