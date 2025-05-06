//afficher 1 seul commentaire
"use client";


import Commentaire from "../../../bd.json";
export default function commentaire({commentaire}) {
    //il va recevoir toute les infos d'un seul commentaire  
    
    //reste a teste, pour afficher un seul commentaire

    console.log(commentaire);

    //------------------ATTENTION!!!! DOIS CHANGER LES ATTIBUTS DANS ID="COMMENTAIRE" -> <p> & <p> ------------------
    return <>
    
        <div id="boiteCommentaire"  className="d-flex- flex-row-reverse">
            <div id="userIcon">
                <i className="bi bi-person-square"></i>
            </div>
            <div id="commentaire">
                <p>{Commentaire.titre}</p>
                <p>{Commentaire.date}</p>
                <p>{Commentaire.contenu}</p>
            </div>
        </div>
    </>;
}