import { jwtDecode } from "jwt-decode";


export const decodeToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);  // Utiliser jwt_decode

    // Extraire directement les informations du payload
    const email = decodedToken.email;
    const role = decodedToken.role;
    const userId = decodedToken.userId;

    return {
      email,
      role,
      userId,
    };
  } catch (error) {
    console.error("Failed to decode token:", error);
    throw error;
  }
};