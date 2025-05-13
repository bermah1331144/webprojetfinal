//Prend les info ecrit par usager et les add a la bd

import { Lisu_Bosa } from "next/font/google";
import Commentaire from "./Commentaire";
import ListCommentaire from "./listCommentaire";
export default function addCommentaire() {
    //il avoir les info d'un commentaire et doit ajouter a la bd
    
    
    //Fonction pour interagir avec la bd fetch/post
    
    return <>
        <div className="container-fluid row">
                <div className="col-6">
                    <form>
                        <label htmlFor="commentaire" className="form-label">Commentaire</label>
                        <textarea className="form-control" id="commentaire" rows="3"></textarea>
                
                        <button type="submit" className="btn btn-primary">Ajouter</button>
                    </form>
                    
                </div>
                <div className="col-6" >
                    <Commentaire/>

                    <ListCommentaire/>
                </div>

        </div>

    
    </>;
}