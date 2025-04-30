import Link from "next/link"
export default function(){
    return <>
        <nav className="navbar navbar-expand-lg bg-tertiary">
            <div className="container-fluid fw-bold">
                <div className="row col-3 col-xl-2 justify-content-center align-items-center">
                    <img src="../logo.png" alt="GrindHunter" className="logo col-12" />
                    <h2 className="col-12 text-center d-none d-lg-block">GrindHunter</h2>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center row col-9" id="navbarNav">
                    <div className="col-8 col-xl-10 row">
                        <ul className="navbar-nav col-12 justify-content-center">
                            <li className="nav-item">
                                <Link className="nav-link active me-4" aria-current="page" href="/">Accueil</Link>
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
                    <div className="col-4 col-xl-2 row justify-content-center align-items-center">
                        <Link className="navbar-brand text-end bi bi-person-square userIcon" href="#"></Link>
                    </div>
                </div>
            </div>
    </nav>
    </>
}