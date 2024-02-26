import React, { useState } from "react";
import axios from "../utils/axios";
import Navbar from "../components/LandingPage/Navbar";
import { useDispatch } from "react-redux";
import { setRestaurantView } from "../Redux/Slices/restaurantViewSlice";

const REGISTER_URL = "/restaurant/new";

const RegisterPage = () => {

  const [formData, setFormData] = useState({
    restName: "",
    restEmail: "",
    restPassword: "",
    restAddr: "",
    restContact: "",
    restImage: null,
    restUPIID: "",
    restOpeningTime: "",
    restClosingTime: "",
    cuisine: "",
  });

  const handleChange = (e) => {

    let draftForm = {
      ...formData,
     [e.target.name] : e.target.value
    }
    setFormData(draftForm)


  };

  const handleSubmit = async (e) => {

    e.preventDefault();
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

    } catch (err) {
      if(err){
        console.log("error",err);
      }
    }

  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Restaurant Information
        </h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto border p-8">
          {/* Restaurant Name */}
          <div className="mb-4">
            <label
              htmlFor="restName"
              className="block text-sm font-medium text-gray-600"
            >
              Restaurant Name
            </label>
            <input
            
              type="text"
              id="restName"
              name="restName"
              value={formData.restName}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="restEmail"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="restEmail"
              name="restEmail"
              value={formData.restEmail}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="restPassword"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="restPassword"
              name="restPassword"
              value={formData.restPassword}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label
              htmlFor="restAddr"
              className="block text-sm font-medium text-gray-600"
            >
              Address
            </label>
            <textarea
              id="restAddr"
              name="restAddr"
              value={formData.restAddr}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* Contact Number */}
          <div className="mb-4">
            <label
              htmlFor="restContact"
              className="block text-sm font-medium text-gray-600"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="restContact"
              name="restContact"
              value={formData.restContact}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* UPI ID */}
          <div className="mb-4">
            <label
              htmlFor="restUPIID"
              className="block text-sm font-medium text-gray-600"
            >
              UPI ID
            </label>
            <input
              type="text"
              id="restUPIID"
              name="restUPIID"
              value={formData.restUPIID}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* Opening Time */}
          <div className="mb-4">
            <label
              htmlFor="restOpeningTime"
              className="block text-sm font-medium text-gray-600"
            >
              Opening Time
            </label>
            <input
              type="time"
              id="restOpeningTime"
              name="restOpeningTime"
              value={formData.restOpeningTime}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* Closing Time */}
          <div className="mb-4">
            <label
              htmlFor="restClosingTime"
              className="block text-sm font-medium text-gray-600"
            >
              Closing Time
            </label>
            <input
              type="time"
              id="restClosingTime"
              name="restClosingTime"
              value={formData.restClosingTime}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* Cuisine */}
          <div className="mb-4">
            <label
              htmlFor="cuisine"
              className="block text-sm font-medium text-gray-600"
            >
              Cuisine
            </label>
            <input
              type="text"
              id="cuisine"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* Restaurant Image */}
          <div className="mb-4">
            <label
              htmlFor="restImage"
              className="block text-sm font-medium text-gray-600"
            >
              Restaurant Image
            </label>
            <input
              type="file"
              id="restImage"
              name="restImage"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
