import React, { useState, useEffect } from "react";
import { getAllOffres, deleteOffre } from "../Services/offreService";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const OffreList = () => {
  const [Jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const data = await getAllOffres();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.log("Erreur lors du chargement des offres", error);
        setLoading(false);
      }
    };
    fetchOffres();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette offre ?")) {
      try {
        await deleteOffre(id);
        setJobs(Jobs.filter((job) => job._id !== id)); // Update the list after deletion
      } catch (err) {
        setError("Erreur lors de la suppression de l'offre.");
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/offres/edit/${id}`); // Update the navigate path to match your defined route
  };

  return (
    <div className="job-listings-container offers-page">
      <h1 className="title">Job Listings</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <div className="loader">Loading...</div>
      ) : Jobs.length === 0 ? (
        <p className="no-jobs">No jobs found.</p>
      ) : (
        <div className="job-list">
          {Jobs.map((job) => (
            <div key={job._id} className="job-item">
              <h2>{job.title}</h2>
              <p>{job.description}</p>
              <button onClick={() => handleUpdate(job._id)}>Modifier</button> {/* Button to navigate to the update page */}
              <button onClick={() => handleDelete(job._id)}>Supprimer</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OffreList;
