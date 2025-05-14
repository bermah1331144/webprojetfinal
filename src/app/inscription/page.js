"use client";

import { useState } from "react";
import './style.sass';
import '../(style)/style.sass';
export default function Inscription() {
    //gestion des messages
    const [message, setMessage] = useState("");

    //gestion des utilisateurs
    const [utilisateur, setUtilisateur] = useState({
        Nom: "",
        Prenom: "",
        Pseudo: "",
        Email: "",
        Password: "",
        ConfirmerPassword: ""   
    });

    //gestion des changements dans les champs du formaulaire
    const handleCharge = (e) => {
        setUtilisateur({
            ...utilisateur,
            [e.target.name]: e.target.value
        });
    };


    
    //gere la soumission du formulaire si champs vides
    //------------------------------- Le message d'erreur n'apparait pas dan le navigateur -------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!utilisateur.Nom || !utilisateur.Prenom || !utilisateur.Pseudo || !utilisateur.Email || !utilisateur.Password || !utilisateur.ConfirmerPassword){
            setMessage("Veuillez remplir tous les champs");
            return ;
        }
        
        try{
            const reponse = await fetch("http://localhost:3001/utilisateurs",{ 
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(utilisateur)
            });

            if (reponse.ok) {
                setMessage("Données envoyées avec succès");
            }

            const data = await reponse.json();
            setMessage("Utilisateur créé:", data);

            setUtilisateur({
                Nom: "",
                Prenom: "",
                Pseudo: "",
                Email: "",
                Password: "",
                ConfirmerPassword: ""   

            });

            setMessage("Inscription réussie!");

        }catch(error){
            console.error("Erreur lors de la recherche du produit", error);
            setMessage("Une erreur s'est produite lors de l'inscription.");
        }
    }


    //affiche le formulaire
    
    return <>

            <div id="imgFondForm"className="container-fluid  ">
                <div className="row">
                    <div id="BackgroundForm"className="col-4 mx-auto mt-5">
                        <h1 className="text-center"> Inscription </h1>
                        <form onSubmit={handleSubmit} id = "formInscription">
                            <div className="mb-3">
                                <label htmlFor="Nom" className="form-label">Nom</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Nom"
                                    name="Nom"
                                    value={utilisateur.nom}
                                    onChange={handleCharge}
                                    required
                                />
                            </div>
                            <div> 
                                <label htmlFor="Prenom" className="form-label">Prenom</label>
                                <input 
                                    type="text"    
                                    className="form-control" 
                                    id="Prenom" 
                                    name="Prenom"
                                    value={utilisateur.Prenom}
                                    onChange={handleCharge}
                                    required
                                    
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Pseudo" className="form-label">Pseudo</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    id="Pseudo"
                                    name="Pseudo"
                                    value={utilisateur.Pseudo}
                                    onChange={handleCharge}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Email1" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    name="Email"
                                    value={utilisateur.Email}
                                    onChange={handleCharge}
                                    required
                                />
                                <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Password" className="form-label">Password</label>
                                <input 
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    name="Password"
                                    value={utilisateur.Password}
                                    onChange={handleCharge}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Password" className="form-label">Confirmer le mot de passe</label>
                                <input 
                                    type="password"
                                    className="form-control"
                                    id="ConfirmerPassword"
                                    name="ConfirmerPassword"
                                    value={utilisateur.ConfirmerPassword}
                                    onChange={handleCharge}
                                    required
                                    />
                            </div>
                            <div className="mb-3 form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input"
                                    id="exampleCheck1"
                                />
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div>
                            <div id="btnInscription" className="container-fluid d-flex">
                                <button  type="submit" className="btn btn-primary ">Envoyer</button>
                            </div>
                        </form>
                        {message && (
                            <div className="alert alert-info mt-3">
                                {message}
                            </div>
                        )}

                    </div>
                </div>
            </div>
  
    
    </>
    
}