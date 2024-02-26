import React, { useState } from "react";

import Navbar from "../components/LandingPage/Navbar";

import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


const REGISTER_URL = "/restaurant/authenticate";


const LoginPage = () => {
  // const [useremail, setUseremail] = useState("");
  // const [password, setPassword] = useState("");
  // const navigate = useNavigate();
  const dispatch=useDispatch();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    useremail:"",
    password:""
  })

  const handleChange = (e) => {

    let draftForm = {
      ...formData,
     [e.target.name] : e.target.value
    }
    setFormData(draftForm)


  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the email and password
    // Authenticate the user and save the authentication token
    // Navigate to the dashboard page

    console.log(formData);

    
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify(
          formData
          ),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      

      console.log("Login response : ", response.data);
      localStorage.setItem("restObj",JSON.stringify(response.data));
      

      navigate("/restaurant/dashboard");
        
    } catch (err) {
      if(err){
        console.log("error",err);
      }
    }

  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2"
        >
          <h1 className="text-3xl font-bold mb-4">Login</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              name="useremail"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.useremail}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
