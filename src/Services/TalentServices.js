import axios from "axios";
import { BASE_URL } from "../Config/config.js";

const apiUrl = `${BASE_URL}/Candidats`;

export const getCandidats = async () => {
  try {
    const response = await axios.get(`${apiUrl}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Candidats:", error);
    throw error;
  }
};

export const getCandidat = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Candidat:", error);
    throw error;
  }
};


export const updateCandidat = async (userId, updatedData) => {
  try {
    const response = await axios.put(`${apiUrl}/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Failed to update Candidat:", error);
    throw error;
  }
};
export const deleteCandidat = async (userId) => {
  try {
    const response = await axios.delete(`${apiUrl}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete Candidat:", error);
    throw error;
  }
};


 

