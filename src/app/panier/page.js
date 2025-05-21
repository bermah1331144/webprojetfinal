"use client";
import { useState, useEffect } from "react";
export default function Panier(){
    const [panier, setPanier] = useState([]);

    useEffect(() => {
        const storedPanier = localStorage.getItem("panier");
        if (storedPanier) {
          setPanier(JSON.parse(storedPanier));
        }
    }, []);
    
    console.log(panier);
    return(<h1>panier</h1>)
}