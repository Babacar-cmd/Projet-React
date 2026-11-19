// src/components/BarreRecherche.jsx
function BarreRecherche({ valeur, onChange }) {
  return (
    <input 
      type="text" 
      className="champ" 
      placeholder="Rechercher un article par titre..." 
      value={valeur} 
      onChange={(e) => onChange(e.target.value)} 
    />
  );
}

export default BarreRecherche;