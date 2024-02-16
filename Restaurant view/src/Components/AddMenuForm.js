import React, { useState } from 'react';

const AddMenuForm = ({ onAddMenu, onCancel }) => {
  const [newMenu, setNewMenu] = useState({
    name: '',
    price: '',
    image: null, // store the image file
    cousins: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenu((prevMenu) => ({
      ...prevMenu,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setNewMenu((prevMenu) => ({
      ...prevMenu,
      image: imageFile,
    }));
  };

  const handleAddMenu = () => {
    // Additional validation or API call can be added here
    onAddMenu(newMenu);
    onCancel();
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-lg mt-4">
      <h2 className="text-lg font-semibold mb-4">Add New Menu</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
          Menu Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={newMenu.name}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-600">
          Price:
        </label>
        <input
          type="text"
          id="price"
          name="price"
          value={newMenu.price}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium text-gray-600">
          Image:
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="cousins" className="block text-sm font-medium text-gray-600">
          Cousins:
        </label>
        <input
          type="text"
          id="cousins"
          name="cousins"
          value={newMenu.cousins}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none mr-2"
        onClick={handleAddMenu}
      >
        Add Menu
      </button>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded focus:outline-none"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default AddMenuForm;
