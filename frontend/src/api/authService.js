// import axios from "axios";

// const API_BASE_URL = "http://localhost:8000/api/v1/users"; // Backend API

// export const signupUser = async (userData) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/signup`, userData, { withCredentials: true });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || "Signup failed!";
//     }
// };

// export const loginUser = async (userData) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/login`, userData, { withCredentials: true });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || "Login failed!";
//     }
// };