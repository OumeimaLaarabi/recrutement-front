import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for redirect
import { getOffreById, updateOffre } from "../Services/offreService"; // Import service methods
import { FaArrowLeft } from "react-icons/fa"; // Import the back arrow icon
import "./Updateoffre.css";
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
        setOffre(data); // Set the fetched offer data
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
      navigate("/HomeRecruiter"); // Redirect to the offers list after successful update
    } catch (err) {
      setError("Erreur lors de la mise à jour de l'offre");
    }
  };

  if (loading) return <p>Chargement...</p>; // Loading state
  if (error) return <p>{error}</p>; // Error state

  return (
    <div className="create-container">
      <div className="create-offer-container">
        <button onClick={() => navigate(-1)} className="go-back-button">
          <FaArrowLeft />
        </button>
        <h2 className="create-offer-title">Update Offer</h2>
        <form onSubmit={handleSubmit} className="update-offer-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={offre.title || ""}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={offre.description || ""}
              onChange={handleChange}
              required
              className="form-textarea"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date_expiration" className="form-label">
              Expiration Date:
            </label>
            <input
              id="date_expiration"
              type="date"
              name="date_expiration"
              value={offre.date_expiration || ""}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="type_offre" className="form-label">
              Offer Type:
            </label>
            <select
              id="type_offre"
              name="type_offre"
              value={offre.type_offre || ""}
              onChange={handleChange}
              className="form-input"
            >
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Stage">Stage</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="adresse" className="form-label">
              Address:
            </label>
            <input
              id="adresse"
              type="text"
              name="adresse"
              value={offre.adresse || ""}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Offer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateOffre;
