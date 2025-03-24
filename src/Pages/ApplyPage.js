import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOfferById, applyOffre } from "../Services/offreService";
import { useUserContext } from "../Contexts/AuthContext";
import "./Apply.css"; // Import the updated CSS

const ApplyPage = () => {
  const { id } = useParams();
  const [offer, setOffre] = useState(null);
  const [cv, setCv] = useState(null);
  const [cvFileName, setCvFileName] = useState("");
  const [cvPreviewUrl, setCvPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);

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

  const handleCvChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setCv(file);
    setCvFileName(file.name);

    const fileUrl = URL.createObjectURL(file);
    setCvPreviewUrl(fileUrl);
  };

  const handleRemoveCv = () => {
    setCv(null);
    setCvFileName("");
    setCvPreviewUrl(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!cv) {
      setError("Veuillez sélectionner un fichier.");
      return;
    }

    try {
      await applyOffre(user.id, id, cv);
      setSuccess("Candidature envoyée avec succès !");
      setTimeout(() => navigate("/HomeTalent"), 3000);
    } catch (error) {
      console.error("Erreur lors de la candidature:", error);
      if (error.message === "Vous avez déjà postulé à cette offre.") {
        setError("Vous avez déjà postulé à cette offre.");
      } else {
        setError("Échec de la candidature.");
      }
    }
  };

  if (loading) return <p className="text-center text-gray-500">Chargement...</p>;
  if (!offer) return <p className="text-center text-red-500">Aucune offre trouvée.</p>;

  return (
    <div className="apply-page">
      <div className="apply-form">
        <h1>{offer.title}</h1>
        <p>{offer.description}</p>

        <form onSubmit={handleSubmit}>
          <label>
            Uploader votre CV (PDF ou Image) :
            <input 
              type="file"
              accept="application/pdf, image/*"
              onChange={handleCvChange}
            />
          </label>

          {cvFileName && (
            <div className="cv-preview">
              <p>Fichier sélectionné: <strong>{cvFileName}</strong></p>
              
              {cvPreviewUrl && (
                <div>
                  {cv.type === "application/pdf" ? (
                    <iframe src={cvPreviewUrl} title="CV Preview"></iframe>
                  ) : (
                    <img src={cvPreviewUrl} alt="CV Preview" className="cv-image-preview" />
                  )}
                </div>
              )}

              <button 
                type="button" 
                onClick={handleRemoveCv} 
                className="remove-cv-button"
              >
                Annuler la sélection
              </button>
            </div>
          )}

          <button type="submit">Envoyer la candidature</button>
        </form>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </div>
    </div>
  );
};

export default ApplyPage;