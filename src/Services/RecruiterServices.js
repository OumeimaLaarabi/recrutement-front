import axios from "axios";
import { BASE_URL } from "../Config/config.js";

const apiUrl = `${BASE_URL}/users`;

export const getAllRecruiters = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des recruteurs:", error);
    throw error.response?.data?.message || "Erreur de connexion au serveur";
  }
};
export const getRecruiterById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/recruteur/${id}`);
    console.log("Réponse API recruteur:", response);

    return response.data; // Return recruiter data
  } catch (error) {
      console.error("Error fetching recruiter:", error);
      throw error.response?.data?.message ; // Throw error for handling in the component
  }
};

export const updateRecruiter = async (id, recruiterData) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, recruiterData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du recruteur:", error);
    throw error.response?.data?.message || "Erreur de connexion au serveur";
  }
};
export const deleteRecruiter = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression du recruteur:", error);
    throw error.response?.data?.message || "Erreur de connexion au serveur";
  }
};
export const getRecruteursByEntreprise = async (entrepriseId) => {
  try {
    const response = await axios.get(`${apiUrl}/${entrepriseId}/recruteurs`);
return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des recruteurs de l'entreprise:", error);
    throw error.response?.data?.message || "Erreur de connexion au serveur";
  }
};