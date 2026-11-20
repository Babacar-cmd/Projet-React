// src/pages/Auteurs.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router";
import EtatRequete from "../components/EtatRequete";

const API_BASE = "https://jsonplaceholder.typicode.com";

function Auteurs() {
  const [auteurs, setAuteurs] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function chargerAuteurs() {
      setChargement(true);
      setErreur(null);

      try {
        const res = await fetch(`${API_BASE}/users`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(
            res.status === 404
              ? "Liste des auteurs introuvable (404)."
              : `Erreur HTTP ${res.status} lors du chargement des auteurs.`
          );
        }

        const data = await res.json();
        setAuteurs(data);
      } catch (err) {
        if (err.name === "AbortError") return;
        setErreur(
          err.message === "Failed to fetch"
            ? "Erreur réseau : impossible de charger les auteurs."
            : err.message
        );
      } finally {
        if (!controller.signal.aborted) {
          setChargement(false);
        }
      }
    }

    chargerAuteurs();
    return () => controller.abort();
  }, []);

  return (
    <main className="conteneur">
      <h2>Auteurs</h2>
      <EtatRequete chargement={chargement} erreur={erreur}>
        <div className="grille">
          {auteurs.map((auteur) => (
            <div key={auteur.id} className="carte">
              <h3>
                <Link
                  to={`/auteurs/${auteur.id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {auteur.name}
                </Link>
              </h3>
              <p className="discret">{auteur.email}</p>
              <Link
                to={`/auteurs/${auteur.id}`}
                className="bouton secondaire"
                style={{ display: "inline-block", textDecoration: "none" }}
              >
                Voir la fiche
              </Link>
            </div>
          ))}
        </div>
      </EtatRequete>
    </main>
  );
}

export default Auteurs;