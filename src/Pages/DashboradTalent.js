import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApplicationsByCandidate } from "../Services/CandidatureService";
import { getAllOffres,getAllOffresWithCandidatureCount } from "../Services/offreService";
import "../scss/TalentDashboard.scss";
import { useUserContext } from "../Contexts/AuthContext";
// import { Badge } from "react-bootstrap"; // Bootstrap pour les badges

const TalentDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [candidature, setCandidature] = useState([]);
  const { user } = useUserContext();
  const navigate = useNavigate();
  const candidatId = user?.id; // Use user.id instead of user._id

  useEffect(() => {
    const fetchApplications = async () => {
      if (!candidatId) {
        console.error("Candidate ID is undefined");
        return; // Exit if candidatId is not available
      }
      try {
        const response = await getApplicationsByCandidate(candidatId);
        console.log("Applications fetched:", response);
        setApplications(response);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
        setError("Failed to fetch applications");
      }
    };
    fetchApplications();
  }, [candidatId]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllOffres();
        setJobs(data);
      } catch (error) {
        setError("Failed to load job listings.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  useEffect(() => {
    const fetchcandidatures = async () => {
      try {
        const data = await getAllOffresWithCandidatureCount();
        setCandidature(data);
      } catch (error) {
        setError("Failed to load job listings.");
      } finally {
        setLoading(false);
      }
    };
    fetchcandidatures();
  }, []);
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>

      {/* Bloc Applications */}
      <div className="dashboard-section">
        <div className="section-header">
          <h3>Applications</h3>
          <button className="see-all-btn" onClick={() => navigate("/TalentApplication")}>
            Voir tout
          </button>
        </div>
        <div className="applications-list">
          {applications.length > 0 ? (
            applications.map((app) => (
              <div key={app._id} className="application-card">
                {/* Vérifier si l'offre existe avant d'afficher les données */}
                {app.offre ? (
                  <div className="application-details">
                    <h4>{app.offre.title}</h4>
                    <p>{app.offre.adresse || "Adresse non spécifiée"}</p>
                    <p className="salary">💰 {app.offre.salaire ? `${app.offre.salaire} TND` : "Non précisé"}</p>
                    <p className="status">📅 {app.date_de_candidature ? new Date(app.date_de_candidature).toLocaleDateString() : "Date inconnue"}</p>
                    <p className={`status-tag ${app.statuts.toLowerCase()}`}>{app.statuts}</p>
      
                  </div>
                ) : (
                  <p className="error">⚠️ Cette candidature ne contient pas d'offre valide.</p>
                )}
              </div>
            ))
          ) : (
            <p>Aucune candidature trouvée.</p>
          )}
        </div>
      </div>

      {/* Bloc Jobs recommandés */}
      <div className="dashboard-section">
        <div className="section-header">
          <h3>Jobs Recommendations for You</h3>
          <button className="see-all-btn" onClick={() => navigate("/TalentOfferList")}>
            Voir tout
          </button>
        </div>
        <div className="jobs-listing-section">
  {jobs.length > 0 ? (
    jobs.slice(0, 4).map((job) => (
      <div key={job._id} className="job-listing-card">
        <div className="job-info">
          <h4 className="company-name">{job.id_recruteur?.entreprise?.nom || "Entreprise"}</h4>
          <h3 className="job-title">{job.title}</h3>

          <div className="job-tags">
            <span className="tag">{job.type_offre || "Full Time"}</span>
            <span className="tag">{job.salaire ? `${job.salaire} TND` : "Salaire non précisé"}</span>
 
          </div>

          <p className="job-location">📍 {job.adresse || "Lieu non spécifié"}</p>
          {(() => {
  const offreMatch = candidature.find((c) => c._id === job.offre);
  return (
    <p className="applicants-count">
      👥 {offreMatch ? offreMatch.nombreCandidats : 0} candidats ont postulé
    </p>
  );
})()}
        </div>

        <button className="view-btn" onClick={() => navigate(`/OfferDetails/${job._id}`)}>
          View
        </button>
      </div>
    ))
  ) : (
    <p>Aucun job recommandé pour l'instant.</p>
  )}
</div>

      </div>
    </div>
  );
};

export default TalentDashboard;
