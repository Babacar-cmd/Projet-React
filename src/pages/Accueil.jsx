// src/pages/Accueil.jsx
import { useState } from "react";
import { useOutletContext } from "react-router";
import { articlesDeTest } from "../donnees-test.js";
import ListeArticles from "../components/ListeArticles";
import BarreRecherche from "../components/BarreRecherche";
import CommentaireForm from "../components/CommentaireForm";
import ListeCommentaires from "../components/ListeCommentaires";

function Accueil() {
  const { estFavori, toggleFavori, nombreFavoris } = useOutletContext();
  const [recherche, setRecherche] = useState("");
  const [commentaires, setCommentaires] = useState([]);

  const articlesFiltres = articlesDeTest.filter((article) =>
    article.title.toLowerCase().includes(recherche.toLowerCase())
  );

  const ajouterCommentaire = (nouveauCommentaire) => {
    setCommentaires([...commentaires, nouveauCommentaire]);
  };

  return (
    <main className="conteneur">
      <h1>Bienvenue sur mon blog</h1>

      <p className="discret">Articles favoris : {nombreFavoris}</p>

      <BarreRecherche valeur={recherche} onChange={setRecherche} />

      <ListeArticles
        articles={articlesFiltres}
        estFavori={estFavori}
        onToggle={toggleFavori}
      />

      <CommentaireForm onAjouterCommentaire={ajouterCommentaire} />
      <ListeCommentaires commentaires={commentaires} />
    </main>
  );
}

export default Accueil;