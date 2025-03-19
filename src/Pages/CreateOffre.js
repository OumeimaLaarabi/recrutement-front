import React, { useState } from "react";
import { createOffre } from "../Services/OffreService"; 
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Contexts/AuthContext";

const CreateOffre = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateExpiration, setDateExpiration] = useState("");
  const [adresse, setAdresse] = useState("");
  const [typeOffre, setTypeOffre] = useState("CDI");
  const [domaine, setDomaine] = useState("");
  const [salaire, setSalaire] = useState("");
  const [motsCle, setMotsCle] = useState([]);
  const [langues, setLangues] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Pour rediriger après la création
  const { user } = useUserContext();
  // Fonction pour mettre à jour les tableaux de mots clés et langues
  const handleArrayInput = (e, setter) => {
    const values = e.target.value
      .split(",")
      .map((val) => val.trim()) // Supprimer les espaces
      .filter((val) => val !== ""); // Éviter les valeurs vides
    setter(values);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    if (!user || !user.id) {
      setError("Erreur: Impossible de récupérer l'ID du recruteur.");
      console.error("ID du recruteur manquant:", user); // Vérifier l'objet 'user'
      return;
    }
  console.log("user", user);
    try {
      const offreData = {
        title,
        description,
        date_expiration: dateExpiration,
        adresse,
        type_offre: typeOffre,
        domaine,
        salaire,
        mots_cle: motsCle,
        langues,
        id_recruteur: user.id, 
      };
  
      console.log("Données de l'offre envoyées:", offreData); 
  
      await createOffre(offreData);
      navigate("/offres"); // Rediriger vers la liste des offres après la création
    } catch (err) {
      setError("Échec de la création de l'offre");
      console.error("Erreur lors de la création de l'offre:", err);
    }
  };
  
  return (
    <div>
      <h1>Créer une Nouvelle Offre</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={dateExpiration}
          onChange={(e) => setDateExpiration(e.target.value)}
        />
        <input
          type="text"
          placeholder="Adresse"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
        />
        <select onChange={(e) => setTypeOffre(e.target.value)} value={typeOffre}>
          <option value="CDI">CDI</option>
          <option value="CDD">CDD</option>
          <option value="Stage">Stage</option>
        </select>
        <input
          type="text"
          placeholder="Domaine"
          value={domaine}
          onChange={(e) => setDomaine(e.target.value)}
        />
        <input
          type="number"
          placeholder="Salaire"
          value={salaire}
          onChange={(e) => setSalaire(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mots Clés (séparés par des virgules)"
          value={motsCle.join(", ")}
          onChange={(e) => handleArrayInput(e, setMotsCle)}
        />
        <input
          type="text"
          placeholder="Langues (séparées par des virgules)"
          value={langues.join(", ")}
          onChange={(e) => handleArrayInput(e, setLangues)}
        />
        <button type="submit">Créer l'offre</button>
      </form>
    </div>
  );
};

export default CreateOffre;
