// src/layouts/LayoutPrincipal.jsx
import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";

function LayoutPrincipal() {
  // Chaque favori est stocké sous forme d'objet : { id, title, excerpt }
  const [favoris, setFavoris] = useState([]);
  // État de connexion simulée : null quand déconnecté, ou { nom } quand connecté
  const [utilisateur, setUtilisateur] = useState(null);

  const navigate = useNavigate();

  const estFavori = (id) => favoris.some((item) => item.id === id);

  const toggleFavori = (article) => {
    const existe = favoris.some((item) => item.id === article.id);
    if (existe) {
      setFavoris(favoris.filter((item) => item.id !== article.id));
    } else {
      setFavoris([
        ...favoris,
        {
          id: article.id,
          title: article.title,
          excerpt: article.excerpt ?? article.body ?? "",
        },
      ]);
    }
  };

  const connexion = (nom) => {
    setUtilisateur({ nom: nom.trim() || "Membre Teranga" });
    navigate("/mon-espace");
  };

  const deconnexion = () => {
    setUtilisateur(null);
    navigate("/");
  };

  const nombreFavoris = favoris.length;

  return (
    <>
      <header className="barre-nav">
        <div className="conteneur">
          <Link to="/" style={{ display: "inline-flex", alignItems: "center" }}>
            <img
              src="/logo-teranga-blog.png"
              alt="Logo Teranga Blog"
              style={{ height: "36px", width: "auto", display: "block" }}
            />
          </Link>

          <nav
            aria-label="Navigation principale"
            style={{
              display: "flex",
              gap: "1.25rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Accueil
            </NavLink>
            <NavLink
              to="/articles"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Articles
            </NavLink>
            <NavLink
              to="/auteurs"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Auteurs
            </NavLink>
            <NavLink
              to="/favoris"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Favoris ({nombreFavoris})
            </NavLink>
            <NavLink
              to="/mon-espace"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Mon espace
            </NavLink>

            {utilisateur ? (
              <button
                type="button"
                className="bouton secondaire"
                onClick={deconnexion}
              >
                Déconnexion ({utilisateur.nom})
              </button>
            ) : (
              <NavLink
                to="/connexion"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Connexion
              </NavLink>
            )}
          </nav>
        </div>
      </header>

      <Outlet
        context={{
          favoris,
          estFavori,
          toggleFavori,
          nombreFavoris,
          utilisateur,
          connexion,
          deconnexion,
        }}
      />
    </>
  );
}

export default LayoutPrincipal;