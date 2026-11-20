// src/components/CommentaireForm.jsx
import { useState } from 'react';

function CommentaireForm({ onAjouterCommentaire }) {
  const [nom, setNom] = useState('');
  const [message, setMessage] = useState('');
  const [erreur, setErreur] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation : vérifie si les champs sont vides
    if (!nom.trim() || !message.trim()) {
      setErreur("Tous les champs sont obligatoires pour publier un commentaire.");
      return;
    }

    setErreur('');
    onAjouterCommentaire({
      id: Date.now(), // Clé stable unique
      nom: nom.trim(),
      message: message.trim()
    });

    // Vide le formulaire après validation
    setNom('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <h3>Laisser un commentaire</h3>
      {erreur && <div className="message-erreur">{erreur}</div>}
      
      <div>
        <label className="discret">Votre nom :</label>
        <input 
          type="text" 
          className="champ" 
          value={nom} 
          onChange={(e) => setNom(e.target.value)} 
        />
      </div>
      
      <div>
        <label className="discret">Votre message :</label>
        <textarea 
          className="champ" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
        />
      </div>

      <button type="submit" className="bouton">Publier</button>
    </form>
  );
}

export default CommentaireForm;