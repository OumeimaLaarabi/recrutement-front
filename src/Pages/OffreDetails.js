import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOfferById,applyOffre } from "../Services/OffreService";
import { getRecruiterById } from "../Services/RecruiterServices";
import { MailOutlined, PhoneOutlined, TeamOutlined, HomeOutlined } from '@ant-design/icons';
import Toast from "../Components/Toast"; 
import { useUserContext } from "../Contexts/AuthContext";

const OfferDetails = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const [offerDetails, setOfferDetails] = useState(null);
  const [recruiterDetails, setRecruiterDetails] = useState(null);
  const [error, setError] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");

  // Function to fetch the offer by ID
  const fetchOfferById = async () => {
    try {
      const data = await getOfferById(id);
      console.log("Offer data:", data);
      setOfferDetails(data);
      // Trigger recruiter fetch after fetching the offer
      fetchRecruiterById(data.id_recruteur);
    } catch (error) {
      console.error("Error fetching offer:", error);
      setError(`Failed to fetch offer details: ${error?.message || "Unknown error"}`);
    }
  };

  // Function to fetch the recruiter by ID separately
  const fetchRecruiterById = async (recruiterId) => {
    try {
      if (recruiterId && recruiterId._id) {
        const recruiterData = await getRecruiterById(recruiterId._id);
        console.log("Recruiter data:", recruiterData);
        setRecruiterDetails(recruiterData);
      } else {
        setError("Recruiter ID is missing or invalid.");
      }
    } catch (error) {
      console.error("Error fetching recruiter:", error);
      setError(`Failed to fetch recruiter details: ${error?.message || "Unknown error"}`);
    }
  };

  useEffect(() => {
    fetchOfferById();
  }, [id]);

  if (error) {
    return <p className="error-messages">{error}</p>;
  }

  if (!offerDetails || !recruiterDetails) {
    return <p>Loading...</p>;
  }

  const handleApply = async (offerId) => {
    try {
      const response = await applyOffre(user.id, offerId);
      if (response === "you already applied for this offer") {
        setApplicationStatus("You already applied");
        setToastType("error");
      } else {
        setApplicationStatus("Application succeeded");
        setToastType("success");
      }
    } catch (error) {
      console.error("Failed to apply for the job:", error);
      setApplicationStatus("Failed to apply for the job");
      setToastType("error");
    }
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Hide toast after 3 seconds
  };

  const handleCancel = () => {
    navigate("/HomeTalent");
  };

  return (
    <div className="offer-details-container">
      <div className="offer-details-content">
        <div className="offer-details-Talent">
          <h1>Offer Details</h1>
          <h2>{offerDetails.title}</h2>
          <p>{offerDetails.description}</p>
          <p className="bold-title">
            Posted on: <span className="normal-text">{new Date(offerDetails.date_creation).toLocaleDateString()}</span>
          </p>
          <p className="bold-title">
            Expiration Date: <span className="normal-text">{new Date(offerDetails.date_expiration).toLocaleDateString()}</span>
          </p>

          {/* Displaying Keywords */}
          <p className="bold-title">
            Keywords: <span className="normal-text">
              {offerDetails.mots_cle && offerDetails.mots_cle.map((keyword, index) => (
                <span key={index}>{keyword} </span>
              ))}
            </span>
          </p>

          {/* Displaying Languages */}
          <p className="bold-title">
            Languages: <span className="normal-text">
              {offerDetails.langues && offerDetails.langues.map((language, index) => (
                <span key={index}>{language} </span>
              ))}
            </span>
          </p>

          <div className="recruiter-info-Details">
            <div>
              <p className="bold-title">
                Recruiter: <span className="normal-text">{recruiterDetails.nom} {recruiterDetails.prenom}</span>
              </p>
              <p className="bold-title">
                Company: <span className="normal-text">{recruiterDetails.entreprise}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="recruiter-details-Talent">
          <h2>Recruiter Details</h2>
          {recruiterDetails.email && (
            <p className="bold-title"><MailOutlined /> Email: <span className="normal-text">{recruiterDetails.email}</span></p>
          )}
          {recruiterDetails.entreprise && (
            <p className="bold-title"><TeamOutlined /> Company Name: <span className="normal-text">{recruiterDetails.entreprise}</span></p>
          )}
          {recruiterDetails.adresse && (
            <p className="bold-title"><HomeOutlined /> Address: <span className="normal-text">{recruiterDetails.adresse}</span></p>
          )}
          {recruiterDetails.telephone && (
            <p className="bold-title"><PhoneOutlined /> Telephone Number: <span className="normal-text">{recruiterDetails.telephone}</span></p>
          )}
        </div>
      </div>

      <div className="offer-application-status-container">
        <div className="button-container">
          <button onClick={handleCancel} className="cancel-button">Cancel</button>
          <button onClick={() => handleApply(offerDetails._id)} className="apply-button">Apply</button>
        </div>
      </div>

      <Toast 
        message={applicationStatus} 
        show={showToast} 
        onClose={() => setShowToast(false)} 
        type={toastType} 
      />
    </div>
  );
};

export default OfferDetails;
