import Link from "next/link";

export default function Header(){
    return<>
        <nav className="navbar bg-body-tertiary">
            <div>
                {/*<img src "">LOGO</img>*/}
                <form className="container-fluid justify-content-start">
                    <button className="btn btn-sm btn-outline-secondary" type="button">Accueil</button>
                    <button className="btn btn-sm btn-outline-secondary" type="button">Nouvelles</button>
                    <button className="btn btn-sm btn-outline-secondary" type="button">A propos</button>
                    <button className="btn btn-sm btn-outline-secondary" type="button">Nous Contacter</button>
                </form>
                <svg className="bi bi-person-square" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                </svg>
            </div>
            <div className="container-fluid">
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>
    </>
    
}