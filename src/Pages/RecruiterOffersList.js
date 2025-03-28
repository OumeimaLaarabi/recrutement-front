import React, { useState, useEffect } from "react";
import { getOffresbyRecruiter, deleteOffre } from "../Services/offreService";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaEdit, FaTrash } from "react-icons/fa";
import { formatDate } from "../Utils/dateUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Layout } from "antd"; // Correct import for Header
import CustomHeader from "../Components/CustomHeader";
import { useUserContext } from "../Contexts/AuthContext";
import "./RecruiterOffersList.css";
const { Header } = Layout;

function RecruiterOffersList() {
  const [Jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { user } = useUserContext(); // Ensure that `user` is used
  const navigate = useNavigate(); // Declare useNavigate

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredOffers = Jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchOffres = async () => {
      console.log("🔄 Début du fetch des offres...");

      if (!user || !user.id) {
        console.error("⛔ Erreur: Utilisateur non authentifié.");
        setError("Utilisateur non authentifié.");
        setLoading(false);
        return;
      }

      try {
        const data = await getOffresbyRecruiter(user.id);
        console.log("Offres récupérées:", data); // Log the fetched data
        setJobs(data); // Correctly set state
      } catch (error) {
        console.error("Erreur lors du chargement des offres:", error);
        setError(error.response?.data?.message || "Erreur de connexion au serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchOffres();
  }, [user]); // Add `user` as a dependency to reload offers if the user changes

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette offre ?")) {
      try {
        await deleteOffre(id); // Delete the offer
        setJobs(Jobs.filter((job) => job._id !== id)); // Update the list after deletion using _id (not id)
      } catch (err) {
        setError("Erreur lors de la suppression de l'offre.");
      }
    }
  };

  const handleUpdate = (id) => {
    console.log("ID de l'offre sélectionnée :", id);
    navigate(`/offres/edit/${id}`); // Redirect to the edit page with the offer ID
  };

  return (
    <>
      <Header className="header">
        <CustomHeader />
      </Header>
      <div className="recruiter-offers-container">
        <div className="headerRec">
          <h1>My Offers</h1>
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
              className="search-bar-offer-list"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
          <Link to="/offres/new" className="create-offer-link">
            Create New Offer
          </Link>
        </div>

        {loading ? (
          <p>Loading offers...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="offers-list">
            {filteredOffers.map((job) => (
              <div key={job._id} className="offer-item"> {/* Use _id for key */}
                <div className="offer-content">
                  <h3 className="offer-title">{job.title}</h3>
                  <p className="offer-description">{job.description}</p>
                  <p className="offer-date">{formatDate(job.date_creation)}</p>
                  <p className="offer-salaire">{job.salaire}</p>
                  <p className="offer-cle">
                        Keywords:{" "}
                        <span className="normal-text">
                            {job.mots_cle?.map((keyword, index) => (
                                <span key={index}>{keyword.mot} </span>
                            ))}
                        </span>
                    </p>
                    <p className="offer-langue">
                        Languages:{" "}
                        <span className="normal-text">
                            {job.langues?.map((language, index) => (
                                <span key={index}>{language.langue} </span>
                            ))}
                        </span>
                    </p>

                </div>
                <div className="offer-actions">
                  {/* Use handleUpdate for updating the offer */}
                  <FaEdit
                    className="action-icon edit-icon"
                    onClick={() => handleUpdate(job._id)} // Use _id for update
                  />
                  <FaTrash
                    className="action-icon delete-icon"
                    onClick={() => handleDelete(job._id)} // Use _id for delete
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default RecruiterOffersList;
