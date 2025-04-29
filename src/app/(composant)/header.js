import Link from "next/link"
export default function(){
    return <>
        <nav className="navbar navbar-expand-lg bg-tertiary">
            <div className="container-fluid fw-bold">
                <div className="row col-3 justify-content-center align-items-center">
                    <img src="../logo.png" alt="GrindHunter" className="logo col-12" />
                    <h2 className="col-12 text-center d-none d-lg-block">GrindHunter</h2>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center col-6" id="navbarNav">
                    <div className="row col-9">
                        <ul className="navbar-nav col-12 justify-content-center">
                            <li className="nav-item">
                                <Link className="nav-link active mx-4" aria-current="page" href="/accueil">Accueil</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-4" href="#">Link 2</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-4" href="#">Link 3</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-4" href="#">Link 4</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="row col-3 justify-content-center align-items-center">
                        <Link className="navbar-brand col-1 text-center bi bi-person-square userIcon" href="#"></Link>
                    </div>
                </div>
            </div>
    </nav>
    </>
}