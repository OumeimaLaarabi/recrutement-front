import React, { useState, useEffect } from "react";
import { getOffresbyRecruiter, deleteOffre } from "../Services/offreService";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { formatDate } from "../Utils/dateUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Layout, Tag, message, Badge } from "antd";
import CustomHeader from "../Components/CustomHeader";
import { useUserContext } from "../Contexts/AuthContext";
import "./RecruiterOffersList.css";

const { Header } = Layout;

function RecruiterOffersList() {
  const [Jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [filteredType, setFilteredType] = useState(null);
  const [filteredDate, setFilteredDate] = useState(null);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleSearch = (event) => setSearch(event.target.value);

  const filteredOffers = Jobs.filter((job) => {
    const isTypeMatch = filteredType ? job.type_offre.toLowerCase() === filteredType.toLowerCase() : true;
    const isDateMatch = filteredDate
      ? filteredDate === "recent"
        ? new Date(job.date_creation) >= new Date() - 30 * 24 * 60 * 60 * 1000
        : new Date(job.date_creation) < new Date() - 30 * 24 * 60 * 60 * 1000
      : true;
    return (
      (job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase())) &&
      isTypeMatch &&
      isDateMatch
    );
  });

  useEffect(() => {
    const fetchOffres = async () => {
      if (!user || !user.id) {
        setError("Utilisateur non authentifié.");
        setLoading(false);
        return;
      }

      try {
        const data = await getOffresbyRecruiter(user.id);
        setJobs(data);
      } catch (error) {
        setError(error.response?.data?.message || "Erreur de connexion au serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchOffres();
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette offre ?")) {
      try {
        await deleteOffre(id);
        setJobs(Jobs.filter((job) => job._id !== id));
        message.success("Offre supprimée avec succès !");
      } catch (err) {
        setError("Erreur lors de la suppression de l'offre.");
      }
    }
  };

  const handleUpdate = (id) => navigate(`/offres/edit/${id}`);

  const getBadgeColor = (type) => {
    if (!type || typeof type !== "string") return "gray";
    switch (type.toLowerCase()) {
      case "stage":
        return "blue";
      case "cdi":
        return "green";
      case "cdd":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <>
      <Header className="header">
        <CustomHeader />
      </Header>
      <div className="recruiter-offers-container">
        <div className="headerRec">
          <h1>Mes Offres</h1>
          
          {/* Search Bar - Updated Design */}
          <div className="search-section">
            <div className="search-container">
              <FontAwesomeIcon
                icon={faSearch}
                className="search-icon"
                style={{ color: isFocused ? "#1890ff" : "#ccc" }}
              />
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Rechercher par titre, description..."
                className="search-bar-offer-list"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>
            
            
          </div>

          {/* Filter Section - Updated Design */}
          <div className="filter-section">
            <div className="results-count">
              Affichage de {filteredOffers.length} offres
            </div>
            
            <div className="filter-options">
              <div className="filter-group">
                <label className="filter-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filteredType === "cdi"}
                    onChange={() => setFilteredType(filteredType === "cdi" ? null : "cdi")}
                  />
                  <span>CDI</span>
                </label>
                
                <label className="filter-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filteredType === "cdd"}
                    onChange={() => setFilteredType(filteredType === "cdd" ? null : "cdd")}
                  />
                  <span>CDD</span>
                </label>
                
                <label className="filter-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filteredType === "stage"}
                    onChange={() => setFilteredType(filteredType === "stage" ? null : "stage")}
                  />
                  <span>Stage</span>
                </label>
              </div>
              
              <div className="filter-group">
                <label className="filter-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filteredDate === "recent"}
                    onChange={() => setFilteredDate(filteredDate === "recent" ? null : "recent")}
                  />
                  <span>Récentes</span>
                </label>
                
                <label className="filter-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filteredDate === "older"}
                    onChange={() => setFilteredDate(filteredDate === "older" ? null : "older")}
                  />
                  <span>Anciennes</span>
                </label>
              </div>
            </div>
          </div>

          <Link to="/offres/new" className="create-offer-link">
            ➕ Nouvelle offre
          </Link>
        </div>

        {loading ? (
          <p>⏳ Chargement des offres...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <table className="offers-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Date</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.map((job) => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.description.length > 50 ? job.description.substring(0, 50) + "..." : job.description}</td>
                  <td>{formatDate(job.date_creation)}</td>
                  <td>
                    <Tag color={getBadgeColor(job.type_offre)}>{job.type_offre}</Tag>
                  </td>
                  <td>
                    <FaEdit
                      className="action-icon edit-icon"
                      title="Modifier"
                      onClick={() => handleUpdate(job._id)}
                    />
                    <FaTrash
                      className="action-icon delete-icon"
                      title="Supprimer"
                      onClick={() => handleDelete(job._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default RecruiterOffersList;