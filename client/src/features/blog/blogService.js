import axios from "axios";

const API_URL = "http://localhost:8080/api";

const createBlog = async (blogData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}/blog`, blogData, config);
  return response.data;
};

const getHomeBlogs = async () => {
  const response = await axios.get(`${API_URL}/home/blogs`);
  return response.data;
};

const getBlogsByCategory = async (id, search) => {
  let limit = 8;
  let value = search ? search : `?page=${1}`;
  const response = await axios.get(
    `${API_URL}/blogs/category/${id}${value}$limit=${limit}`
  );
  return response.data;
};

const getBlogsByUser = async (id, search) => {
  let limit = 3;
  let value = search ? search : `?page=${1}`;
  const response = await axios.get(
    `${API_URL}/blogs/user/${id}${value}&limit=${limit}`
  );
  return response.data;
};

const getBlog = async (id) => {
  const response = await axios.get(`${API_URL}/blog/${id}`);
  return response.data;
};

const updateBlog = async (id, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/blog/${id}`, data, config);
  return response.data;
};

const deleteBlog = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/blog/${id}`, config);
  return response.data;
};

const searchBlogs = async (data) => {
  const response = await axios.get(`${API_URL}/search/blogs?title=${data}`);
  return response.data;
};

const blogService = {
  createBlog,
  getHomeBlogs,
  getBlogsByCategory,
  getBlogsByUser,
  getBlog,
  updateBlog,
  deleteBlog,
  searchBlogs,
};

export default blogService;
