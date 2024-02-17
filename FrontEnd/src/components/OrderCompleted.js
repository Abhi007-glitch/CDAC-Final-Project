// OrderCompleted.js

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const OrderCompleted = () => {
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    // Fetch completed orders from the backend API
    // Example: fetch('/api/completed-orders').then(response => response.json()).then(data => setCompletedOrders(data));
    // Replace the placeholder API call with your actual API call
    const sampleData = [
      {
        id: 1,
        orderDetails: "Pasta, Tiramisu",
        customer: "Charlie Brown",
        total: 25.99,
      },
      {
        id: 2,
        orderDetails: "Fish and Chips",
        customer: "Lucy Williams",
        total: 18.5,
      },
      // Add more sample data or replace it with actual data from your API
    ];
    setCompletedOrders(sampleData);
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Order Completed</h2>
        {completedOrders.length > 0 ? (
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
              </tr>
            </thead>
            <tbody className="text-center">
              {completedOrders.map((order) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No completed orders available.</p>
        )}
      </div>
    </div>
  );
};

export default OrderCompleted;
