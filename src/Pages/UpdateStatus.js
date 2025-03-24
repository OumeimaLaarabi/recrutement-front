import React, { useState } from "react";
import { updateCandidatureStatus } from "../Services/CandidatureService"; // Make sure to import the service function

const UpdateStatus = ({ candidatureId, currentStatus }) => {
  console.log("candidatureId inside UpdateStatusButton:", candidatureId); // Log to verify

  const [status, setStatus] = useState(currentStatus); // Initialize with current status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    setError(null); // Reset error message

    try {
      await updateCandidatureStatus(candidatureId, newStatus);

      setStatus(newStatus); // Update the status locally
    } catch (err) {
      setError("Error updating status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
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
