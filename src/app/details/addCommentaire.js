//Prend les info ecrit par usager et les add a la bd

import Commentaire from "./Commentaire";
export default function addCommentaire() {
    //il avoir les info d'un commentaire et doit ajouter a la bd
    
    
    //Fonction pour interagir avec la bd fetch/post
    
    return <>
        <div className="container">
            <div className="row">
                <div className="col">
                    <form>
                        <label htmlFor="commentaire" className="form-label">Commentaire</label>
                        <textarea className="form-control" id="commentaire" rows="3"></textarea>
                
                        <button type="submit" className="btn btn-primary">Ajouter</button>
                    </form>

                    <Commentaire/>

                </div>
            </div>
        </div>

    
    </>;
}