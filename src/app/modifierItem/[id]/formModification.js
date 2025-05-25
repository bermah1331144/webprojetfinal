import Confirmation from "./confirmation";
import { useState, useEffect } from "react";
export default function FormModification({item: initialItem}) {
    const [item, setItem] = useState(initialItem);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalAction, setModalAction] = useState(() => () => {});

    useEffect(() => {
        if (initialItem) {
          setItem(initialItem);
        }
      }, [initialItem]);
      

    const openModal = (message, actionFn) => {
        setModalMessage(message);
        setModalAction(() => actionFn);
        setShowModal(true);
      };
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === "number" ? parseFloat(value) || 0 : value;
      
        setItem((prevItem) => ({
          ...prevItem,
          [name]: newValue,
        }));
      };

    const handleUpdate = () => {
        openModal("Confirmer la modification de l'item ?", async () => {
          try {
            const response = await fetch(`http://localhost:3001/items/${item.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(item),
            });
            if (!response.ok) throw new Error("Erreur lors de la modification");
            console.log("→ ITEM MODIFIÉ !");
            setShowModal(false);
          } catch (error) {
            console.error(error);
            alert("Erreur lors de la modification");
            setShowModal(false);
          }
        });
      };
    
      const handleDelete = () => {
        openModal("Es-tu sûr de vouloir supprimer cet item ?", async () => {
          try {
            const response = await fetch(`http://localhost:3001/items/${item.id}`, {
              method: "DELETE",
            });
            if (!response.ok) throw new Error("Erreur lors de la suppression");
            console.log("→ ITEM SUPPRIMÉ !");
            setShowModal(false);
            
            // redirection
            window.location.href = "/pagePrincipale";
          } catch (error) {
            console.error(error);
            alert("Erreur lors de la suppression");
            setShowModal(false);
          }
        });

      };
      

    return<>
        <form className="custom-form">
            <label className="custom-form__label">Nom</label>
            <input className="form-control custom-form__input" type="text" name="nom" value={item.nom || ""} onChange={handleChange} />
        
            <label className="custom-form__label">Description</label>
            <textarea className="form-control custom-form__input" name="description" value={item.description || ""} onChange={handleChange} rows={3} />
        
            <label className="custom-form__label">Rareté</label>
            <select className="form-control custom-form__input" name="rarity" value={item.rarity || ""} onChange={handleChange}>
                <option value="">-- Select Rarity --</option>
                {[2, 3, 4, 5, 6, 7].map(val => (
                <option key={val} value={val}>{val}</option>
                ))}
            </select>
        
            <label className="custom-form__label">URL de l'image</label>
            <input className="form-control custom-form__input" type="text" name="imgLien" value={item.imgLien || ""} onChange={handleChange} />
            {item.imgLien ? (
            <div className="custom-form__image-preview mt-3 text-center">
                <img
                    src={item.imgLien}
                    alt="Aperçu de l'image"
                    onError={(e) => e.currentTarget.style.display = 'none'}
                />
            </div>
            ) : (
                <p className="text-muted text-center mt-2">Aucune image à afficher</p>
            )}
    
            <div className="row justify-content-between">
                <div className="col-6">
                    <label className="custom-form__label">Prix de vente</label>
                    <input className="form-control custom-form__input" type="number" name="prixVente" value={item.prixVente || ""} onChange={handleChange} />
                </div>
                <div className="col-6">
                    <label className="custom-form__label">Prix d'achat</label>
                    <input className="form-control custom-form__input" type="number" name="prixAchat" value={item.prixAchat || ""} onChange={handleChange} />
                </div>
            </div>
            <div className="d-flex justify-content-between mt-4">
                <button type="button" className="btn btn-primary custom-form__button" onClick={handleUpdate}>
                    Modifier
                </button>
                <button type="button" className="btn btn-danger custom-form__button" onClick={handleDelete}>
                    Supprimer
                </button>
            </div>
        </form>
        
        <Confirmation show={showModal} message={modalMessage} onConfirm={modalAction} onCancel={() => setShowModal(false)} />
  </>
}