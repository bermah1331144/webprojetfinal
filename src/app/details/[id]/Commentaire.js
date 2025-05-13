//afficher 1 seul commentaire
"use client";
import { useState, useEffect } from "react";
export default function CommentaireUnique({id}) {
    //il va recevoir toute les infos d'un seul commentaire  
    const [commentaire, setCommentaire] = useState([]);

    useEffect(() => {
        async function getCommentaire() {
            try{
                const response = await fetch(`http://localhost:3001/commentaires?id=${id}`);
                const data = await response.json();
                setCommentaire(data);
            }catch(error){
                console.error("Erreur lors de la recherche du commentaire", error);    
            }
        }
            getCommentaire();
    }, [id]);

    if(!commentaire) return <p>Chargement...</p>;
    
    //reste a teste, pour afficher un seul commentaire



    //------------------ATTENTION!!!! DOIS CHANGER LES ATTIBUTS DANS ID="COMMENTAIRE" -> <p> & <p> ------------------
    return <>
    
        <div id="boiteCommentaire"  className="d-flex- flex-row-reverse">

            <div id="commentaire">
                <div id="userIcon">
                    <i className="bi bi-person-square"></i>
                </div>
                <p>{commentaire.titre}</p>
                <p>{commentaire.date}</p>
                <p>{commentaire.contenu}</p>
            </div>
        </div>
    </>;
}