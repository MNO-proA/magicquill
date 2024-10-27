import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Adjust this to match your API URL

// User API functions
export const createUserApi = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users`, userData);
  return response.data;
};

export const getAllUsersApi = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};

export const getUserApi = async (userId) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}`);
  return response.data;
};

export const updateUserApi = async ({ userId, userData }) => {
  const response = await axios.put(`${BASE_URL}/users/${userId}`, userData);
  return response.data;
};

export const deleteUserApi = async (userId) => {
  const response = await axios.delete(`${BASE_URL}/users/${userId}`);
  return response.data;
};

// Content API functions
export const createContentApi = async (contentData) => {
  const response = await axios.post(`${BASE_URL}/contents`, contentData);
  return response.data;
};

export const getContentApi = async (contentId) => {
  const response = await axios.get(`${BASE_URL}/contents/${contentId}`);
  return response.data;
};

export const getUserContentApi = async (userId) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}/contents`);
  return response.data;
};

export const deleteContentApi = async (contentId) => {
  const response = await axios.delete(`${BASE_URL}/contents/${contentId}`);
  return response.data;
};

// Todo API functions
export const createTodoApi = async (todoData) => {
  const response = await axios.post(`${BASE_URL}/todos`, todoData);
  return response.data;
};

export const getTodoApi = async (todoId) => {
  const response = await axios.get(`${BASE_URL}/todos/${todoId}`);
  return response.data;
};

export const getUserTodosApi = async (userId) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}/todos`);
  return response.data;
};

export const updateTodoApi = async ({ todoId, todoData }) => {
  const response = await axios.put(`${BASE_URL}/todos/${todoId}`, todoData);
  return response.data;
};

export const deleteTodoApi = async (todoId) => {
  const response = await axios.delete(`${BASE_URL}/todos/${todoId}`);
  return response.data;
};