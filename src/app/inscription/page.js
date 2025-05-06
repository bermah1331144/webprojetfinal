
export default function Inscription() {
    //doit faire un fetch post qunad on clique sur submit



    
    
    
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
                                <input type="email" className="form-control" id="Email1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Password1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="Password" />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
  
    
    </>
    
}