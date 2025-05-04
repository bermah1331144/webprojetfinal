//afficher 1 seul commentaire
"use client";

import Commentaire from "./Commentaire";
export default function commentaire({commentaire}) {
    //il va recevoir toute les infos d'un seul commentaire  
    
    //reste a teste, pour afficher un seul commentaire

    //------------------ATTENTION!!!! DOIS CHANGER LES ATTIBUTS DANS ID="COMMENTAIRE" -> <p> & <p> ------------------
    return <>
        <div id="boiteCommentaire"  className="d-flex- flex-row-reverse">
            <div id="userIcon">
                <i className="bi bi-person-square"></i>
            </div>
            <div id="commentaire">
                <p>Nom du commentaire</p>
                <p>Cette object est merveilleux</p>
            </div>
        </div>
    </>;
}