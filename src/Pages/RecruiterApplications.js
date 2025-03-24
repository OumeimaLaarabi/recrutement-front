import React, { useEffect, useState } from "react";
import { getApplicationsByRecruiter } from "../Services/CandidatureService"; // Adjust import path as needed
import UpdateStatusButton from "./UpdateStatus"; // Import the UpdateStatusButton component
import "./RecruiterApplications.css";

// RecruiterApplications component
const RecruiterApplications = ({ recruteurId }) => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCV, setCurrentCV] = useState(null); // State to store current CV
  const [isPdf, setIsPdf] = useState(false); // State to track if the CV is a PDF

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplicationsByRecruiter(recruteurId);
        
        setApplications(data.candidatures); // Set the data
        console.log(data.candidatures); // Log the applications array to check the data
      } catch (err) {
        setError(err.message);
      }
    };
  
    fetchApplications();
  }, [recruteurId]);
  
  // Function to open CV in a modal
  const handleCVClick = (cvUrl) => {
    setCurrentCV(cvUrl);

    // Check if the CV is a PDF (Cloudinary files usually have a .pdf extension)
    if (cvUrl.endsWith(".pdf")) {
      setIsPdf(true);
    } else {
      setIsPdf(false);
    }

    setIsModalOpen(true);
  };

  // Function to handle download
  const handleDownload = () => {
    if (currentCV) {
      window.open(currentCV, "_blank"); // Opens in a new tab for download
    }
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCV(null);
    setIsPdf(false);
  };

  // Function to return status color based on the application status
  const getStatusColor = (status) => {
    if (status === "PENDING") return "orange";
    if (status === "ACCEPTED") return "green";
    if (status === "REFUSED") return "red";
    return "black"; // Default if status is not recognized
  };

  // Function to format the score as percentage
  const formatScoreAsPercentage = (score) => {
    if (score !== undefined && score !== null) {
      return `${score}%`;
    }
    return "N/A"; // Return 'N/A' if score is not available
  };

  return (
    <div>
      <h2>Liste des Candidatures</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Nom du Candidat</th>
            <th>CV</th>
            <th>Score</th>
            <th>Date de Candidature</th>
            <th>Status</th>
            <th>Actions</th> {/* Added a column for the status update button */}
          </tr>
        </thead>
        <tbody>
        {applications.map((application, index) => {
  console.log(application); // Log the application object to check its structure
  return (
    <tr key={application._id}>
                  <p>Application ID: {application._id}</p> {/* Log the ID here */}

      <td>{application.candidatName}</td>
      <td>
        <a href="#" onClick={() => handleCVClick(application.cv)}>
          Voir CV
        </a>
      </td>
      <td>{formatScoreAsPercentage(application.score)}</td>
      <td>{application.applicationDate}</td>
      <td style={{ color: getStatusColor(application.statuts) }}>
        {application.statuts}
      </td>
      <td>
        {/* Add the UpdateStatusButton here */}
        <UpdateStatusButton
          candidatureId={application.id} // Ensure _id exists here
          currentStatus={application.statuts}
        />
      </td>
    </tr>
  );
})}
        </tbody>
      </table>

      {/* Modal to preview CV */}
      {isModalOpen && (
        <div className="cv-modal">
          <div className="cv-modal-content">
            <h3>Preview CV</h3>
            {isPdf ? (
              <iframe
                src={currentCV}
                width="100%"
                height="600px"
                title="CV Preview"
                frameBorder="0"
              ></iframe>
            ) : (
              <img src={currentCV} alt="CV Preview" width="100%" />
            )}
            <div>
              <button onClick={handleDownload}>Download CV</button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterApplications;
