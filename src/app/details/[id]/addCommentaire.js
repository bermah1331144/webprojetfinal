import { useEffect, useState } from "react";
import { isAuthenticated } from "../../(hook)/auth";
export default function AddCommentaire({ idItem, onCommentaireAjoute }) {
    const [message, setMesage] = useState("");

    const [commentaire, setCommentaire] = useState({
        title: "",
        contenu: "",
        itemId: parseInt(idItem)
    });

    const handleCharge = (e) => {
        setCommentaire({
            ...commentaire,
            [e.target.name === "commentaire" ? "contenu" : e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const rawToken = localStorage.getItem('token');
        const token = rawToken?.replace(/^"(.*)"$/, '$1');

        if (!isAuthenticated()) return;

        if (!commentaire.title || !commentaire.contenu) {
            setMesage("Veuillez remplir tous les champs");
            return;
        }

        try {
            const response = await fetch(`https://projet-prog4e09.cegepjonquiere.ca/api/Commentaires`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(commentaire),
            });

            if (!response.ok) {
                setMesage("Erreur serveur : commentaire non ajouté");
                return;
            }

            setMesage("Commentaire ajouté !");
            setCommentaire({
                contenu: "",
                title: "",
                itemId: parseInt(idItem)
            });

            if (onCommentaireAjoute) {
                onCommentaireAjoute(); // 🔄 délenche le rafraîchissement
            }

        } catch (error) {
            console.error(error);
            setMesage("Une erreur est survenue lors de l'envoi.");
        }
    };

    return (
        <form onSubmit={handleSubmit} id="formCommentaire" className="row g-3">
            <label htmlFor="title" className="form-label">Titre</label>
            <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={commentaire.title}
                onChange={handleCharge}
                required
            />
            <label htmlFor="commentaire" className="form-label">Commentaire</label>
            <textarea
                className="form-control"
                id="commentaire"
                name="commentaire"
                value={commentaire.contenu}
                onChange={handleCharge}
                required
            ></textarea>
            <button id="boutonCommentaire" type="submit" className="btn btn-primary">Ajouter</button>
            {message && <div className="mt-2">{message}</div>}
        </form>
    );
}
