import { useEffect, useState } from "react";
import Commentaire from "./Commentaire";
export default function ListCommentaire({ idItems, rafraichir }) {
    const [commentaires, setCommentaires] = useState([]);
    const [afficherTout, setAfficherTout] = useState(false);

    useEffect(() => {
        async function getCommentaires() {
            if (idItems === undefined) return;
            const response = await fetch(`https://projet-prog4e09.cegepjonquiere.ca/api/Commentaires/${idItems}`);
            const data = await response.json();
            setCommentaires(Array.isArray(data) ? data : []);
        }

        getCommentaires();
    }, [idItems, rafraichir]); // ⬅️ Se relance quand rafraichir change

    const commentaireAfficher = afficherTout ? commentaires : commentaires.slice(0, 3);

    return (
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {commentaireAfficher.map((c) => (
                <Commentaire commentaire={c} key={c.id} />
            ))}
            {!afficherTout && commentaires.length > 3 && (
                <button onClick={() => setAfficherTout(true)} className="btn btn-link p-0 mt-2">
                    Afficher plus
                </button>
            )}
        </div>
    );
}
