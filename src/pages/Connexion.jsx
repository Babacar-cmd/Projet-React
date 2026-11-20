// src/pages/Connexion.jsx
import { useId, useState } from "react";
import { Navigate, useOutletContext } from "react-router";

function Connexion() {
  const { utilisateur, connexion } = useOutletContext();
  const [nom, setNom] = useState("");
  const [erreur, setErreur] = useState("");
  const nomId = useId();

  if (utilisateur) {
    return <Navigate replace to="/mon-espace" />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!nom.trim()) {
      setErreur("Veuillez saisir un nom ou un pseudo pour vous connecter.");
      return;
    }
    setErreur("");
    connexion(nom);
  }

  return (
    <main className="conteneur">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} className="carte" style={{ maxWidth: "420px" }}>
        {erreur && (
          <div className="message-erreur" role="alert">
            {erreur}
          </div>
        )}

        <div>
          <label htmlFor={nomId} className="discret">
            Nom d’utilisateur :
          </label>
          <input
            id={nomId}
            type="text"
            className="champ"
            placeholder="Ex. Awa"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>

        <button type="submit" className="bouton">
          Se connecter
        </button>
      </form>
    </main>
  );
}

export default Connexion;