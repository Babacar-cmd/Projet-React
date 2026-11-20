// src/pages/Favoris.jsx
import { Link, useOutletContext } from "react-router";

function Favoris() {
  const { favoris, toggleFavori, nombreFavoris } = useOutletContext();

  return (
    <main className="conteneur">
      <h2>Mes favoris ({nombreFavoris})</h2>

      {favoris.length === 0 ? (
        <div className="carte">
          <p className="discret">Aucun article en favori pour le moment.</p>
          <Link
            to="/articles"
            className="bouton"
            style={{ display: "inline-block", textDecoration: "none" }}
          >
            Découvrir les articles
          </Link>
        </div>
      ) : (
        <div className="grille">
          {favoris.map((article) => (
            <article key={article.id} className="carte">
              <h3>
                <Link
                  to={`/articles/${article.id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {article.title}
                </Link>
              </h3>
              {article.excerpt && <p className="discret">{article.excerpt}</p>}
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <button
                  type="button"
                  className="bouton secondaire"
                  onClick={() => toggleFavori(article)}
                >
                  Retirer des favoris
                </button>
                <Link to={`/articles/${article.id}`} className="discret">
                  Lire l’article
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Favoris;