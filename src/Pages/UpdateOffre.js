import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for redirect
import { getOffreById, updateOffre } from "../Services/offreService"; // Import service methods

const UpdateOffre = () => {
  const { id } = useParams(); // Get offer ID from URL params
  const navigate = useNavigate(); // Hook to handle navigation after updating the offer

  const [offre, setOffre] = useState({}); // State to hold the offer data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle error messages

  // Fetch offer details by ID when the component mounts
  useEffect(() => {
    const fetchOffre = async () => {
      try {
        const data = await getOffreById(id);
        setOffre(data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération de l'offre");
        setLoading(false);
      }
    };
    fetchOffre();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    setOffre({ ...offre, [e.target.name]: e.target.value });
  };

  // Handle form submission to update the offer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateOffre(id, offre); // Call service method to update the offer
      navigate("/offres"); // Redirect to the offers list after successful update
    } catch (err) {
      setError("Erreur lors de la mise à jour de l'offre");
    }
  };

  if (loading) return <p>Chargement...</p>; // Loading state
  if (error) return <p>{error}</p>; // Error state

  return (
    <div>
      <h1>Mettre à jour l'offre</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre</label>
          <input
            type="text"
            name="title"
            value={offre.title || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={offre.description || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date d'expiration</label>
          <input
            type="date"
            name="date_expiration"
            value={offre.date_expiration || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Type d'offre</label>
          <select
            name="type_offre"
            value={offre.type_offre || ""}
            onChange={handleChange}
          >
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="Stage">Stage</option>
          </select>
        </div>
        <div>
          <label>Adresse</label>
          <input
            type="text"
            name="adresse"
            value={offre.adresse || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default UpdateOffre;
