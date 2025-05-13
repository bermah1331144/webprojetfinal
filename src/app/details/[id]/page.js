"use client";
import Image from "next/image";
import "../../(style)/detailsStyle.sass";
import ListCommentaire from "./listCommentaire";
import AddCommentaire from "./addCommentaire";
import { useEffect, useState } from "react";
import { use } from "react";
export default function pageDetails({params}){
    const [items, setItems] = useState([]);
    const { id }= use(params);

    //const URLSearchParams = new URLSearchParams(window.location.search);
    
    //fonction pour aller chercher les infos du produit
    useEffect(() => {
        async function getItems() {

            try{
                const response = await fetch(`http://localhost:3001/items?Id=${id}`);
                const data = await response.json();
                await setItems(data[0]);
                   

            }catch(error){
                console.error("Erreur lors de la recherche du produit", error);
            }

        }
                  
        getItems();
    },[])

    const imageLien = items.imgLien;

    return<>
        <div>
            <div>
                <h1>{items.Nom}</h1>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <img src={imageLien} alt="Produit"/>
                    <div className="col-md-6 justify-content-center">   
                        <h2>Description items</h2>
                        <p>{items.description}</p>
                    </div> 
                </div>
        
                {/* ------------------ au besoin mettre les composants en commentaire pour faire test unitaire ----------------*/}
                <a className="btn btn-primary" href="/panier"><i className="bi bi-bag"></i>Ajouter au panier</a>
                <div className="zoneCommentaire">
                    <ListCommentaire idMonste={id}/>

                    <AddCommentaire idMonste= {id}/>


                </div>
            </div>
         </div>            

    </>;
}