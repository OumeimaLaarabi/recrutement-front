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
  
 
  
  // Fetch applications by recruiter
  export const getApplicationsByRecruiter = async (recruteurId) => {
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
  
      const response = await axios.get(`${BASE_URL}/candidatures/recruteur/${recruteurId}`, config);
      return response.data;
    } catch (error) {
      console.error("Error fetching applications by recruiter:", error);
      throw error.response?.data?.message || "Unauthorized or error connecting to the server";
    }
  };export const updateCandidatureStatus = async (id, statuts, offerId, talentId) => {
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
