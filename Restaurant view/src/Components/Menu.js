import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import AddMenuForm from './AddMenuForm';
import EditMenuForm from './EditMenuForm';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isAddFormOpen, setAddFormOpen] = useState(false);
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const [editedItemId, setEditedItemId] = useState(null);

  useEffect(() => {
    // Fetch menu items from the backend API
    fetchMenuItems();
  }, []);

  

  const fetchMenuItems = () => {
    // fetch('/api/menu')
    //   .then(response => response.json())
    //   .then(data => setMenuItems(data))
    //   .catch(error => console.error('Error fetching menu items:', error));

      const sampleData = [
        { id: 1, name: 'Cheeseburger', price: 8.99 },
        { id: 2, name: 'Margherita Pizza', price: 12.50 },
        { id: 3, name: 'Chicken Alfredo Pasta', price: 15.99 },
        { id: 4, name: 'Caesar Salad', price: 7.50 },
        { id: 5, name: 'Chocolate Brownie', price: 5.99 },
      ];

      setMenuItems(sampleData);
  };

  const handleAddNewMenu = (newMenuItem) => {
    // Add new menu item logic (make API call to add new menu item)

    // fetch('/api/menu', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(newMenuItem),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     setMenuItems(prevMenuItems => [...prevMenuItems, data]);
    //     setAddFormOpen(false);
    //   })
    //   .catch(error => console.error('Error adding new menu item:', error));



    const newItem = { id: menuItems.length + 1, ...newMenuItem };
    setMenuItems((prevMenuItems) => [...prevMenuItems, newItem]);
    setAddFormOpen(false);






  };

  const handleEditMenu = (itemId) => {
    // Set the item to edit and open the edit form
    setEditedItemId(itemId);
    setEditFormOpen(true);
  };

  const handleUpdateMenu = (editedMenuItem) => {
    // Update the menu item in the backend (make API call) and update state
    fetch(`/api/menu/${editedItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedMenuItem),
    })
      .then(response => response.json())
      .then(data => {
        setMenuItems(prevMenuItems =>
          prevMenuItems.map(item => (item.id === editedItemId ? data : item))
        );
        setEditedItemId(null);
        setEditFormOpen(false);
      })
      .catch(error => console.error('Error updating menu item:', error));
  };

  const handleCancelEditForm = () => {
    setEditedItemId(null);
    setEditFormOpen(false);
  };

  const handleRemoveMenu = (itemId) => {
    // Remove the menu item from the backend (make API call) and update state
    fetch(`/api/menu/${itemId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setMenuItems(prevMenuItems => prevMenuItems.filter(item => item.id !== itemId));
      })
      .catch(error => console.error('Error removing menu item:', error));
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
