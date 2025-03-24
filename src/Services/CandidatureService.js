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
  };
  
  export const updateCandidatureStatus = async (candidatureId, newStatus) => {
    console.log("URL for update request:", `${apiUrl}/${candidatureId}/statut`);
  
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
  
      const response = await axios.patch(
        `${apiUrl}/${candidatureId}/statut`,
        { statuts: newStatus }, // Send the new status in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token for authorization
          },
        }
      );
  
      return response.data; // This will contain the updated candidature data
    } catch (error) {
      console.error("Error updating candidature status:", error);
      throw error; // Propagate error for handling in the component
    }
  };
  