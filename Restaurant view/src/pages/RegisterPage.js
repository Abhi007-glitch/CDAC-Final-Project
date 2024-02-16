import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/LandingPage/Navbar';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    ownerName: '',
    contactNumber: '',
    restaurantName: '',
    openingTime: '',
    closingTime: '',
    address: '',
    pancard: null,
    licenseCopy: null,
    menus: [
      { name: '', price: '', image: null },
      { name: '', price: '', image: null },
      { name: '', price: '', image: null },
    ],
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name.startsWith('menu')) {
      const menuNumber = name.charAt(4);
      const menuField = name.slice(6); 

      setFormData((prevData) => ({
        ...prevData,
        menus: prevData.menus.map((menu, index) =>
          index === parseInt(menuNumber) - 1
            ? { ...menu, [menuField]: type === 'file' ? files[0] : value }
            : menu
        ),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'file' ? files[0] : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    for (const key in formData) {
      if (key === 'menus') {
        formData[key].forEach((menu, index) => {
          formDataObj.append(`menu${index + 1}Name`, menu.name);
          formDataObj.append(`menu${index + 1}Price`, menu.price);
          formDataObj.append(`menu${index + 1}Image`, menu.image);
        });
      } else {
        formDataObj.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('YOUR_BACKEND_ENDPOINT', formDataObj);
      console.log(response.data);
      console.log('Registration successful!');
    } catch (error) {
      console.error('Error during registration:', error);
      console.error('Registration failed.');
    }
  };

  return (
    <div>   <Navbar />
    <div className="container mx-auto">
   
      <h2 className="text-3xl font-bold mb-6 text-center">Restaurant Information</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto border p-8">
  
        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Restaurant Name */}
        <div className="mb-4">
          <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-600">
            Restaurant Name
          </label>
          <input
            type="text"
            id="restaurantName"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
           {/* Address */}
           <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-600">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>


        {/* Opening Time */}
        <div className="mb-4">
          <label htmlFor="openingTime" className="block text-sm font-medium text-gray-600">
            Opening Time
          </label>
          <input
            type="time"
            id="openingTime"
            name="openingTime"
            value={formData.openingTime}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Closing Time */}
        <div className="mb-4">
          <label htmlFor="closingTime" className="block text-sm font-medium text-gray-600">
            Closing Time
          </label>
          <input
            type="time"
            id="closingTime"
            name="closingTime"
            value={formData.closingTime}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
 {/* Restaurant Owner Name */}
 <div className="mb-4">
          <label htmlFor="ownerName" className="block text-sm font-medium text-gray-600">
            Restaurant Owner Name
          </label>
          <input
            type="text"
            id="ownerName"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Contact Number */}
        <div className="mb-4">
          <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-600">
            Contact Number
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
     
        {/* Pancard Image */}
        <div className="mb-4">
          <label htmlFor="pancard" className="block text-sm font-medium text-gray-600">
            Pancard (Image)
          </label>
          <input
            type="file"
            id="pancard"
            name="pancard"
            accept="image/*"
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* License Copy Image */}
        <div className="mb-4">
          <label htmlFor="licenseCopy" className="block text-sm font-medium text-gray-600">
            License Copy (Image)
          </label>
          <input
            type="file"
            id="licenseCopy"
            name="licenseCopy"
            accept="image/*"
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

       

       {/* Menu Sections */}
       {formData.menus.map((menu, index) => (
            <div key={index}>
              {/* Menu Name */}
              <div className="mb-4">
                <label htmlFor={`menu${index + 1}Name`} className="block text-sm font-medium text-gray-600">
                  Menu {index + 1} Name
                </label>
                <input
                  type="text"
                  id={`menu${index + 1}Name`}
                  name={`menu${index + 1}Name`}
                  value={menu.name}
                  onChange={(e) => handleChange({ target: { name: `menu${index + 1}Name`, value: e.target.value } })}
                  required
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              {/* Menu Price */}
              <div className="mb-4">
                <label htmlFor={`menu${index + 1}Price`} className="block text-sm font-medium text-gray-600">
                  Menu {index + 1} Price
                </label>
                <input
                  type="text"
                  id={`menu${index + 1}Price`}
                  name={`menu${index + 1}Price`}
                  value={menu.price}
                  onChange={(e) => handleChange({ target: { name: `menu${index + 1}Price`, value: e.target.value } })}
                  required
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              {/* Menu Image (File) */}
              <div className="mb-4">
                <label htmlFor={`menu${index + 1}Image`} className="block text-sm font-medium text-gray-600">
                  Menu {index + 1} Image (File)
                </label>
                <input
                  type="file"
                  id={`menu${index + 1}Image`}
                  name={`menu${index + 1}Image`}
                  accept="image/*"
                  onChange={(e) =>
                    handleChange({ target: { name: `menu${index + 1}Image`, files: e.target.files } })
                  }
                  required
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </div>
          ))}

        {/* ... (existing code) */}

        {/* Submit Button */}
        <div className="mb-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Register
          </button>
        </div>
      </form>
    </div></div>
  );
};

export default RegisterPage;
