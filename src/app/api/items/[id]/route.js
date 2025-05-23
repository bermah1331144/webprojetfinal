import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Chemin vers votre fichier JSON à la racine du projet
// Modifier cette ligne
const dbPath = path.join(process.cwd(), 'bd.json');  // au lieu de 'data', 'db.json'


// Lire la base de données
const readDB = async () => {
  try {
    const data = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erreur lors de la lecture de la base de données:', error);
    return { items: [] };
  }
};

// Écrire dans la base de données
const writeDB = async (data) => {
  try {
    const dir = path.dirname(dbPath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Erreur lors de l\'écriture de la base de données:', error);
    throw error;
  }
};

// Authentification admin
const validateAuth = (request) => {
  try {
    const userAuthHeader = request.headers.get('x-user-auth');

    if (!userAuthHeader) {
      return { isValid: false, error: 'Header d\'authentification manquant' };
    }

    const userData = JSON.parse(decodeURIComponent(userAuthHeader));

    if (!userData.isLoggedIn) {
      return { isValid: false, error: 'Utilisateur non connecté' };
    }

    if (userData.roleId !== 1) {
      return { isValid: false, error: 'Droits administrateur requis' };
    }

    return { isValid: true, userData };
  } catch (error) {
    console.error('Erreur lors de la validation d\'authentification:', error);
    return { isValid: false, error: 'Données d\'authentification invalides' };
  }
};

// Validation produit
const validateProduct = (product) => {
  const errors = [];

  if (!product.nom || typeof product.nom !== 'string' || product.nom.trim().length === 0) {
    errors.push('Le nom du produit est requis');
  }

  if (product.prixVente === undefined || typeof product.prixVente !== 'number' || product.prixVente < 0) {
    errors.push('Le prix de vente doit être un nombre positif');
  }

  if (product.prixAchat === undefined || typeof product.prixAchat !== 'number' || product.prixAchat < 0) {
    errors.push('Le prix d\'achat doit être un nombre positif');
  }

  if (product.rarity === undefined || typeof product.rarity !== 'number' || product.rarity < 1 || product.rarity > 10) {
    errors.push('La rareté doit être un nombre entre 1 et 10');
  }

  return errors;
};

export async function GET(request, context) {
  try {
    const id = context.params.id.toString();
    const db = await readDB();

    console.log("URL params:", context.params);
    console.log("ID recherché:", id, "Type:", typeof id);
    console.log("Nombre d'items dans la DB:", db.items.length);
    console.log("Premier item:", db.items[0]);
    
    // Vérifions chaque item pour voir pourquoi la correspondance échoue
    db.items.forEach(item => {
      console.log(`Comparaison - Item ID: ${item.id} (${typeof item.id}) avec recherché: ${id} (${typeof id}) - Match: ${item.id === id}`);
    });

    const product = db.items.find(item => item.id === id.toString());


    if (!product) {
      console.log("❌ Produit non trouvé");
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
    }

    console.log("✅ Produit trouvé:", product);
    return NextResponse.json(product);
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}



// PUT - Modifier un produit
export async function PUT(request, context) {
  try {
    const authResult = validateAuth(request);
    if (!authResult.isValid) {
      return NextResponse.json({ error: authResult.error }, { status: 403 });
    }

    const id = context.params.id;

    if (!id) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const updatedProduct = await request.json();
    const validationErrors = validateProduct(updatedProduct);

    if (validationErrors.length > 0) {
      return NextResponse.json({ error: 'Données invalides', details: validationErrors }, { status: 400 });
    }

    const db = await readDB();
    const productIndex = db.items.findIndex(item => item.id === id);

    if (productIndex === -1) {
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
    }

    const originalProduct = db.items[productIndex];
    db.items[productIndex] = {
      ...updatedProduct,
      id: id,
      createdAt: originalProduct.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await writeDB(db);

    return NextResponse.json({ success: true, product: db.items[productIndex] });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

// DELETE - Supprimer un produit
export async function DELETE(request, context) {
  try {
    const authResult = validateAuth(request);
    if (!authResult.isValid) {
      return NextResponse.json({ error: authResult.error }, { status: 403 });
    }

    const id = context.params.id;

    if (!id) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const db = await readDB();
    const productExists = db.items.some(item => item.id === id);

    if (!productExists) {
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
    }

    db.items = db.items.filter(item => item.id !== id);
    await writeDB(db);

    return NextResponse.json({
      success: true,
      message: 'Produit supprimé avec succès',
      deletedId: id
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
