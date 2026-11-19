// src/components/ListeArticles.jsx
import ArticleCard from './ArticleCard';

function ListeArticles({ articles, favoris, onToggle }) {
  return (
    <div className="grille">
      {articles.map((article) => (
        <ArticleCard 
          key={article.id} // Clé stable (pas d'index)
          article={article} 
          estFavori={favoris.includes(article.id)} 
          onToggle={() => onToggle(article.id)} 
        />
      ))}
    </div>
  );
}

export default ListeArticles;