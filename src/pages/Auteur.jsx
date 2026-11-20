// src/pages/Auteur.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import EtatRequete from "../components/EtatRequete";

const API_BASE = "https://jsonplaceholder.typicode.com";

function Auteur() {
  const { id } = useParams(); // id est une chaîne de caractères

  const [auteur, setAuteur] = useState(null);
  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function chargerFicheEtArticles() {
      setAuteur(null);
      setArticles([]);
      setErreur(null);

      const idNettoye = (id ?? "").trim();
      if (!/^\d+$/.test(idNettoye)) {
        setChargement(false);
        setErreur(`Identifiant d’auteur invalide : « ${id} ».`);
        return;
      }

      setChargement(true);

      try {
        const [resAuteur, resArticles] = await Promise.all([
          fetch(`${API_BASE}/users/${idNettoye}`, { signal: controller.signal }),
          fetch(`${API_BASE}/posts?userId=${idNettoye}`, {
            signal: controller.signal,
          }),
        ]);

        if (resAuteur.status === 404) {
          throw new Error(
            `L’auteur #${idNettoye} est introuvable (erreur 404).`
          );
        }
        if (!resAuteur.ok) {
          throw new Error(
            `Erreur HTTP ${resAuteur.status} lors du chargement de l’auteur.`
          );
        }
        if (!resArticles.ok) {
          throw new Error(
            `Erreur HTTP ${resArticles.status} lors du chargement des articles.`
          );
        }

        const [dataAuteur, dataArticles] = await Promise.all([
          resAuteur.json(),
          resArticles.json(),
        ]);

        setAuteur(dataAuteur);
        setArticles(dataArticles);
      } catch (err) {
        if (err.name === "AbortError") return;
        setErreur(
          err.message === "Failed to fetch"
            ? "Erreur réseau : impossible de charger la fiche auteur."
            : err.message
        );
      } finally {
        if (!controller.signal.aborted) {
          setChargement(false);
        }
      }
    }

    chargerFicheEtArticles();
    return () => controller.abort();
  }, [id]);

  return (
    <main className="conteneur">
      <p style={{ marginBottom: "1rem" }}>
        <Link to="/auteurs" className="discret">
          ← Retour aux auteurs
        </Link>
      </p>

      <h2>Fiche auteur</h2>
      <EtatRequete chargement={chargement} erreur={erreur}>
        {auteur && (
          <div className="carte">
            <h3>{auteur.name}</h3>
            <p className="discret">
              @{auteur.username} • {auteur.email} • {auteur.company?.name}
            </p>

            <h4>Articles publiés ({articles.length})</h4>
            <ul>
              {articles.map((art) => (
                <li key={art.id}>
                  <Link to={`/articles/${art.id}`}>{art.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </EtatRequete>
    </main>
  );
}

export default Auteur;