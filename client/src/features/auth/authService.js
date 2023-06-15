import axios from "axios";

const API_URL = "http://localhost:8080/api";

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  const response = await axios.get(`${API_URL}/logout`);
  localStorage.removeItem("user");
  return response.data;
};

const refreshToken = async () => {
  const response = await axios.get(`${API_URL}/refresh_token`);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  refreshToken,
};

export default authService;
