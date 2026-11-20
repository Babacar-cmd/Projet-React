// src/components/ListeArticles.jsx
import ArticleCard from "./ArticleCard";

function ListeArticles({ articles, estFavori, onToggle }) {
  return (
    <div className="grille">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          estFavori={estFavori(article.id)}
          onToggle={() => onToggle(article)}
        />
      ))}
    </div>
  );
}

export default ListeArticles;