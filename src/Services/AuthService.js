import axios from "axios";

const API_URL = "http://localhost:8090/api/auth";

export const sendResetLink = async (email) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};

export const resetPassword = async (token, newPassword) => {
  const response = await axios.post(`${API_URL}/reset-password`, { token, newPassword });
  return response.data;
};
