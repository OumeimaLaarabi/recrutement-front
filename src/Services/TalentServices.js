import axios from "axios";
import { BASE_URL } from "../Config/config.js";

const apiUrl = `${BASE_URL}/users/`;  // Utilisation correcte du préfixe `api/users`

export const getCandidats = async () => {
  try {
    const response = await axios.get(`${apiUrl}/candidats`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Candidats:", error);
    throw error;
  }
};// API functions
// Function to fetch a specific candidate by id
export const getCandidateById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/candidat/${id}`);  // Correct endpoint
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Candidat:", error);
    throw error;
  }
};
export const updateCandidat = async (id, updatedData) => {
  try {
    const response = await axios.put(`${apiUrl}/candidat/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Failed to update Candidat:", error);
    throw error;
  }
};

export const deleteCandidat = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/candidat/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete Candidat:", error);
    throw error;
  }
};

 

