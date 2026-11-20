// src/pages/Article.jsx
import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router";
import EtatRequete from "../components/EtatRequete";

const API_BASE = "https://jsonplaceholder.typicode.com";

function Article() {
  const { id } = useParams(); // id est une chaîne de caractères
  const { estFavori, toggleFavori } = useOutletContext();

  const [article, setArticle] = useState(null);
  const [commentaires, setCommentaires] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function chargerArticleEtCommentaires() {
      setArticle(null);
      setCommentaires([]);
      setErreur(null);

      // Validation de l'identifiant (chaîne issue de useParams)
      const idNettoye = (id ?? "").trim();
      if (!/^\d+$/.test(idNettoye)) {
        setChargement(false);
        setErreur(`Identifiant d’article invalide : « ${id} ».`);
        return;
      }

      setChargement(true);

      try {
        const [resArticle, resCommentaires] = await Promise.all([
          fetch(`${API_BASE}/posts/${idNettoye}`, { signal: controller.signal }),
          fetch(`${API_BASE}/posts/${idNettoye}/comments`, {
            signal: controller.signal,
          }),
        ]);

        if (resArticle.status === 404) {
          throw new Error(
            `L’article #${idNettoye} est introuvable (erreur 404).`
          );
        }
        if (!resArticle.ok) {
          throw new Error(
            `Erreur HTTP ${resArticle.status} lors du chargement de l’article.`
          );
        }
        if (!resCommentaires.ok) {
          throw new Error(
            `Erreur HTTP ${resCommentaires.status} lors du chargement des commentaires.`
          );
        }

        const [dataArticle, dataCommentaires] = await Promise.all([
          resArticle.json(),
          resCommentaires.json(),
        ]);

        setArticle(dataArticle);
        setCommentaires(dataCommentaires);
      } catch (err) {
        if (err.name === "AbortError") return;
        setErreur(
          err.message === "Failed to fetch"
            ? "Erreur réseau : impossible de récupérer l’article."
            : err.message
        );
      } finally {
        if (!controller.signal.aborted) {
          setChargement(false);
        }
      }
    }

    chargerArticleEtCommentaires();
    return () => controller.abort();
  }, [id]);

  const favori = article ? estFavori(article.id) : false;

  return (
    <main className="conteneur">
      <p style={{ marginBottom: "1rem" }}>
        <Link to="/articles" className="discret">
          ← Retour aux articles
        </Link>
      </p>

      <h2>Détail de l’article</h2>
      <EtatRequete chargement={chargement} erreur={erreur}>
        {article && (
          <article className="carte">
            <h3>{article.title}</h3>
            <p>{article.body}</p>
            <p className="discret">
              ID article : {article.id} —{" "}
              <Link to={`/auteurs/${article.userId}`}>
                Auteur #{article.userId}
              </Link>
            </p>

            <div style={{ marginBottom: "1rem" }}>
              <button
                type="button"
                className={`bouton ${favori ? "secondaire" : ""}`}
                onClick={() => toggleFavori(article)}
              >
                {favori ? "Retirer des favoris" : "Ajouter aux favoris"}
              </button>
            </div>

            <h4>Commentaires ({commentaires.length})</h4>
            {commentaires.length === 0 ? (
              <p className="discret">Aucun commentaire pour cet article.</p>
            ) : (
              <ul>
                {commentaires.map((com) => (
                  <li key={com.id}>
                    <strong>{com.name}</strong>{" "}
                    <span className="discret">({com.email})</span>
                    <p>{com.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </article>
        )}
      </EtatRequete>
    </main>
  );
}

export default Article;