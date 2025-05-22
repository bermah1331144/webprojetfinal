"use client";
import useCart from "../../(hook)/useCart";
import "../../(style)/detailsStyle.sass";
import AddCommentaire from "./addCommentaire";
import { useEffect, useState } from "react";
import { use } from "react";
import './style.sass';
import {ajouterOuMettreAJourArticle} from '../../(hook)/panier';
import Notification from '../../(composant)/notification';

export default function pageDetails({params}){
    const [item, setItem] = useState([]);
    const { id }= use(params);
    const {addToCart, notificationMessage, showNotification, closeNotification} = useCart();

    //const URLSearchParams = new URLSearchParams(window.location.search);
    
    //fonction pour aller chercher les infos du produit
    useEffect(() => {
        async function getItems() {
            try{
                const response = await fetch(`http://localhost:3001/items?id=${id}`);
                const data = await response.json();
                setItem(data[0]);
            }
            catch(error){
                console.error("Erreur lors de la recherche du produit", error);
            }
        }       
        getItems();
    },[])
    
    const imageLien = item.imgLien;

    return<>
        <Notification message={notificationMessage} visible={showNotification} duration={3000} onClose={() => closeNotification()} />
        <div id="backgroundAfficheProduit" className="pt-5 py-5">
            <div id="afficheProduit" className="container-fluid">
                <div id ="boiteProduit" >  
                    <h1>{item.Nom}</h1>
                    <div className="row justify-content-center ">
                        <h1>{item.nom}</h1>
                        <img src={imageLien} alt="Produit" className="img-fluid col-md-3"/>
                        <div className="col-12col-md-6 justify-content-center text-center">   
                            <h2>Description item</h2>
                            <p className="p">{item.description}</p>
                        </div> 
                    </div>
                    <button className="btn btn-primary" href="/panier" onClick={() => addToCart(item)}><i className="bi bi-bag pe-2"></i>Ajouter au panier</button>
                    <div className="zoneCommentaire">

                        <AddCommentaire idMonste= {id} idItem={id}/>

                    </div>
                </div>
            </div>
         </div>            

    </>;
}