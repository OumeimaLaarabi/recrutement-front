import axios from "axios";
import { BASE_URL } from "../Config/config.js";

// Pour la connexion, on garde la même fonction
export const login = async (email, password) => {
  
    const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    if (response.status === 200 && response.data.user ) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      return response;
  } else {
      return "Login failed";
  }
};
// Fonction pour enregistrer un candidat (Talent)
export const registerCandidate = async (prenom,nom , email, password, adresse, telephone) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register/candidat`, {
      prenom,
      nom ,
      email,
      password,
      adresse,
      telephone
    });
    // Check if the response is successful and contains user data
    if (response.status === 200 && response.data.user) {
      // Store the user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;  // Return the response data
  } catch (error) {
    console.error("Failed to register candidate:", error);
    throw error;
  }
};

export const registerRecruiter = async (firstName, lastName, email, password, entreprise, logoFile) => {
  try {
    const formData = new FormData();
    formData.append("prenom", firstName);
    formData.append("nom", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("entrepriseNom", entreprise.nom);
    formData.append("entrepriseMatricule", entreprise.matricule);
    formData.append("entrepriseAdresse", entreprise.adresse);
    formData.append("entrepriseTelephone", entreprise.telephone);
    formData.append("entrepriseSecteur", entreprise.secteur);
    
    // Ajouter le logo s'il est fourni
    if (logoFile) {
      formData.append("logo", logoFile);
    }

    // Log des données envoyées
    console.log("Sending request with data:", Object.fromEntries(formData));

    const response = await axios.post(`${BASE_URL}/auth/register/recruteur`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du recruteur :", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Erreur lors de l'enregistrement. Veuillez réessayer.");
  }
};


export const GetMonthlyUserCount = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/monthlyUserCount`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch counts:", error);
    throw error;
  }
};

export const getUserFromLocalStorage = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user // Parse JSON if it exists, else return null
}


export const GetUserCountsByRole = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/userCountsByRole`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch role counts:", error);
    throw error;
  }
};
