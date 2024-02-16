import React, { useState, useEffect } from 'react';

const EditMenuForm = ({ onSubmit, onCancel, editedItem }) => {
  const [editedName, setEditedName] = useState('');
  const [editedPrice, setEditedPrice] = useState('');

  useEffect(() => {
    // Fetch the menu item details from the backend API based on the editedItem ID
    // Example: fetch(`/api/menu/${editedItem}`).then(response => response.json()).then(data => setEditedName(data.name), setEditedPrice(data.price));
    // Replace the placeholder API call with your actual API call

    // Sample data for testing
    const sampleData = { name: 'Initial Name', price: 0.0 };
    setEditedName(sampleData.name);
    setEditedPrice(sampleData.price);
  }, [editedItem]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the edited data if needed

    // Submit the edited data to the parent component
    onSubmit({ name: editedName, price: editedPrice });
  };

  return (
    <div className="fixed top-0 left-0 h-full w-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Edit Menu Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editedName">
              Name:
            </label>
            <input
              type="text"
              id="editedName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editedPrice">
              Price:
            </label>
            <input
              type="number"
              id="editedPrice"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={editedPrice}
              onChange={(e) => setEditedPrice(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenuForm;
