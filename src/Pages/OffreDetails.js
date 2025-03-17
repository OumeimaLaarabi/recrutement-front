
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOfferById, ApplyOffre } from '../Services/OffreServices';
import UserPhoto from "../Images/Sample_User_Icon.png";
import { getRecruiter } from "../Services/RecruiterServices";
import { MailOutlined, PhoneOutlined, TeamOutlined, GlobalOutlined, HomeOutlined } from '@ant-design/icons';
import Toast from "../Components/Toast"; // Import the Toast component
import "./OfferDetails.css";

const OfferDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offerDetails, setOfferDetails] = useState(null);
  const [recruiterDetails, setRecruiterDetails] = useState(null);
  const [error, setError] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const offerResponse = await getOfferById(id);
        setOfferDetails(offerResponse);
        const recruiterResponse = await getRecruiter(offerResponse.recruiter.user.id);
        setRecruiterDetails(recruiterResponse);
        console.log(offerResponse, recruiterResponse);
      } catch (error) {
        console.error("Failed to fetch details:", error);
        setError("Failed to fetch details");
      }
    };

    fetchDetails();
  }, [id]);

  if (error) {
    return <p className="error-messages">{error}</p>;
  }

  if (!offerDetails || !recruiterDetails) {
    return <p>Loading...</p>;
  }


  const handleApply = async (offerId) => {
    try {
      const response  = await ApplyOffre(user.id, offerId); 
     console.log(response)
      if (response=="you already applied for this offer") {
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
          <p className="bold-title">Posted on: <span className="normal-text">{new Date(offerDetails.createdDate).toLocaleDateString()}</span></p>
          <div className="recruiter-info-Details">
            <img src={offerDetails.recruiter.logo || UserPhoto} alt="Company Logo" />
            <div>
              <p className="bold-title">Recruiter: <span className="normal-text">{offerDetails.recruiter.user.firstName} {offerDetails.recruiter.user.lastName}</span></p>
              <p className="bold-title">Company: <span className="normal-text">{offerDetails.recruiter.companyName}</span></p>
            </div>
          </div>
        </div>

        <div className="recruiter-details-Talent">
          <h2>Recruiter Details</h2>
          {recruiterDetails.email && (
            <p className="bold-title"><MailOutlined /> Email: <span className="normal-text">{recruiterDetails.email}</span></p>
          )}
          {recruiterDetails.entrepriseName && (
            <p className="bold-title"><TeamOutlined /> Company Name: <span className="normal-text">{recruiterDetails.entrepriseName}</span></p>
          )}
          
          {recruiterDetails.entrepriseAdresse && (
            <p className="bold-title"><HomeOutlined /> Address: <span className="normal-text">{recruiterDetails.entrepriseAdresse}</span></p>
          )}
          
          {recruiterDetails.entrepriseTelephone && (
            <p className="bold-title"><PhoneOutlined /> Telephone Number: <span className="normal-text">{recruiterDetails.entrepriseTelephone}</span></p>
          )}
        </div>
      </div>

      <div className="offer-application-status-container">
        <div className="button-container">
          <button onClick={handleCancel} className="cancel-button">Cancel</button>
          <button onClick={() => handleApply(offerDetails.id)} className="apply-button">Apply</button>
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
