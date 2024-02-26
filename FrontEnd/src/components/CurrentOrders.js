import React, { useState, useEffect } from 'react';
import axios from "../utils/axios";
import Navbar from './Navbar';

const ALL_ORDER_URL = "/restaurant/current-orders";

const CurrentOrders = () => {
  const [acceptedOrders, setAcceptedOrders] = useState([]);

  useEffect(() => {
    const fetchAcceptedOrders = async () => {
      try {
        const response = await axios.get("/restaurant/current-orders");

        if (!response.data || response.data.length === 0) {
          console.log('No accepted orders available.');
          return;
        }

        setAcceptedOrders(response.data);
      } catch (error) {
        console.error('Error fetching accepted orders:', error.message);
      }
    };

    fetchAcceptedOrders();
  }, []);

  const handleCompleteOrder = async (orderId) => {
    try {
      const response = await axios.put(`https://your-backend-api.com/orders/${orderId}/complete`);

      if (!response.data || response.data.status !== 'completed') {
        throw new Error(`Failed to complete order ${orderId}`);
      }

      // Remove the completed order from the accepted orders list
      setAcceptedOrders((prevAcceptedOrders) =>
        prevAcceptedOrders.filter((order) => order.id !== orderId)
      );

      console.log(`Order ${orderId} completed successfully`);
    } catch (error) {
      console.error('Error completing order:', error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Current Orders</h2>
        {acceptedOrders.length > 0 ? (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Order ID</th>
                <th className="border border-gray-300 px-4 py-2">Item Name</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {acceptedOrders.map((order) => (
                <tr key={order.id}>
                  <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.itemName}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
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
      </div>
    </div>
  );
};

export default CurrentOrders;
