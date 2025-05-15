"use client";
import Link from "next/link";
import { useState } from "react";
import '../(style)/style.sass'; // Assure-toi que le chemin est correct

export default function Navbar() {
  const [search, setSearch] = useState("");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark py-3 shadow-sm justify-content-center" style={{ backgroundColor: '#EFDCAB' }}>
      <div className="container-fluid row">
        <Link href="/" className="navbar-brand d-flex align-items-center col-3">
          <img src="/logo.png" alt="GrindHunter" className="me-2" height={40} />
          <span className="fw-bold fs-4" style={{ color: '#443627' }}>GrindHunter</span>
        </Link>

        <button className="navbar-toggler col-9 row justify-content-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon col-4" style={{ backgroundColor: '#D98324' }}></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between col-9 row" id="navbarNav">
          <div className="row col-8 justify-content-center align-items-center">
            <ul className="navbar-nav col-12 justify-content-center p-0">
              <li className="nav-item mx-2">
                <Link href="/" className="btn custom-btn py-2">
                  Accueil
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link href="/page1" className="btn custom-btn py-2">
                  Link 2
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link href="/page2" className="btn custom-btn py-2">
                  Link 3
                </Link>
              </li>
              <li>
                <form className="d-flex row justify-content-center d-lg-none" role="search" onSubmit={(e) => e.preventDefault()}>
                  <button className="btn col-3 " type="submit"><i className="bi bi-search custom-btn icons"></i></button>
                  <div className="col-8">
                    <input className="form-control custom-input py-2 " type="search" placeholder="Recherche" aria-label="Recherche" value={search} onChange={(e) => setSearch(e.target.value)} />
                  </div>
                </form>
              </li>
            </ul>
          </div>

          <form className="d-lg-flex me-3 col-3 row justify-content-center d-none" role="search" onSubmit={(e) => e.preventDefault()}>
            <div className="col-8">
              <input className="form-control custom-input py-2 " type="search" placeholder="Recherche" aria-label="Recherche" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <button className="btn col-3" type="submit"><i className="bi bi-search custom-btn icons"></i></button>
          </form>

          <Link href="/profil" className="btn col-1">
            <i className="bi bi-person-circle fs-4 custom-btn icons"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
}
