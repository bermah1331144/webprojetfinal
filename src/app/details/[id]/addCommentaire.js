//Prend les info ecrit par usager et les add a la bd

import { Lisu_Bosa } from "next/font/google";
import Commentaire from "./Commentaire";
import ListCommentaire from "./listCommentaire";
import { useEffect, useState } from "react";
export default function addCommentaire({idItems}) {

    //recupere les infos ecrit par l'usager, puis les add a la bd 
    //Permet de refraichir la liste de commentaire
    const [commentaire,setCommentaire] = useState({
        date: new Date().toISOString(),
        titre: "",
        contenu: "",
        idUser: 1,
        idItems: idItems
    });
    
    const [message,setMesage] = useState("");

    const [rafraichir, setRafraichir] = useState(false);

    //gestion d#e changements dans les champs du formaulaire
    const handleCharge = (e) => {
        
        setCommentaire({
            ...commentaire,
            [e.target.name === "commentaire" ? "contenu" : e.target.name]: e.target.value
        });
    };

    //doit aller cherhcer le numeros du utilisateur
    async function idUser() {
        
    }

    //doit faire un fetch push pour aller ajouter un commentaire a ma bd    
    const handleSubmit = async (e) => {

        e.preventDefault();

        if(!commentaire.titre || !commentaire.contenu) {
            setMesage("Veuillez remplir tous les champs");
            return ;
        }

        try {
            const response = await fetch(`http://localhost:3001/commentaires`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ commentaire, idItems }),
            });
            if (response.ok) {
                console.log("Commentaire ajouté avec succès");
                setRafraichir(!rafraichir);
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }

    }


    //affiche la liste de commentaire et ajoute un commentaire

    return <>
        <div className="container-fluid row">
                <div className="col-6">
                    <form onSubmit={handleSubmit} id= "formCommentaire" className="row g-3">
                        <label htmlFor="titre" className="form-label">Titre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="titre"
                            name="titre"
                            value={commentaire.titre}
                            onChange={handleCharge}
                            requiered="true"
                        />
                        <label htmlFor="commentaire" className="form-label">Commentaire</label>
                        <textarea
                            className="form-control"
                            id="commentaire"
                            name="commentaire"
                            value={commentaire.contenu}
                            onChange={handleCharge}
                            required
                        ></textarea>
                
                        <button id="boutonCommentaire" type="submit" className="btn btn-primary">Ajouter</button>
                    </form>
                    
                </div>
                <div className="col-6" >
                    <ListCommentaire idItems={idItems}/>
                </div>

        </div>

    
    </>;
}