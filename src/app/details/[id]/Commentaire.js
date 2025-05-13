//afficher 1 seul commentaire
export default function CommentaireUnique({commentaire}) {
 

    //reste a teste, pour afficher un seul commentaire


    //------------------ATTENTION!!!! DOIS CHANGER LES ATTIBUTS DANS ID="COMMENTAIRE" -> <p> & <p> ------------------
    return <>
    
        <div id="boiteCommentaire"  className="d-flex- flex-row-reverse">

            <div id="commentaire">
                <div id="userIcon">
                    <i className="bi bi-person-square"></i>
                </div>
                {commentaire ? (
                    <>
                        <p>{commentaire.titre}</p>
                        <p>{commentaire.date}</p>
                        <p>{commentaire.contenu}</p>
                    </>
                ) : (
                    <p>Chargement du commentaire...</p>
                )}

            </div>
        </div>
    </>;
}