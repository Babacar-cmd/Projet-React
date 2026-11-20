// src/pages/MonEspace.jsx
import { Link, Navigate, useOutletContext } from "react-router";

function MonEspace() {
  const { utilisateur, favoris, nombreFavoris, deconnexion } = useOutletContext();

  if (!utilisateur) {
    return <Navigate replace to="/" />;
  }

  return (
    <main className="conteneur">
      <h2>Mon espace</h2>
      <div className="carte">
        <p>
          Bienvenue, <strong>{utilisateur.nom}</strong> !
        </p>
        <p className="discret">
          Vous avez actuellement {nombreFavoris} article(s) enregistré(s) en favori.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          <Link to="/favoris" className="bouton" style={{ textDecoration: "none" }}>
            Voir mes favoris
          </Link>
          <button type="button" className="bouton secondaire" onClick={deconnexion}>
            Se déconnecter
          </button>
        </div>
      </div>

      {favoris.length > 0 && (
        <section style={{ marginTop: "1.5rem" }}>
          <h3>Aperçu de vos favoris</h3>
          <ul className="carte">
            {favoris.map((article) => (
              <li key={article.id}>
                <Link to={`/articles/${article.id}`}>{article.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default MonEspace;