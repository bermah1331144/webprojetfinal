// Ouvre (ou crée) la base de données
export function openPanierDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("PanierDB", 1);
  
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("panier")) {
        db.createObjectStore("panier", { keyPath: "id" });
      }
    };
  
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
  
  // Ajoute ou met à jour un article dans le panier
  export async function ajouterOuMettreAJourArticle(article) {
    const db = await openPanierDB();
    const tx = db.transaction("panier", "readwrite");
    const store = tx.objectStore("panier");
  
    // Vérifie si l'article existe déjà
    const existingItem = await new Promise((resolve, reject) => {
      const request = store.get(article.id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  
    if (existingItem) {
      // Incrémente la quantité
      existingItem.quantite = (existingItem.quantite || 1) + 1;
      store.put(existingItem);
    } else {
      // Ajoute l'article avec une quantité de 1
      store.put({ ...article, quantite: 1 });
    }
  
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  }
  
  // Récupère tous les articles du panier
  export async function recupererPanier() {
    const db = await openPanierDB();
    const tx = db.transaction("panier", "readonly");
    const store = tx.objectStore("panier");
  
    const result = await new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    
    return Array.isArray(result) ? result : [];
  }
  
  // Supprime un article par son ID
  // Vide complètement le panier
  export async function viderPanier() {
    const db = await openPanierDB();
    const tx = db.transaction("panier", "readwrite");
    const store = tx.objectStore("panier");
    store.clear();
    return tx.complete;
  }
  
  export async function supprimerArticle(id) {
      const db = await openPanierDB();
      const tx = db.transaction("panier", "readwrite");
      const store = tx.objectStore("panier");
      store.delete(id);
      return tx.complete;
  }
  
export async function updateQuantite(id, newQuantite) {
  const db = await openPanierDB();
  const tx = db.transaction("panier", "readwrite");
  const store = tx.objectStore("panier");
  
  const item = await new Promise((resolve, reject) => {
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  
  if (!item) return;

  if (newQuantite == 0) {
    supprimerArticle(id);
  }
  else {
    item.quantite = newQuantite;

    await new Promise((resolve, reject) => {
      const request = store.put(item);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
  return true;
}