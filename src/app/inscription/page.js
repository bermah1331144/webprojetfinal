"use client";

import { useState } from "react";
import './style.sass';
import '../(style)/style.sass';
import bcrypt from 'bcryptjs';
export default function Inscription() {
    //gestion des messages
    const [message, setMessage] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmerPassword, setConfirmerPassword] = useState("");
    const [isErreur, setIsErreur] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const reponse = await fetch("/api/inscription", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nom, prenom, email, password, confirmerPassword }),
        });
        const data = await reponse.json();
        if (reponse.ok) {
            setMessage(data.message);
            setIsErreur(false);
            setTimeout(() => {
                window.location.href = '/PageConnexion';
              }, 1500);
        } else {
            setMessage(data.message || "Une erreur s'est produite.");
            setIsErreur(true);
        }
    }
    
    return <>
            <div id="imgFondForm"className="container-fluid h-80">
                <div className="row ">
                    <div id="BackgroundForm"className="col-4 mx-auto my-5">
                        <h1 className="text-center"> Inscription </h1>
                        <form onSubmit={handleSubmit} id = "formInscription">
                            <div className="mb-3">
                                <label htmlFor="nom" className="form-label">Nom</label>
                                <input type="text" className="form-control" id="nom" name="nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="prenom" className="form-label">Prénom</label>
                                <input type="text" className="form-control" id="prenom" name="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="courriel" className="form-label">Courriel</label>
                                <input type="email" className="form-control" id="courriel" name="courriel" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pwd" className="form-label">Mot de passe</label>
                                <input type="password" className="form-control" id="pwd" name="pwd" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="verifPwd" className="form-label">Confirmer le mot de passe</label>
                                <input type="password" className="form-control" id="verifPwd" name="verifPwd" value={confirmerPassword} onChange={(e) => setConfirmerPassword(e.target.value)} required/>
                            </div>

                            <div id="btnInscription" className="container-fluid d-flex">
                                <button  type="submit" className="btn btn-primary ">Envoyer</button>
                            </div>
                        </form>
                        {message && (
                            isErreur ? (
                                <div className="alert alert-danger mt-3">
                                {message}
                                </div>
                            ) : (
                                <div className="alert alert-info mt-3">
                                {message}
                                </div>
                            )
                            )}

                    </div>
                </div>
            </div>
  
    
    </>
    
}