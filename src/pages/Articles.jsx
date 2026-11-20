// src/pages/Articles.jsx
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router";
import EtatRequete from "../components/EtatRequete";

const API_BASE = "https://jsonplaceholder.typicode.com";

function Articles() {
  const { estFavori, toggleFavori } = useOutletContext();
  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function chargerArticles() {
      setChargement(true);
      setErreur(null);

      try {
        const res = await fetch(`${API_BASE}/posts?_limit=12`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(
            res.status === 404
              ? "Liste des articles introuvable (404)."
              : `Erreur HTTP ${res.status} lors du chargement des articles.`
          );
        }

        const data = await res.json();
        setArticles(data);
      } catch (err) {
        if (err.name === "AbortError") return;
        setErreur(
          err.message === "Failed to fetch"
            ? "Impossible de joindre le serveur. Vérifie ta connexion réseau."
            : err.message
        );
      } finally {
        if (!controller.signal.aborted) {
          setChargement(false);
        }
      }
    }

    chargerArticles();
    return () => controller.abort();
  }, []);

  return (
    <main className="conteneur">
      <h2>Articles</h2>
      <EtatRequete chargement={chargement} erreur={erreur}>
        <div className="grille">
          {articles.map((article) => {
            const favori = estFavori(article.id);
            return (
              <article key={article.id} className="carte">
                <h3>
                  <Link
                    to={`/articles/${article.id}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className="discret">{article.body}</p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                  <button
                    type="button"
                    className={`bouton ${favori ? "secondaire" : ""}`}
                    onClick={() => toggleFavori(article)}
                  >
                    {favori ? "Retirer des favoris" : "Ajouter aux favoris"}
                  </button>
                  <Link to={`/articles/${article.id}`} className="discret">
                    Voir le détail
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </EtatRequete>
    </main>
  );
}

export default Articles;