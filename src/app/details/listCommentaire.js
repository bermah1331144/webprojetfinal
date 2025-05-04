"use client";

//Afficher tout les commentaires aller chercher dans bs avec fetch
import Commentaire from "./Commentaire";
import { useState, useEffect } from "react";
export default function listCommentaire({idMonste}) {
    //aller chercher etat de mes commentiares
    const [commentaires, setCommentaires] = useState([]);
    
    //fetch dans useEffect/get commentaires
    useEffect(() => {
        async function getCommentaires() {
            const response = await fetch(`/api/commentaires/${idMonste}`);
            const data = await response.json();
            setCommentaires(data);
        }
        getCommentaires();
    }, [idMonste]);     


    //doit afficher tout les commentaires doit use map
    return <>
        <div id="listCommentaire">
            {commentaires.map((commentaire) => (
                <Commentaire key={commentaire.id} commentaire={commentaire} />
            ))}
        </div>
    </>;
}