// src/pages/Accueil.jsx
import { useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import {articlesDeTest} from '../donnees-test.js';

function Accueil() {
 
  // 1. L'état vit dans l'ancêtre commun
  const [favoris, setFavoris] = useState([]);

  // Fonction de bascule (immutabilité respectée avec filter et spread)
  const toggleFavori = (id) => {
    if (favoris.includes(id)) {
      setFavoris(favoris.filter(favId => favId !== id));
    } else {
      setFavoris([...favoris, id]);
    }
  };

  // 2. Le compteur se calcule, il ne se stocke pas
  const nombreFavoris = favoris.length;

  return (
    <main className="conteneur">
      <h1>Bienvenue sur mon blog</h1>
      
      {/* Affichage du nombre de favoris au-dessus */}
      <p className="discret">Articles favoris : {nombreFavoris}</p>

      <div className="grille">
        <ArticleCard 
          article={articlesDeTest[0]} 
          estFavori={favoris.includes(articlesDeTest[0].id)} 
          onToggle={() => toggleFavori(articlesDeTest[0].id)} 
        />
        <ArticleCard 
          article={articlesDeTest[1]} 
          estFavori={favoris.includes(articlesDeTest[1].id)} 
          onToggle={() => toggleFavori(articlesDeTest[1].id)} 
        />
        <ArticleCard 
          article={articlesDeTest[2]} 
          estFavori={favoris.includes(articlesDeTest[2].id)} 
          onToggle={() => toggleFavori(articlesDeTest[2].id)} 
        />
      </div>
    </main>
  );
}

export default Accueil;