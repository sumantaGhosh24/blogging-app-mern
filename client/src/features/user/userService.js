import axios from "axios";

const API_URL = "https://blogging-app-mern.onrender.com/api";

const getUser = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

const updateUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(`${API_URL}/user`, userData, config);
  return response.data;
};

const userService = {
  getUser,
  updateUser,
};

export default userService;
