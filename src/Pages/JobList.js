import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllOffres } from "../Services/offreService";
import { formatDate } from "../Utils/dateUtils";
import "./offerLists.css"; // Import the CSS file

function JobList() {
  const [offers, setOffers] = useState([]);
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const data = await getAllOffres();
        setOffers(data);
      } catch (error) {
        console.error("Error loading offers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffres();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredOffers = offers.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase())
  );

  return React.createElement(
    "div",
    { className: "job-list-container" },
    React.createElement(
      "div",
      { className: "header-section" },
      React.createElement("h1", { className: "title" }, "Recommended Jobs"),
      React.createElement(
        "div",
        { className: "search-container" },
        React.createElement("input", {
          type: "text",
          value: search,
          onChange: handleSearch,
          placeholder: "Search for jobs...",
          className: `search-bar ${isFocused ? "focused" : ""}`,
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
        })
      )
    ),
    React.createElement(
      "div",
      { className: "jobs-grid" },
      loading
        ? React.createElement("p", null, "Loading jobs...")
        : filteredOffers.length > 0
        ? filteredOffers.map((offer) =>
            React.createElement(
              "div",
              { key: offer.id, className: "job-card" },
              React.createElement(
                "div",
                { className: "job-header" },
                React.createElement("span", { className: "job-date" }, formatDate(offer.createdDate))
              ),
              React.createElement(
                "div",
                { className: "job-content" },
                React.createElement("h3", { className: "job-title" }, offer.title),
                React.createElement("p", { className: "job-description" }, offer.description)
              ),
              React.createElement(
                "div",
                { className: "job-footer" },
                React.createElement("span", { className: "job-price" }, `$${offer.salary}/hr`),
                React.createElement(
                  Link,
                  { to: `/offerDetails/${offer._id}`, className: "details-btn" },
                  "Details"
                )
              )
            )
          )
        : React.createElement("p", null, "No job offers found.")
    )
  );
}

export default JobList;
