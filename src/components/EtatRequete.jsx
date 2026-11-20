function EtatRequete({ chargement, erreur, children }) {
  if (chargement) {
    return <p className="etat-chargement">Chargement en cours...</p>;
  }

  if (erreur) {
    return (
      <div className="etat-erreur" role="alert">
        {erreur}
      </div>
    );
  }

  return children;
}

export default EtatRequete;