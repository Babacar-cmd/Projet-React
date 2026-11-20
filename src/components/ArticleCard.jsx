// src/components/ArticleCard.jsx
import { Link } from "react-router";

function ArticleCard({ article, estFavori, onToggle }) {
  const resume = article.body ?? article.excerpt ?? "";

  return (
    <article className="carte">
      <h3>
        <Link
          to={`/articles/${article.id}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          {article.title}
        </Link>
      </h3>
      {resume && <p>{resume}</p>}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
        <button
          type="button"
          className={`bouton ${estFavori ? "secondaire" : ""}`}
          onClick={onToggle}
        >
          {estFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
        </button>
        <Link to={`/articles/${article.id}`} className="discret">
          Lire l’article
        </Link>
      </div>
    </article>
  );
}

export default ArticleCard;