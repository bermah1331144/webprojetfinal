"use client";


//Afficher tout les commentaires aller chercher dans bs avec fetch
import Commentaire from "./Commentaire";
import { useState, useEffect } from "react";
import { use } from "react";
import AddCommentaire from "./addCommentaire";
export default function listCommentaire({idItems}) {
   
    //aller chercher etat de mes commentiares
    const [commentaires, setCommentaires] = useState([]);
    const [afficherTout, setAfficherTout] = useState(false);

    const commentaireAfficher = afficherTout ? commentaires : commentaires.slice(0, 3);

    //fetch dans useEffect/get commentaires pour aller chercher les commentaires d'un item
    useEffect(() => {
        async function getCommentaires() {
            const response = await fetch(`http://localhost:3001/commentaires?idItems=${idItems}`);
            const data = await response.json();
            setCommentaires(data);
            console.log(data);
        }
        
        getCommentaires();
        console.log(commentaires);
    }, [idItems, AddCommentaire.setRafraichir]);     



    //doit afficher tout les commentaires doit use map
    //--------------------------------------------- PBL double affichage de commentaire ---------------------------------------------
    return <>
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {commentaires.map((c) => (
                <Commentaire commentaire={c} key={c.id} />
            ))}
            {!afficherTout && commentaires.length > 3 && (
                <button onClick={() => setAfficherTout(true)} className="btn btn-link p-0 mt-2">
                    Afficher plus
            </button>
            )}
        </div>
    </>;
}