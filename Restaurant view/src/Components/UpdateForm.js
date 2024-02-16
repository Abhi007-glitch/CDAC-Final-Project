import React, { useState } from 'react';

const UpdateForm = ({ userDetails, onUpdate, onClose }) => {
  const [updatedDetails, setUpdatedDetails] = useState({ ...userDetails });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    onUpdate(updatedDetails);
    onClose();
  };

  return (
    <div className="max-w-md mx-auto px-16 py-4 border rounded shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Update User Details</h2>

      {/* Example of a reusable input component */}
      {[
        { label: 'Restaurant Name', name: 'restaurantName' },
        { label: 'Address', name: 'address' },
        { label: 'Opening Time', name: 'openingTime' },
        { label: 'Closing Time', name: 'closingTime' },
        { label: 'Username', name: 'username' },
        { label: 'Password', name: 'password', type: 'password' },
        { label: 'Owner Name', name: 'ownerName' },
        { label: 'Contact Number', name: 'contactNumber' },
      ].map(({ label, name, type = 'text' }) => (
        <div key={name} className="mb-4">
          <label htmlFor={name} className="block text-sm font-medium text-gray-600">
            {label}:
          </label>
          <input
            type={type}
            id={name}
            name={name}
            value={updatedDetails[name]}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
      ))}

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none mr-2"
        onClick={handleUpdate}
      >
        Update
      </button>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded focus:outline-none"
        onClick={onClose}
      >
        Cancel
      </button>
    </div>
  );
};

export default UpdateForm;
