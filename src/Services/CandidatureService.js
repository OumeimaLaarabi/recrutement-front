import axios from 'axios';
import { BASE_URL } from "../Config/config.js";

const apiUrl = `${BASE_URL}/candidatures`; // Assure-toi que BASE_URL est bien défini
const token = localStorage.getItem('authToken'); // Assuming the token is stored here

// Fetch applications by candidate
export const getApplicationsByCandidate = async (candidatId) => {
  try {
    const response = await axios.get(`${apiUrl}/candidat/${candidatId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching applications by candidate:", error);
    throw error.response?.data?.message || "Erreur de connexion au serveur";
  }
};
  
 


  export const getApplicationsByRecruiter = async (recruteurId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user")); // Retrieve the user from localStorage
  
      if (!user || !user.token) {
        throw new Error("Utilisateur non authentifié.");
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, // Attach the JWT token to the request headers
        },
      };
  
      // Make sure the URL is correctly set up
      const response = await axios.get(`${BASE_URL}/candidatures/recruteur/${recruteurId}`, config);
      
      // Check if response data exists
      if (!response || !response.data) {
        throw new Error("No candidatures found for this recruiter.");
      }
  
      return response.data; // Return the data from the response
  
    } catch (error) {
      console.error("Error fetching applications by recruiter:", error);
      // Return more detailed error messages
      throw error.response?.data?.message || error.message || "Unauthorized or error connecting to the server";
    }
  };
  export const deleteCandidatureById = async (id) => {
    try {  // Get token from localStorage
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }
  
      console.log(`📩 Sending update for application ${id}`);

      const response = await axios.delete(`${apiUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log("Candidature supprimée avec succès :", response.data);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la suppression de la candidature :", error);
      throw error;
    }
  };

  export const updateCandidatureStatus = async (id, statuts, offerId, talentId) => {
    try {
      // Get token from localStorage
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }
  
      console.log(`📩 Sending update for application ${id}`);
      
      const response = await axios.patch(
        `${BASE_URL}/candidatures/${id}/statuts`,  // Removed duplicate /api/candidatures
        { statuts, offerId, talentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log("✅ Server response:", response.data);
      return response.data;
      
    } catch (error) {
      console.error("❌ API Error:", {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      
      throw new Error(
        error.response?.data?.message || 
        `Failed to update application status: ${error.message}`
      );
    }
  };
// Récupérer toutes les candidatures
export const fetchCandidatures = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.token;  // Get token from localStorage

    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    // Set the Authorization header with the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${apiUrl}`, config);  // Inclure config ici
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des candidatures :", error);
    throw error;
  }
};
