import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const CurrentOrders = () => {
  const [currentOrders, setCurrentOrders] = useState([]);

  useEffect(() => {
    // Fetch current orders from the backend API
    // Example: fetch('/api/current-orders').then(response => response.json()).then(data => setCurrentOrders(data));
    // Replace the placeholder API call with your actual API call
    const sampleData = [
      {
        id: 1,
        orderDetails: "Burger, Fries",
        customer: "John Doe",
        total: 15.99,
      },
      {
        id: 2,
        orderDetails: "Pizza, Salad",
        customer: "Jane Doe",
        total: 22.5,
      },
      // Add more sample data or replace it with actual data from your API
    ];
    setCurrentOrders(sampleData);
  }, []);

  const handleRejectOrder = (orderId) => {
    // Handle reject logic (e.g., make API call to update order status)
    console.log(`Order ${orderId} rejected`);
  };

  const handleAcceptOrder = (orderId) => {
    // Handle accept logic (e.g., make API call to update order status)
    console.log(`Order ${orderId} accepted`);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Current Orders</h2>
        {currentOrders.length > 0 ? (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Order ID</th>
                <th className="border border-gray-300 px-4 py-2">
                  Order Details
                </th>
                <th className="border border-gray-300 px-4 py-2">Customer</th>
                <th className="border border-gray-300 px-4 py-2">
                  Total Amount
                </th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.orderDetails}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.customer}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.total}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleRejectOrder(order.id)}
                    >
                      Reject
                    </button>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleAcceptOrder(order.id)}
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No current orders available.</p>
        )}
      </div>
    </div>
  );
};

export default CurrentOrders;
