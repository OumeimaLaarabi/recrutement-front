import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import CustomHeader from "../Components/CustomHeader";
import { applyOffre, getAllOffres } from "../Services/OffreServices"; // Assurez-vous que vous avez importé correctement la fonction
import "./TalentOffersList.css";
import { useUserContext } from "../Contexts/AuthContext";
import Toast from "../Components/Toast";

const TalentOfferList = () => {
  const [offers, setOffers] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { user } = useUserContext();
  const [applicationStatus, setApplicationStatus] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const data = await getAllOffres();
        console.log("Fetched offers:", data); // Log the fetched data

        setOffers(data); // Utilisation de setOffers pour mettre à jour les offres
      } catch (error) {
        console.log("Erreur lors du chargement des offres", error);
      }
    };
    fetchOffres();
  }, [s]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleApply = async (offerId) => {
    try {
      const response = await applyOffre(user.id, offerId); // Assurez-vous de bien passer les paramètres requis
      console.log(response);

      if (response.message === "Vous avez déjà postulé pour cette offre") {
        setApplicationStatus("Vous avez déjà postulé");
        setToastType("error");
      } else {
        setApplicationStatus("Candidature réussie");
        setToastType("success");
      }
    } catch (error) {
      console.error("Échec de la candidature pour l'offre:", error);
      setApplicationStatus("Échec de la candidature");
      setToastType("error");
    }
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Cacher la notification après 3 secondes
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredOffers = offers.filter((offer) =>
    offer.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header className="header">
        <CustomHeader />
      </Header>
      <div className="talent-offers-container">
        <div className="headerRec">
          <h1>Offres d'emploi disponibles</h1>
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
              placeholder="Rechercher des offres"
              className="search-bar-offer-list"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
        </div>
        <div className="offers-list">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="offer-item-Talent">
              <div className="offer-content-Talent">
                <Link to={`/OfferDetails/${offer.id}`}>
                  <h3 className="offer-title-Talent">{offer.title}</h3>
                </Link>
                <p className="offer-description-Talent">{offer.description}</p>
                <p className="offer-date-Talent">
                  {formatDate(offer.createdDate)}
                </p>
              </div>
              <div className="offer-actions-Talent">
                <button
                  className="apply-button-Talent"
                  onClick={() => handleApply(offer.id)}
                >
                  Postuler
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Toast 
        message={applicationStatus} 
        show={showToast} 
        onClose={() => setShowToast(false)} 
        type={toastType} 
      />
    </>
  );
};

export default TalentOfferList;
