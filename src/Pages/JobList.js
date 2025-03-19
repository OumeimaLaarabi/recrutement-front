import React, { useEffect, useState } from "react";
import { faInfoCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FaEdit } from "react-icons/fa";
import { formatDate } from "../Utils/dateUtils";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header } from "antd/es/layout/layout";
import CustomHeader from "../Components/CustomHeader";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function JobList() {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredOffers = offers.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getOffres();
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
        setError("Failed to fetch offers. Please try again.");
      }
    };

    fetchOffers();
  }, []);

  return (
    <>
      <Header className="header">
        <CustomHeader />
      </Header>
      <div className="recruiter-offers-container">
        <div className="headerRec">
          <h1>Offers</h1>
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
        </div>
        <div className="offers-list">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="offer-item">
              <div className="offer-content">
                <h3 className="offer-title">{offer.title}</h3>
                <p className="offer-description">{offer.description}</p>
                <p className="offer-date">{formatDate(offer.createdDate)}</p>
              </div>
              <div className="offer-actions">
                <Link
                  to={`/offerDetails/${offer._id}`}
                  style={{ textDecoration: "none", color: "green" }}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
    </>
  );
}

export default JobList;
