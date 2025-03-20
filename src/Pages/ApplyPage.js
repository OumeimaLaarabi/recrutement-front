import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOfferById, applyOffre } from "../Services/OffreService";
import { useUserContext } from "../Contexts/AuthContext";

const ApplyPage = () => {
  const { id } = useParams();
  console.log("ID récupéré :", id);

  const [offer, setOffre] = useState(null);
  const [cv, setCv] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true); // State to handle loading state

  useEffect(() => {
  const fetchOffre = async () => {
      try {
        const data = await getOfferById(id);
        setOffre(data); // Set the fetched offer data
        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération de l'offre");
        setLoading(false);
      }
    };
    fetchOffre();
  }, [id]);
  
  const handleCvChange = (event) => {
    setCv(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!cv) {
      setError("Veuillez sélectionner un fichier PDF.");
      return;
    }
  
    try {
      const response = await applyOffre(user.id, id, cv);
      setSuccess("Candidature envoyée avec succès !");
      setTimeout(() => navigate("/HomeTalent"), 3000);
    } catch (error) {
      console.error("Erreur lors de la candidature:", error);
      setError("Échec de la candidature.");
    }
  };
  

  if (!offer) return <p>Chargement...</p>;

  return (
    <div className="apply-page">
      <h1>Postuler à l'offre: {offer.title}</h1>
      <p>{offer.description}</p>
      <form onSubmit={handleSubmit} className="apply-form">
        <label>Uploader votre CV (PDF) :</label>
        <input type="file" accept="application/pdf" onChange={handleCvChange} />
        <button type="submit">Envoyer la candidature</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default ApplyPage;
