"use client";
import { useState, useEffect } from "react";
import { isAdmin } from "../../utils/auth";
import { useParams } from "next/navigation";
import "../../(style)/modification.scss";
import FormModification from "./formModification";

export default function(){
    const [item, setItem] = useState({});

    const id = useParams().id;

    useEffect(() => {
        if(!isAdmin()){
            window.location.href = "/pagePrincipale";
        }
        const fetchItem = async () => {
            try {
                const response = await fetch(`http://localhost:3001/items/${id}`);
                const data = await response.json();
                setItem(data);
            } catch (err) {
                console.error("Erreur lors du chargement de l'item :", err);
            }
        };

        fetchItem();
    }, []);

    return<>
        <FormModification item={item} />
    </>
}