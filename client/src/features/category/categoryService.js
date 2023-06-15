import axios from "axios";

const API_URL = "http://localhost:8080/api";

const createCategory = async (categoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${API_URL}/category`,
    categoryData,
    config
  );
  return response.data;
};

const getCategory = async () => {
  const response = await axios.get(`${API_URL}/category`);
  return response.data;
};

const updateCategory = async (categoryId, categoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    `${API_URL}/category/${categoryId}`,
    categoryData,
    config
  );
  return response.data;
};

const deleteCategory = async (categoryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    `${API_URL}/category/${categoryId}`,
    config
  );
  return response.data;
};

const categoryService = {
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
};

export default categoryService;
