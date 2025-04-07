import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { getOfferById, updateOffre } from "../Services/offreService" 
import { FaArrowLeft } from "react-icons/fa"; 
import "./Updateoffre.css";
const UpdateOffre = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const [offre, setOffre] = useState({}); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchOffre = async () => {
      try {
        const data = await getOfferById(id);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateOffre(id, offre); 
      navigate("/HomeRecruiter");
    } catch (err) {
      setError("Erreur lors de la mise à jour de l'offre");
    }
  };

  if (loading) return <p>Chargement...</p>; 
  if (error) return <p>{error}</p>; 

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
          <div className="form-group">
            <label htmlFor="salaire" className="form-label">
              Salaire:
            </label>
            <input
              id="salaire"
              type="number"
              name="salaire"
              value={offre.salaire || ""}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group description">
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
