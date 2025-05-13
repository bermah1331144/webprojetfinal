"use client";



//Afficher tout les commentaires aller chercher dans bs avec fetch
import Commentaire from "./Commentaire";
import { useState, useEffect } from "react";
import { use } from "react";
export default function listCommentaire({params}) {
    //aller chercher etat de mes commentiares
    const [commentaires, setCommentaires] = useState([]);
    //fetch dans useEffect/get commentaires
    useEffect(() => {
        async function getCommentaires() {
            const response = await fetch(`http://localhost:3001/commentaires?idItems=${id}`);
            const data = await response.json();
            setCommentaires(data);
            console.log(data);
        }
        getCommentaires();
    }, []);     



    //doit afficher tout les commentaires doit use map
    return <>
        <div className ="container-fluid revese row col-4" id="listCommentaire">
            {commentaires.map((c) => <Commentaire commentaire={c} key={c.id} />)};
        </div>
    </>;
}