import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import fs from 'fs/promises';
import path from 'path';

// Chemin vers votre fichier JSON
const dbPath = path.join(process.cwd(), 'data', 'db.json');

// Fonction pour lire le fichier JSON de manière asynchrone
const readDB = async () => {
  try {
    const data = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erreur lors de la lecture de la base de données:', error);
    // Retourner une structure par défaut si le fichier n'existe pas
    return { items: [] };
  }
};

// Fonction pour écrire dans le fichier JSON de manière asynchrone
const writeDB = async (data) => {
  try {
    // S'assurer que le dossier existe
    const dir = path.dirname(dbPath);
    await fs.mkdir(dir, { recursive: true });
    
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Erreur lors de l\'écriture de la base de données:', error);
    throw error;
  }
};

// Fonction de validation des données produit
const validateProduct = (product) => {
  const errors = [];
  
  if (!product.name || typeof product.name !== 'string' || product.name.trim().length === 0) {
    errors.push('Le nom du produit est requis');
  }
  
  if (product.price === undefined || typeof product.price !== 'number' || product.price < 0) {
    errors.push('Le prix doit être un nombre positif');
  }
  
  if (product.stock !== undefined && (typeof product.stock !== 'number' || product.stock < 0)) {
    errors.push('Le stock doit être un nombre positif');
  }
  
  return errors;
};

// GET - Récupérer un produit spécifique
export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id, 10);
    
    // Vérifier si l'ID est valide
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID invalide' },
        { status: 400 }
      );
    }
    
    const db = await readDB();
    const product = db.items.find(item => item.id === id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Produit non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un produit
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Vérifier si l'utilisateur est authentifié et a les droits d'administrateur
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Non autorisé - droits administrateur requis' },
        { status: 403 }
      );
    }
    
    const id = parseInt(params.id, 10);
    
    // Vérifier si l'ID est valide
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID invalide' },
        { status: 400 }
      );
    }
    
    const updatedProduct = await request.json();
    
    // Valider les données du produit
    const validationErrors = validateProduct(updatedProduct);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Données invalides', details: validationErrors },
        { status: 400 }
      );
    }
    
    const db = await readDB();
    const productIndex = db.items.findIndex(item => item.id === id);
    
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Produit non trouvé' },
        { status: 404 }
      );
    }
    
    // Mettre à jour le produit en conservant l'ID et les timestamps
    const originalProduct = db.items[productIndex];
    db.items[productIndex] = {
      ...updatedProduct,
      id: id, // S'assurer que l'ID reste le même
      createdAt: originalProduct.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Sauvegarder les modifications
    await writeDB(db);
    
    return NextResponse.json({
      success: true,
      product: db.items[productIndex]
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un produit
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Vérifier si l'utilisateur est authentifié et a les droits d'administrateur
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Non autorisé - droits administrateur requis' },
        { status: 403 }
      );
    }
    
    const id = parseInt(params.id, 10);
    
    // Vérifier si l'ID est valide
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID invalide' },
        { status: 400 }
      );
    }
    
    const db = await readDB();
    const productExists = db.items.some(item => item.id === id);
    
    if (!productExists) {
      return NextResponse.json(
        { error: 'Produit non trouvé' },
        { status: 404 }
      );
    }
    
    // Filtrer pour retirer le produit
    const originalLength = db.items.length;
    db.items = db.items.filter(item => item.id !== id);
    
    // Vérifier que la suppression a bien eu lieu
    if (db.items.length === originalLength) {
      return NextResponse.json(
        { error: 'Échec de la suppression' },
        { status: 500 }
      );
    }
    
    // Sauvegarder les modifications
    await writeDB(db);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Produit supprimé avec succès',
      deletedId: id 
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}