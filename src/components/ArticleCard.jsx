// src/components/ArticleCard.jsx
function ArticleCard({ article, estFavori, onToggle }) {
  return (
    <article className="carte">
      <h3>{article.title}</h3>
      <p>{article.body}</p>
      <button 
        className={`bouton ${estFavori ? 'secondaire' : ''}`} 
        onClick={onToggle}
      >
        {estFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      </button>
    </article>
  );
}

export default ArticleCard;