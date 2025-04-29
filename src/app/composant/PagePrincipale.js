"use client";

//permet d'aller chercher mes composants
import Footer from "./Footer";
import Header from "./Header";

export default function PagePrincipale() {
    return (
        <>
            <Header/>
            <h1>Page Principale</h1>
            <Footer/>
        </>
    );
}