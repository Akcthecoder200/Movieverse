import { useContext, useEffect, useState } from "react";
import {  Routes, Route,useNavigate  } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import Home from "./components/Home.jsx";
import { AuthContext } from "./context/AuthContext.jsx";

function App() {
  
    const [isLogin, setIsLogin] = useState(true);
    const { user } = useContext(AuthContext); // Get the user from AuthContext
    const navigate = useNavigate(); // For programmatic navigation
  
    useEffect(() => {
      if (user) {
        navigate("/home"); // Redirect to Home if user is logged in
      }
    }, [user, navigate]); // Run whenever the user changes
  
    return (
      
        <Routes>
          <Route
            path="/login"
            element={isLogin ? (
              <Login toggle={() => setIsLogin(false)} />
            ) : (
              <Signup toggle={() => setIsLogin(true)} />
            )}
          />
          <Route
            path="/home"
            element={user ? (
              <Home />
            ) : (
              <Login toggle={() => setIsLogin(false)} />
            )}
          />
          {/* Add more routes as needed */}
        </Routes>
     
    );
  }

export default App;
