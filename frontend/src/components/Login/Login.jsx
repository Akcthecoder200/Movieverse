import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


 // Make sure the path is correct

const Login = ({ toggle }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext); // Using context to manage login
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const res = await fetch("http://localhost:8000/api/v1/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // Important for cookies
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            // Use the login function from AuthContext
            login(data.data.user);
            console.log("login successsful",data.data.user);
            navigate("/home");
            return data;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                        Login
                    </button>
                </form>
                <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <button onClick={toggle} className="text-blue-500 hover:underline">
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
