import axios from "axios";

// Create a reusable axios instance with a base URL
const apiClient = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API methods
const fetchKalamsData = async () => {
  try {
    const response = await apiClient.get("/kalams");
    return response.data;
  } catch (error) {
    console.error("Error fetching Kalams data:", error);
    throw error;
  }
};

// Export the API methods
export default {
  fetchKalamsData,
};

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Redirect to login or refresh token
    }
    return Promise.reject(error);
  }
);
