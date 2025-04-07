import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Spin } from "antd";
import CustomHeader from "../Components/CustomHeader";
import { getAllOffres } from "../Services/offreService";
import { useUserContext } from "../Contexts/AuthContext";
import Toast from "../Components/Toast";
import "./TalentOffersList.css";

const TalentOfferList = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("recent");
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const data = await getAllOffres();
        setJobs(data);
      } catch (error) {
        console.error("Erreur lors du chargement des offres:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffres();
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);

  const filteredJobs = jobs
    .filter(
      (job) =>
        job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.description?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "recent"
        ? new Date(b.date_creation) - new Date(a.date_creation)
        : new Date(a.date_creation) - new Date(b.date_creation)
    );

  const applyOffre = (id) => {
    if (!user || !user.id) {
      console.error("Utilisateur non connecté");
      return;
    }
    navigate(`/apply/${id}`);
  };

  return (
    <div className="talent-page">
      <CustomHeader />
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search UX Designer..."
          value={search}
          onChange={handleSearch}
          className="search-input-large"
        />
        <button className="search-btn-red">Search</button>
      </div>

      <div className="results-header">
        <h2>Showing {filteredJobs.length} results</h2>
        <div className="sort-wrapper">
  <span className="sort-label">Sort by:</span>
  <select
    className="sort-select"
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
  >
    <option value="recent">Newest Post</option>
    <option value="older">Oldest Post</option>
  </select>
</div>
      </div>

      {loading ? (
        <div className="loader">
          <Spin size="large" />
        </div>
      ) : (
        <div className="job-cards-wrapper">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job._id} className="job-card-modern">
                <div className="job-header">
                  {job.id_recruteur?.entreprise?.logo && (
                    <img
                      src={job.id_recruteur.entreprise.logo}
                      alt="Logo"
                      className="company-logo-square"
                    />
                  )}
                  <div className="job-header-text">
                    <h3 className="job-title">{job.title}</h3>
                    <p className="company-name">{job.id_recruteur?.entreprise?.nom}</p>
                    <p className="job-location">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                      {job.adresse || "Location not specified"}
                    </p>
                  </div>
                  <div className="salary">
                  TND{job.salaire}/hr
                  </div>
                </div>

                <p className="job-desc">
                  {job.description?.length > 100
                    ? job.description.substring(0, 100) + "..."
                    : job.description}
                </p>

                <div className="tags">
                  {(job.requirements || []).slice(0, 4).map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="footer-row">
                  <p className="posted-date">
                    {new Date(job.date_creation).toLocaleDateString()}
                  </p>
                  <button className="apply-btn" onClick={() => applyOffre(job._id)}>
                    Apply Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No jobs match your search.</p>
          )}
        </div>
      )}
      <Toast />
    </div>
  );
};

export default TalentOfferList;
