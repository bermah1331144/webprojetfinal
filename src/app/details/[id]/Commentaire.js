//afficher 1 seul commentaire
export default function CommentaireUnique({commentaire}) {
 

    //reste a teste, pour afficher un seul commentaire

    return <>
    
        <div id="boiteCommentaire"  className="d-flex">

            <div id="commentaire">

                <i id="iconeUser" className="bi bi-person-square col-1"></i>
                
                {commentaire ? (
                    <>
                        <p className="col-11">Titre: {commentaire.titre}
                        Contenu: {commentaire.contenu}
                        Date: {commentaire.date}</p>
                    </>
                ) : (
                    <p>Chargement du commentaire...</p>
                )}

            </div>
        </div>
    </>;
}