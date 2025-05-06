"use client";
import Link from "next/link";
import { useState } from "react";
import '../(style)/style.sass'; // Assure-toi que le chemin est correct

export default function Navbar() {
  const [search, setSearch] = useState("");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark py-3 shadow-sm" style={{ backgroundColor: '#EFDCAB' }}>
      <div className="container-fluid">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <img src="/logo.png" alt="GrindHunter" className="me-2" height={40} />
          <span className="fw-bold fs-4" style={{ color: '#443627' }}>GrindHunter</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" style={{ backgroundColor: '#D98324' }}></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item mx-2">
              <Link href="/" className="btn custom-btn">
                Accueil
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link href="/page1" className="btn custom-btn">
                Link 2
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link href="/page2" className="btn custom-btn">
                Link 3
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link href="/page3" className="btn custom-btn">
                Link 4
              </Link>
            </li>
          </ul>

          <form className="d-flex me-3" role="search" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control custom-input me-2"
              type="search"
              placeholder="Recherche..."
              aria-label="Recherche"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn custom-btn" type="submit">
              Rechercher
            </button>
          </form>

          <Link href="/profil" className="btn rounded-circle custom-btn">
            <i className="bi bi-person-circle fs-4"></i>
          </Link>
        </div>
      </div>
    </nav>
      );
    }