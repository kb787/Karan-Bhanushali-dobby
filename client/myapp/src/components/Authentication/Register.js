import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = async (e) => {
    try {
      e.preventDefault();
      if (!userName || !userEmail || !userPassword) {
        alert("Entering all fields is manadatory");
        setUserName("");
        setUserEmail("");
        setUserPassword("");
      }
      const response = await axios.post(
        "http://localhost:3500/v1/api/register-user",
        {
          userName: userName,
          userEmail: userEmail,
          userPassword: userPassword,
        }
      );
      if (response.data.success) {
        message.success("Registration successfull");
        navigate("/Login");
      } else {
        message.error("Email address already exists");
      }
    } catch (error) {
      message.error(`Unable to process the request due to error ${error}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="flex flex-col justify-center align-middle bg-slate-200 border-2  border-black p-5 rounded-xl h-5/6 pt-6 pb-6 pr-15 pl-15 w-96">
        <input
          type="text"
          value={userName}
          placeholder="Enter your username"
          className="border-2 border-black rounded-xl mb-4 p-2 text-xl w-35 h-13 mt-3"
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
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
          Register
        </button>
        <Link className="py-2.5 text-center text-lg" to="/Login">
          Already having an account ! Login Here
        </Link>
      </div>
    </div>
  );
};

export default Register;
