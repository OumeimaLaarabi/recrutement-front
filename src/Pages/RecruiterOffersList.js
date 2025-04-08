import React, { useState, useEffect } from "react";
import { getOffresbyRecruiter, deleteOffre } from "../Services/offreService";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { formatDate } from "../Utils/dateUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Layout, Tag, message } from "antd";
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
  const [sortOrder, setSortOrder] = useState("recent");
  const [filterType, setFilterType] = useState("all");

  const { user } = useUserContext();
  const navigate = useNavigate();

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

  const handleSearch = (event) => setSearch(event.target.value);

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

  const handleSort = () => {
    setSortOrder(sortOrder === "recent" ? "older" : "recent");
  };

  const handleFilterChange = (type) => {
    setFilterType(type.toLowerCase());
  };

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

  const filteredOffers = Jobs
    .filter(
      (job) =>
        job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.description?.toLowerCase().includes(search.toLowerCase())
    )
    .filter(
      (job) => filterType === "all" || job.type_offre?.toLowerCase() === filterType
    )
    .sort((a, b) =>
      sortOrder === "recent"
        ? new Date(b.date_creation) - new Date(a.date_creation)
        : new Date(a.date_creation) - new Date(b.date_creation)
    );

  return (
    <>
      <Header className="header">
        <CustomHeader />
      </Header>
      <div className="recruiter-offers-container">
        <h1>Mes Offres</h1>

        {/* Filtres + Recherche */}
        <div className="filter-container">
          <div className="filter-left">
            {["all", "CDD", "CDI", "Stage"].map((type) => (
              <button
                key={type}
                className={`filter-btn ${filterType === type.toLowerCase() ? "active" : ""}`}
                onClick={() => handleFilterChange(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="sort-wrapper">
            <div className="sort-label">Sort by</div>
            <select className="sort-select" onChange={handleSort} value={sortOrder}>
              <option value="recent">Most Recent</option>
              <option value="older">Older</option>
            </select>
          </div>
        </div>

        <div className="search-section">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by job title or description"
          />
        </div>
        <Link to="/offres/new" className="create-offer-link">
            ➕ Nouvelle offre
          </Link>
        {/* Table des offres */}
        <div className="offers-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.map((job) => (
                <tr key={job._id}>
                <td>{job.title}</td>
                <td>
                  <span className={`badge ${getBadgeColor(job.type_offre)}`}>
                    {job.type_offre}
                  </span>
                </td>
                <td>{new Date(job.date_creation).toLocaleDateString()}</td>
                <td>
                  <span
                    className="action-icon edit-icon"
                    onClick={() => handleUpdate(job._id)}
                  >
                    <FaEdit />
                  </span>
                  <span
                    className="action-icon delete-icon"
                    onClick={() => handleDelete(job._id)}
                  >
                    <FaTrash />
                  </span>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>

       
      </div>
    </>
  );
}

export default RecruiterOffersList;
