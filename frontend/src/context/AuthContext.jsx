import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Create the AuthContext
export const AuthContext = createContext();

// Define the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  // Store the user data
    const navigate = useNavigate();

    useEffect(() => {
        // Check if there's an accessToken and user data in localStorage
        const storedUser = localStorage.getItem("user");
        const storedAccessToken = localStorage.getItem("accessToken");

        if (storedUser && storedAccessToken) {
            // Set the user state and check if the token is valid
            setUser(JSON.parse(storedUser)); // Set user data
            // Here you could also validate the token if needed
            setLoading(false); // Done loading
        } else {
            setLoading(false); // Done loading even if not authenticated
        }
    }, []);

    const signupUser = async (name, email, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/signup', { name, email, password }, { withCredentials: true });
            console.log("Signup successful:", response.data);
            setUser(response.data.data.user); // Set user in state after signup
            localStorage.setItem("user", JSON.stringify(response.data.data.user)); // Store user data
            localStorage.setItem("accessToken", response.data.data.accessToken); // Store token
            return response.data;
        } catch (error) {
            console.error("Error signing up:", error.response?.data || error);
            throw error;
        }
    };

    // Login function
    const login = (userData, accessToken) => {
        localStorage.setItem("accessToken", accessToken); // Store token in localStorage
        localStorage.setItem("user", JSON.stringify(userData)); // Store user data
        setUser(userData); // Update the user state
        navigate("/home"); // Redirect to home page or desired route
        console.log("navigated to home");
        
    };

    // Logout function
    // const logout = () => {
    //     localStorage.removeItem("accessToken");
    //     localStorage.removeItem("user");
    //     setUser(null); // Reset the user state to null
    //     navigate("/login"); // Redirect to login page
    // };

    // If the app is still loading (fetching data from localStorage)
    if (loading) return <div>Loading...</div>;

    return (
        <AuthContext.Provider value={{ user, login, signupUser }}>
            {children}
        </AuthContext.Provider>
    );
};
