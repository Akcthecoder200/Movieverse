import { useState } from "react";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? <Login toggle={() => setIsLogin(false)} /> : <Signup toggle={() => setIsLogin(true)} />;
}

export default App;
