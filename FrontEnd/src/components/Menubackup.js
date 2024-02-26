import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import AddMenuForm from './AddMenuForm';
import EditMenuForm from './EditMenuForm';
import { useSelector } from "react-redux";

const Menu = () => {

const restId = useSelector((store) => store.restaurantView.restId);
  

  const [menuItems, setMenuItems] = useState([]);
  // const [isAddFormOpen, setAddFormOpen] = useState(false);
  // const [isEditFormOpen, setEditFormOpen] = useState(false);
  // const [editedItemId, setEditedItemId] = useState(null);

  useEffect(() => {
    // Fetch menu items from the backend API
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`item/allitems/${restId}`);

      if (!response.data || response.data.length === 0) {
        console.log('No menu items available.');
        return;
      }

      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error.message);
    }
  };

  const handleAddNewMenu = async (newMenuItem) => {
    try {
      const response = await axios.post('https://your-backend-api.com/api/menu', newMenuItem);

      setMenuItems((prevMenuItems) => [...prevMenuItems, response.data]);
      setAddFormOpen(false);
    } catch (error) {
      console.error('Error adding new menu item:', error.message);
    }
  };

  const handleEditMenu = (itemId) => {
    setEditedItemId(itemId);
    setEditFormOpen(true);
  };

  const handleUpdateMenu = async (editedMenuItem) => {
    try {
      const response = await axios.put(
        `https://your-backend-api.com/api/menu/${editedItemId}`,
        editedMenuItem
      );

      setMenuItems((prevMenuItems) =>
        prevMenuItems.map((item) => (item.id === editedItemId ? response.data : item))
      );

      setEditedItemId(null);
      setEditFormOpen(false);
    } catch (error) {
      console.error('Error updating menu item:', error.message);
    }
  };

  const handleCancelEditForm = () => {
    setEditedItemId(null);
    setEditFormOpen(false);
  };

  const handleRemoveMenu = async (itemId) => {
    try {
      await axios.delete(`https://your-backend-api.com/api/menu/${itemId}`);

      setMenuItems((prevMenuItems) => prevMenuItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error removing menu item:', error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <div className="flex justify-around items-center mb-4">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
            onClick={() => {
              setAddFormOpen(true);
              setEditedItemId(null);
            }}
          >
            Add New Menu
          </button>
        </div>

        {menuItems.length > 0 ? (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {menuItems.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.price}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleEditMenu(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleRemoveMenu(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No menu items available.</p>
        )}
      </div>

      {isAddFormOpen && <AddMenuForm onSubmit={handleAddNewMenu} onCancel={() => setAddFormOpen(false)} />}
      {isEditFormOpen && (
        <EditMenuForm
          onSubmit={handleUpdateMenu}
          onCancel={handleCancelEditForm}
          editedItem={editedItemId}
        />
      )}
    </div>
  );
};

export default Menu;
