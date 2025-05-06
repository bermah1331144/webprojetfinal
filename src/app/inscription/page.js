import { headers } from "next/headers";

export default function Inscription() {
    
    //doit faire un fetch post qunad on clique sur submit dans une fonction
    async function EnvoyerDonneesUtilsateurs() {
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        console.log(data);
        try{
            const reponse = await fetch("../../bd.json/utilisateurs",{ 
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });

            if(reponse.ok){
                console.log("Utilisateur ajouté");
                this.reset();
            }else{
                console.log("Erreur lors de l'ajout de l'utilisateur");
            }
        }catch(error){
            console.log(error);
        }
        document.getElementById("formInscription").addEventListener("submit", (e) => {
            e.preventDefault(); // Empêche l'envoi classique
            EnvoyerDonneesUtilisateurs(); // Appelle la fonction
          });
        return function reset() {
            document.getElementById("formInscription").reset();
        };
    }


    
    return <>

            <div className="container">
                <div className="row">
                    <div className="col-4 mx-auto">
                        <h1> Inscription </h1>
                        <form id = "formInscription">
                            <div className="mb-3">
                                <label htmlFor="Nom" className="form-label">Nom</label>
                                <input type="text" className="form-control" id="Nom" />
                            </div>
                            <div> 
                                <label htmlFor="Prenom" className="form-label">Prenom</label>
                                <input type="text" className="form-control" id="Prenom" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Pseudo" className="form-label">Pseudo</label>
                                <input type="text" className="form-control" id="Pseudo" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Email1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="Email" aria-describedby="email" />
                                <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="Password" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Password" className="form-label">Confirmer le mot de passe</label>
                                <input type="password" className="form-control" id="ConfirmerPassword" />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Envoyer</button>
                        </form>
                    </div>
                </div>
            </div>
  
    
    </>
    
}