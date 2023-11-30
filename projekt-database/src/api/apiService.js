import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your server URL

// Function to configure your API base URL and headers
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // You can add common headers here
});

// Function to handle user login
export const loginUser = async (username, password) => {
  try {
    const response = await apiClient.post('/login', { username, password });
    return response.data; // Contains token or user data after successful login
  } catch (error) {
    throw error.response.data; // Contains error message and status
  }
};

export const fetchProtectedData = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token from storage
    try {
      const response = await apiClient.get('/protected-route', {
        headers: {
          Authorization: `Bearer ${token}` // Attaching the token in the header
        }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };