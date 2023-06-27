import axios from "axios";

const API_URL = "http://localhost:8080/api";

const createComment = async (commentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}/comment`, commentData, config);
  return response.data;
};

const getComments = async (id) => {
  const response = await axios.get(`${API_URL}/comments/blog/${id}`);
  return response.data;
};

const commentService = {
  createComment,
  getComments,
};

export default commentService;
