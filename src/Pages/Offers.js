import React, { useState, useEffect } from "react";
import "./offerLists.css"; // Import CSS file for styling
import { getAllOffres } from "../Services/offreService";
import { useUserContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const OffreList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("recent");
  const [filterType, setFilterType] = useState("all");
  const jobsPerPage = 6;

  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleOfferClick = (offerId) => {
    if (!user) {
      navigate("/Login");
    }
  };

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

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "recent" ? "older" : "recent");
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    setCurrentPage(1);
  };

  const filteredJobs = jobs
    .filter(
      (job) =>
        (filterType === "all" || job.type_offre === filterType) &&
        (job.title?.toLowerCase().includes(search.toLowerCase()) ||
          job.description?.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) =>
      sortOrder === "recent"
        ? new Date(b.date_creation) - new Date(a.date_creation)
        : new Date(a.date_creation) - new Date(b.date_creation)
    );

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="job-list-container">
      <h1 className="title">
    Recommended Jobs{" "}
    <span className="job-count-badge">{filteredJobs.length}</span>
  </h1>
      <input
        type="text"
        placeholder="Search for jobs..."
        value={search}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="filter-container">
        <div className="filter-left">
          {["all", "CDD", "CDI", "Stage"].map((type) => (
            <button
              key={type}
              className={`filter-btn ${filterType === type ? "active" : ""}`}
              onClick={() => handleFilterChange(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="filter-right">
          <button onClick={handleSort} className="sort-btn">
            Sort by: {sortOrder === "recent" ? "Recent" : "Older"}
          </button>
        </div>
      </div>
      <div className="jobs-cards">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : currentJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          currentJobs.map((job) => (
            <div key={job.id} className="jobs-card">
              <div className="jobs-header">{new Date(job.date_creation).toDateString()}</div>
              <div className="jobs-title-container">
  {job.id_recruteur?.entreprise?.logo && (
    <img
      src={job.id_recruteur.entreprise.logo}
      alt="Company Logo"
      className="company-logo"
    />
  )}
  <h2 className="jobs-title">{job.title}</h2>
</div>              <div className="jobs-details">
                <span className="jobs-salary">${job.salaire}/hr</span>
                <span className="jobs-location">{job.adresse}</span>
              </div>
              <div>
              <span className="jobs-description">{job.description.length > 50 ? job.description.substring(0, 50) + "..." : job.description}</span>
              </div>
              {job.mots_cle && job.mots_cle.length > 0 && (
  <div className="jobs-keywords">
    {job.mots_cle.map((keyword, index) => 
      keyword.mot
        .split(/[-/]/) // Sépare par "-" ou "/"
        .map((mot, subIndex) => {
          const trimmedMot = mot.trim();
          return trimmedMot !== "" ? (
            <span key={`${index}-${subIndex}`} className="keyword-badge">
              {trimmedMot}
            </span>
          ) : null;
        })
    )}
  </div>
)}
              <button onClick={() => handleOfferClick(job.id)} className="apply-btn">
                APPLY
              </button>
            </div>
          ))
        )}
      </div>
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
