import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();

  const handleButtonClick = async () => {
    try {
      if (!userEmail || !userPassword) {
        alert("Entering all fields is mandatory");
      }
      const response = await axios.post(
        "http://localhost:3500/v1/api/login-user",
        {
          userEmail: userEmail,
          userPassword: userPassword,
        }
      );
      if (response.data.success) {
        message.success("Login Success");
        navigate("/Profile");
      } else {
        message.error("Invalid credentials");
      }
    } catch (error) {
      message.error(`Unable to perform your request due to error ${error}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col justify-center align-middle bg-slate-200 border-2 border-black p-5 rounded-xl  pt-6 pb-6 pr-15 pl-15 w-96 min-h-72">
        <p className="text-center text-2xl pb-4">Verify your credentials</p>
        <input
          type="email"
          value={userEmail}
          placeholder="Enter your email address"
          className="border-2 border-black rounded-xl mb-4 p-2 text-xl w-35 h-13"
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          value={userPassword}
          placeholder="Enter your password"
          className="border-2 border-black rounded-xl p-2 text-xl w-35 h-13"
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <br />
        <button
          className="bg-blue-500 rounded-md w-28 h-12 text-xl text-white flex justify-center items-center mx-auto"
          onClick={handleButtonClick}
        >
          Login
        </button>
        <Link className="py-2.5 text-center text-lg" to="/Register">
          Not having an account ! Register First
        </Link>
      </div>
    </div>
  );
};

export default Login;
