import React, { useState, useEffect } from "react";
import { getAllOffres } from "../Services/offreService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faBuilding, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../Utils/dateUtils";
import "./offerLists.css";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons/faMoneyBillWave";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons/faMoneyCheck";

const OffreList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  const jobsPerPage = 5;

  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleOfferClick = (offerId) => {
    if (!user) {
      navigate("/Login");
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const data = await getAllOffres();
        setJobs(data);
      } catch (error) {
        console.error("Erreur lors du chargement des offres", error);
        setError("Failed to load job listings.");
      } finally {
        setLoading(false);
      }
    };
    fetchOffres();
  }, []);

  // Filtering jobs based on search
  const filteredJobs = jobs.filter(
    (job) =>
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.description?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="offers-page">
      <h1 className="title">Offres d'emplois</h1>

      {/* Search Bar */}
      <div className="search-container">
        <FontAwesomeIcon
          icon={faSearch}
          className="search-icon"
          style={{ color: isFocused ? "#4caf50" : "#ccc" }}
        />
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search for jobs"
          className="search-bar"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      {/* Job Listings */}
      <div className="job-listings">
        {loading ? (
          <div className="loader">Chargement...</div>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : filteredJobs.length === 0 ? (
          <p className="no-jobs">No jobs found.</p>
        ) : (
          <div className="job-list">
            {currentJobs.map((job) => (
              <div key={job.id} className="job-item">
                <h2 className="job-title">{job.title}</h2>
                <p className="job-description">{job.description}</p>

                <p className="date">
                Posted on: <span className="normal-text">{new Date(job.date_creation).toLocaleDateString()}</span>
                </p>
                <div className="job-info">
                  <span>
                    <FontAwesomeIcon icon={faMoneyCheck} /> {job.salaire}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {job.adresse}
                  </span>
                </div>
                <button onClick={() => handleOfferClick(job.id)} className="apply-btn">
                  APPLY
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OffreList;
