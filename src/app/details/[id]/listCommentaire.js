"use client";


//Afficher tout les commentaires aller chercher dans bs avec fetch
import Commentaire from "./Commentaire";
import { useState, useEffect } from "react";
import { use } from "react";
export default function listCommentaire({idItems}) {
   
    //aller chercher etat de mes commentiares
    const [commentaires, setCommentaires] = useState([]);

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
    }, []);     



    //doit afficher tout les commentaires doit use map
    //--------------------------------------------- PBL double affichage de commentaire ---------------------------------------------
    return <>
        <div className ="container-fluid row-justify-content-right col-4" id="listCommentaire">
            {commentaires.map((c) => <Commentaire commentaire={c} key={c.id} />)}
            

        </div>
    </>;
}