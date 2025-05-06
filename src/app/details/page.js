"use client";
import Image from "next/image";
import "../(style)/detailsStyle.sass";
import ListCommentaire from "./listCommentaire";
import AddCommentaire from "./addCommentaire";
import Commentaire from "./Commentaire";
import { useEffect, useState } from "react";
import items from "../../../bd.json";

export default function pageDetails({/*idMonste*/}){
    const [items, setItems] = useState([]);
    
    const params = new URLSearchParams(window.location.search);
    const idMonste = parseInt(params.get("id"));
    
    //fonction pour aller chercher les infos du produit
    async function getItems() {
        try{
            const response = await fetch("../../bd.json/items");
            const data = await response.json();
            setItems(data);

        }catch(error){
            console.error("Erreur lors de la recherche du produit", error);


        }

    }
    document.addEventListener("DOMContentLoaded", getItems);


/*     doit aller fetch les informations du produit et les afficher
    useEffect(() => {
        async function getItems() {
            const response = await fetch("../../bd.json/items");
            const data = await response.json();
            setItems(data);
        }
        getItems();
    },[]);
    const item = items.find((i) => i.Id === id);
    const commentaire = item?.Commentaire?.[0]; */
    
    return<>
        <div>
            <h1>{items.Nom}</h1>
            <div className="container">
                <div className="row justify-content-center">
                        <Image className="imageProduit"
                            src="/monstre/Arkveld.png"
                            alt="Produit "
                            width={180}
                            height={38}
                            priority
                        />
                    </div>
                </div>
        
                {/* ------------------ au besoin mettre les composants en commentaire pour faire test unitaire ----------------*/}
                <a className="btn btn-primary" href="/panier"><i className="bi bi-bag"></i>Ajouter au panier</a>
        
                <ListCommentaire idMonste={idMonste}/>
                
                <AddCommentaire idMonste= {idMonste}/>
         </div>            
    </> 
 } 