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
 export const getOfferById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`); 
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'offre:', error.response?.data || error.message);
    throw error.response?.data?.message || "Erreur de connexion au serveur";
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
export const getOffresbyRecruiter = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/recruteur/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch offers:", error);
    throw error.response?.data?.message || "Erreur de connexion au serveur";
  }
};
export const applyOffre = async (candidatId, offreId, cv) => {
  try {
    const formData = new FormData();
    formData.append("candidatId", candidatId);
    formData.append("offreId", offreId);
    formData.append("cvFile", cv);  // Change 'cv' to 'cvFile'
    const response = await axios.post(`${apiUrl}/apply`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la soumission de la candidature:", error);
    throw error.response?.data?.message || "Erreur de connexion au serveur";
  }
};
// 🔍 Recherche avancée d'offres par titre, type_offre, date
export const searchOffres = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    if (filters.titre) params.append("titre", filters.titre);
    if (filters.type_offre) params.append("type_offre", filters.type_offre);
    if (filters.date) params.append("date", filters.date);

    const response = await axios.get(`${apiUrl}/search`, { params });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la recherche des offres :", error);
    throw error.response?.data?.message || "Erreur de connexion au serveur";
  }
};
// ✅ Récupérer toutes les offres avec le nombre de candidats appliqués
export const getAllOffresWithCandidatureCount = async () => {
  try {
    const response = await axios.get(`${apiUrl}/with-candidatures`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des offres avec candidats:", error);
    throw error.response?.data?.message || "Erreur de connexion au serveur";
  }
};
