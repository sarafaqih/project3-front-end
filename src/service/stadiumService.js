import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/stadium`;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get all stadiums
const getAllStadiums = async () => {
  try {
    const res = await api.get("/");
    console.log("res", res.data);
    return res.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    return []; // Return empty array in case of error
  }
};

const getOneStadium = async (id) => {
    try {
        const res = await api.get(`/${id}`); 
        return res.data;
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};

// Create a new stadium
const createStadium = async (formData) => {
  try {
    const res = await api.post("/", formData);
    console.log("Response from backend:", res.data);
    return res.data;
  } catch (err) {
    console.log("Error creating stadium:", err.message);
    throw err; // Rethrow the error for the caller to handle if needed
  }
};

export  {getAllStadiums}; 