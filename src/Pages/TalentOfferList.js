import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Layout, Spin } from "antd";
import CustomHeader from "../Components/CustomHeader";
import { applyOffre, getAllOffres } from "../Services/offreService";
import { useUserContext } from "../Contexts/AuthContext";
import Toast from "../Components/Toast";
import "./TalentOffersList.css";

const TalentOfferList = () => {
  const [jobs, setJobs] = useState([]); 
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [applicationStatus, setApplicationStatus] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");
  const { user } = useUserContext();
  const navigate = useNavigate(); // Hook to handle navigation after updating the offer

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const data = await getAllOffres();
        setJobs(data); // ✅ Stocker les offres récupérées
      } catch (error) {
        console.error("Erreur lors du chargement des offres:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffres();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const applyOffre = async (offerId) => {
  if (!user || !user.id) {
    console.error("L'utilisateur n'est pas connecté ou son ID est manquant.");
    return;
  }

  console.log("Candidature pour l'offre :", offerId, "avec l'utilisateur :", user.id);
  
  navigate(`/apply/${offerId}`); // Assure-toi que l'ID est bien passé dans l'URL
};


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredOffers = jobs.filter((offer) =>
    offer.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Layout.Header>
        <CustomHeader />
      </Layout.Header>
      <div className="talent-offers-container">
        <div className="headerRec">
          <h1>Offres d'emploi disponibles</h1>
          <div className="search-container">
            <FontAwesomeIcon
              icon={faSearch}
              className="search-icon"
              style={{ color: search ? "#4caf54" : "#ccc" }}
            />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Rechercher des offres"
              className="search-bar-offer-list"
            />
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <Spin size="large" />
          </div>
        ) : (
          <div className="offers-list">
            {filteredOffers.length > 0 ? (
              filteredOffers.map((offer) => (
                <div key={offer.id} className="offer-item-Talent">
                  <div className="offer-content-Talent">
{                  //  console.log("offer",offer.id_recruteur)
}                    
                    <Link to={`/OfferDetails/${offer._id}`}>
                      <h3 className="offer-title-Talent">{offer.title}</h3>
                    </Link>
                    <p className="offer-description-Talent">{offer.description}</p>
                    <p className="offer-date-Talent">{formatDate(offer.createdDate)}</p>
                  </div>
                  <div className="offer-actions-Talent">
                  <button
                      className="apply-button-Talent"
                      onClick={() => applyOffre(offer._id)}
                    >
                      Postuler
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucune offre ne correspond à votre recherche.</p>
            )}
          </div>
        )}
      </div>
      <Toast message={applicationStatus} show={showToast} onClose={() => setShowToast(false)} type={toastType} />
    </>
  );
};

export default TalentOfferList;
