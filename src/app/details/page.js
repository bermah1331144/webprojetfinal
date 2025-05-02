import Image from "next/image";
import "../(style)/detailsStyle.sass";
import ListCommentaire from "./listCommentaire";
import AddCommentaire from "./addCommentaire";



export default function pageDetails(){
    return<>
        <h1>nom du produit{}</h1>
        <Image
            className="imageProduit"
            src="/monstre/Arkveld.png"
            alt="Produit "
            width={180}
            height={38}
            priority
        />
 
        <p>description du produit</p>
        <p>prix du produit</p>

        {/* ------------------ au besoin mettre les composants en commentaire pour faire test unitaire ----------------*/}
        <a className="btn btn-primary" href="/panier"><i class="bi bi-bag"></i>Ajouter au panier</a>
 
        <ListCommentaire/>
        
        <AddCommentaire/>




    
    </>
 } 