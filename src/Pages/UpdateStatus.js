import React, { useState } from "react";
import { updateCandidatureStatus } from "../Services/CandidatureService"; // Make sure to import the service function

const UpdateStatus = ({ candidatureId, currentStatus, offerId, talentId }) => {
  const [status, setStatus] = useState(currentStatus); // Initialize with current status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleStatusChange = async (newStatus) => {
    if (!candidatureId || !offerId || !talentId) {
      setError("Données manquantes pour mettre à jour le statut !");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      await updateCandidatureStatus(candidatureId, offerId, talentId, newStatus);
      setStatus(newStatus);
    } catch (err) {
      setError("Erreur lors de la mise à jour du statut.");
      setStatus(currentStatus);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Loading...</p> // Optionally add a loading spinner or button disable here
      ) : (
        <select value={status} onChange={(e) => handleStatusChange(e.target.value)}>
          <option value="PENDING">Pending</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REFUSED">Refused</option>
        </select>
      )}
    </div>
  );
};

export default UpdateStatus;
