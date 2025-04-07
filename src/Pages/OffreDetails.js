import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOfferById, applyOffre } from "../Services/offreService";
import { getRecruiterById } from "../Services/RecruiterServices";
import { MailOutlined, PhoneOutlined, TeamOutlined, HomeOutlined } from "@ant-design/icons";
import Toast from "../Components/Toast";
import { useUserContext } from "../Contexts/AuthContext";
import "./OfferDetails.css";

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

    useEffect(() => {
        const fetchOfferById = async () => {
            try {
                const offerData = await getOfferById(id);
                console.log("Offer Data:", offerData); // Log the fetched offer data
                setOfferDetails(offerData);

                if (offerData.id_recruteur) {
                    const recruiterId = typeof offerData.id_recruteur === "object" ? offerData.id_recruteur._id : offerData.id_recruteur;
                    if (recruiterId) {
                        const recruiterData = await getRecruiterById(recruiterId);
                        setRecruiterDetails(recruiterData);
                    } else {
                        setError("Recruiter information not available");
                    }
                } else {
                    setError("Recruiter information not available");
                }
            } catch (error) {
                console.error("Error fetching offer or recruiter:", error);
                setError(`Failed to fetch details: ${error.message}`);
            }
        };

        fetchOfferById();
    }, [id]);

    if (error) return <p className="error-messages">{error}</p>;
    if (!offerDetails) return <p>Loading offer details...</p>;

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
        setTimeout(() => setShowToast(false), 3000);
        navigate(`/apply/${offerId}`);   // Then navigate to ApplyPage
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
                    <p className="bold-title">
                        Salaire: <span className="normal-text">{offerDetails.salaire}</span>
                    </p>
                    <p className="bold-title">
                        Keywords:{" "}
                        <span className="normal-text">
                            {offerDetails.mots_cle?.map((mots_cle) => (
                                <span key={mots_cle}>{mots_cle.mot} </span>
                            ))}
                        </span>
                    </p>
                    <p className="bold-title">
                        Languages:{" "}
                        <span className="normal-text">
                            {offerDetails.langues?.map((language, index) => (
                                <span key={index}>{language.langue} </span>
                            ))}
                        </span>
                    </p>
                    {recruiterDetails && (
                        <div className="recruiter-info-Details">
                            <p className="bold-title">
                                Recruiter:{" "}
                                <span className="normal-text">
                                    {recruiterDetails.nom} {recruiterDetails.prenom}
                                </span>
                            </p>
                            {recruiterDetails.entreprise ? (
                                <>
                                    <p className="bold-title">
                                        <TeamOutlined /> Company Name:{" "}
                                        <span className="normal-text">{recruiterDetails.entreprise.nom}</span>
                                    </p>
                                    <p className="bold-title">
                                        <HomeOutlined /> Address:{" "}
                                        <span className="normal-text">{recruiterDetails.entreprise.adresse}</span>
                                    </p>
                                    <p className="bold-title">
                                        <PhoneOutlined /> Telephone:{" "}
                                        <span className="normal-text">{recruiterDetails.entreprise.telephone}</span>
                                    </p>
                                    <p className="bold-title">
                                        <TeamOutlined /> Sector:{" "}
                                        <span className="normal-text">{recruiterDetails.entreprise.secteur}</span>
                                    </p>
                                </>
                            ) : (
                                <p className="bold-title">Company information not available</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="offer-application-status-container">
                    <div className="button-container">
                        <button onClick={() => navigate("/HomeTalent")} className="cancel-button">
                            Cancel
                        </button>
                        <button
  className="apply-button"
  onClick={() => handleApply(offerDetails._id)}
>
  Postuler
</button>
                    </div>
                </div>

                <Toast message={applicationStatus} show={showToast} onClose={() => setShowToast(false)} type={toastType} />
            </div>
        </div>
    );
};

export default OfferDetails;