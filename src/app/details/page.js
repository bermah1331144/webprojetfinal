"use client";
import Image from "next/image";
import "../(style)/detailsStyle.sass";
import ListCommentaire from "./listCommentaire";
import AddCommentaire from "./addCommentaire";
import { useEffect, useState } from "react";

export default function pageDetails({/*idMonste*/}){
    const [items, setItems] = useState([]);
    const [itemActuel, setItemActuel] = useState([]); 
    
    const params = new URLSearchParams(window.location.search);
    const idMonste = parseInt(params.get("id"));
    
    //fonction pour aller chercher les infos du produit
    useEffect(() => {
        async function getItems() {
            try{
                const response = await fetch(`http://localhost:3001/items?id=${idMonste}`);
                const data = await response.json();
                setItems(data);

                const trouveItem = items.find((i) => i.id === idMonste);
                setItemActuel(trouveItem);


            }catch(error){
                console.error("Erreur lors de la recherche du produit", error);


            }

        }
        getItems();
    },[idMonste])

    
    return<>
        <div>
            <div>
                {itemActuel ? (
                <h1>{itemActuel.nom}</h1>
            ) : (
            <p>Chargement de l'item...</p>
            )}
            </div>
            <h1>Nom items</h1>
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