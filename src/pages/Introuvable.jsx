// src/pages/Introuvable.jsx
import { Link } from "react-router";

function Introuvable() {
  return (
    <main className="conteneur">
      <div className="etat-erreur" role="alert">
        <h2 style={{ marginTop: 0 }}>404 — Page introuvable</h2>
        <p>
          La page demandée n’existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="bouton"
          style={{ display: "inline-block", textDecoration: "none" }}
        >
          Retour à l’accueil
        </Link>
      </div>
    </main>
  );
}

export default Introuvable;