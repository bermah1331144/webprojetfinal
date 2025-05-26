"use client";
import { useState, useEffect } from "react";
import { isAdmin } from "../../(hook)/auth";
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
                const response = await fetch(`https://projet-prog4e09.cegepjonquiere.ca/api/Items/${id}`);
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