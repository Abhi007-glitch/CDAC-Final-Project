import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const OrderAccepted = () => {
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    // Fetch accepted orders from the backend API
    // Example: fetch('/api/accepted-orders').then(response => response.json()).then(data => setAcceptedOrders(data));
    // Replace the placeholder API call with your actual API call
    const sampleData = [
      { id: 1, orderDetails: 'Sushi, Miso Soup', customer: 'Alice Smith', total: 30.50 },
      { id: 2, orderDetails: 'Steak, Garlic Bread', customer: 'Bob Johnson', total: 45.75 },
      // Add more sample data or replace it with actual data from your API
    ];
    setAcceptedOrders(sampleData);
  }, []);

  const handleCompleteOrder = (orderId) => {
    // Find the completed order
    const completedOrder = acceptedOrders.find(order => order.id === orderId);

    // Move the order to the completed orders table
    setCompletedOrders(prevCompletedOrders => [...prevCompletedOrders, completedOrder]);

    // Remove the order from the accepted orders table
    setAcceptedOrders(prevAcceptedOrders => prevAcceptedOrders.filter(order => order.id !== orderId));
  };

  return (
    <div>
      <Navbar></Navbar>
    
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Order Accepted</h2>
      {acceptedOrders.length > 0 ? (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">Order Details</th>
              <th className="border border-gray-300 px-4 py-2">Customer</th>
              <th className="border border-gray-300 px-4 py-2">Total Amount</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {acceptedOrders.map(order => (
              <tr key={order.id}>
                <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                <td className="border border-gray-300 px-4 py-2">{order.orderDetails}</td>
                <td className="border border-gray-300 px-4 py-2">{order.customer}</td>
                <td className="border border-gray-300 px-4 py-2">{order.total}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleCompleteOrder(order.id)}
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No accepted orders available.</p>
      )}

    </div></div>
  );
}

export default OrderAccepted;
