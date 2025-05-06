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
            const response = await fetch(`http://localhost:3001/commentaires?idMonstre=${idMonste}`);
            const data = await response.json();
            setCommentaires(data);
        }
        getCommentaires();
    }, [idMonste]);     

    const affichage = commentaires.map((c) => <Commentaire commentaire={c} key={c.id} />);


    //doit afficher tout les commentaires doit use map
    return <>
        <div id="listCommentaire">
            {affichage}
        </div>
    </>;
}