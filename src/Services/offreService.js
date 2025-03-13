import axios from 'axios';
import { BASE_URL } from "../Config/config.js";

const apiUrl = `${BASE_URL}/Offres`; // Assure-toi que BASE_URL est bien défini

export const createOffre = async (offreData) => {
  try {
    const response = await axios.post(`${apiUrl}`, offreData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'offre:", error);
    throw error.response?.data?.message || "Erreur de connexion au serveur";
  }
};


export const getAllOffres = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des offres:", error);
    throw error.response?.data?.message || "Erreur de connexion au serveur";
  }
};


 //✅ Récupérer une offre par ID
export const getOffreById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'offre:', error.response?.data || error.message);
    throw error;
  }
};
export const deleteOffre = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'offre:", error);
    throw error.response?.data?.message || "Erreur de connexion au serveur";
  }
};

export const updateOffre = async (id, offreData) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, offreData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'offre:", error);
    throw error.response?.data?.message || "Erreur de connexion au serveur";
  }
};
// ✅ Mettre à jour une offre (seulement pour Recruteur/Admin)
/*export const updateOffre = async (id, updatedData) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, updatedData, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'offre:', error.response?.data || error.message);
    throw error;
  }
};*/

// ✅ Supprimer une offre (seulement pour Recruteur/Admin)
/*export const deleteOffre = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'offre:', error.response?.data || error.message);
    throw error;
  }
};*/

// ✅ Récupérer les candidatures pour une offre
/*export const getCandidaturesForOffre = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}/candidatures`, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des candidatures:', error.response?.data || error.message);
    throw error;
  }
};*/
