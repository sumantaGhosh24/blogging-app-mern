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
  const response = await axios.get(`${API_URL}/comment/blogs/${id}`);
  return response.data;
};

const replyComment = async (replyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${API_URL}/replay_comment`,
    replyData,
    config
  );
  return response.data;
};

const updateComment = async (id, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/comment/${id}`, data, config);
  return response.data;
};

const deleteComment = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/comment/${id}`, config);
  return response.data;
};

const commentService = {
  createComment,
  getComments,
  replyComment,
  updateComment,
  deleteComment,
};

export default commentService;
