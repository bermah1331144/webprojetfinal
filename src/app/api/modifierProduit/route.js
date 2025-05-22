import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import fs from 'fs';
import path from 'path';

// Chemin vers votre fichier JSON
const dbPath = path.join(process.cwd(), 'data', 'db.json');

// Fonction pour lire le fichier JSON
const readDB = () => {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

// Fonction pour écrire dans le fichier JSON
const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
};

// GET - Récupérer un produit spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const db = readDB();
    
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
      { error: 'Erreur lors de la récupération du produit' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un produit
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Vérifier si l'utilisateur est authentifié et a les droits d'administrateur
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }
    
    const id = parseInt(params.id, 10);
    const updatedProduct = await request.json();
    
    const db = readDB();
    const productIndex = db.items.findIndex(item => item.id === id);
    
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Produit non trouvé' },
        { status: 404 }
      );
    }
    
    // Mettre à jour le produit
    db.items[productIndex] = {
      ...updatedProduct,
      id: id // S'assurer que l'ID reste le même
    };
    
    // Sauvegarder les modifications
    writeDB(db);
    
    return NextResponse.json(db.items[productIndex]);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du produit' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un produit
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Vérifier si l'utilisateur est authentifié et a les droits d'administrateur
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }
    
    const id = parseInt(params.id, 10);
    const db = readDB();
    
    // Filtrer pour retirer le produit
    db.items = db.items.filter(item => item.id !== id);
    
    // Sauvegarder les modifications
    writeDB(db);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du produit' },
      { status: 500 }
    );
  }
}


