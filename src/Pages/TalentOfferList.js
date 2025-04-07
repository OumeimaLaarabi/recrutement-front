import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBriefcase, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Layout, Spin } from "antd";
import CustomHeader from "../Components/CustomHeader";
import { getAllOffres } from "../Services/offreService";
import { useUserContext } from "../Contexts/AuthContext";
import Toast from "../Components/Toast";
import "./TalentOffersList.css"
const TalentOfferList = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
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

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const applyOffre = (offerId) => {
    if (!user || !user.id) {
      console.error("L'utilisateur n'est pas connecté.");
      return;
    }
    navigate(`/apply/${offerId}`);
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
      <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🔎 Offres d'emploi disponibles
          </h1>

          {/* Barre de recherche */}
          <div className="relative mb-6">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Rechercher des offres..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <Spin size="large" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredOffers.length > 0 ? (
                filteredOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                  >
                    <Link to={`/OfferDetails/${offer._id}`}>
                      <h3 className="text-xl font-semibold text-blue-600 hover:underline">
                        {offer.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mt-2">{offer.description}</p>
                    <div className="flex items-center mt-4 text-gray-500">
                      <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                      <span>{offer.company || "Entreprise non spécifiée"}</span>
                    </div>
                    <div className="flex items-center mt-2 text-gray-500">
                      <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                      <span>{formatDate(offer.date_creation)}</span>
                    </div>
                    <button
                      className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300"
                      onClick={() => applyOffre(offer._id)}
                    >
                      📩 Postuler
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">Aucune offre ne correspond à votre recherche.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Toast />
    </>
  );
};

export default TalentOfferList;
