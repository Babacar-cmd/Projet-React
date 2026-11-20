// src/components/ListeCommentaires.jsx
function ListeCommentaires({ commentaires }) {
  return (
    <div style={{ marginTop: '1.5rem' }}>
      <h3>Commentaires</h3>
      {commentaires.length === 0 ? (
        <p className="discret">Aucun commentaire pour le moment.</p>
      ) : (
        commentaires.map((com) => (
          <div key={com.id} className="carte" style={{ marginBottom: '0.75rem' }}>
            <strong>{com.nom}</strong>
            <p style={{ margin: '0.5rem 0 0' }}>{com.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ListeCommentaires;