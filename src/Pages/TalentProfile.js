import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '../Contexts/AuthContext'; // Import your context
import { getCandidateById, updateCandidat } from '../Services/TalentServices.js';
import './TalentProfile.css'; // Import your CSS file
const TalentProfile = () => {
  const { id } = useParams();
  const { user } = useUserContext();  // Access the user from context

  const candidatId = user?.id;  // Access user.id (which should be populated after login)

  console.log('Candidate ID from user context:', candidatId);  // Log the user ID

  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    adresse: '',
    telephone: ''
  });

  useEffect(() => {
    if (!candidatId) {
      return;  // Don't fetch if the user id is not available yet
    }

    const fetchCandidate = async () => {
      try {
        const data = await getCandidateById(candidatId);  // Use the candidate ID from context
        setCandidate(data);
        setFormData({
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          adresse: data.adresse,
          telephone: data.telephone
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching candidate:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCandidate();  // Call to fetch the candidate if `candidatId` is available
  }, [candidatId]);  // Re-run the effect when `candidatId` changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCandidate = await updateCandidat(candidatId, formData);
      setCandidate(updatedCandidate);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!candidate) return <div className="not-found">Candidate not found</div>;

  return (
    <div className="talent-profile-container">
      <div className="profile-header">
        <h1>{candidate.prenom} {candidate.nom}</h1>
        
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">First Name:</span>
              <span className="detail-value">{candidate.prenom}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Last Name:</span>
              <span className="detail-value">{candidate.nom}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{candidate.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{candidate.telephone}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Address:</span>
              <span className="detail-value">{candidate.adresse}</span>
            </div>
          </div>
        </div>
      )}
      
      {!isEditing && (
          <div className="action-buttons">
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </div>
        )}
    </div>
  );
};

export default TalentProfile;
