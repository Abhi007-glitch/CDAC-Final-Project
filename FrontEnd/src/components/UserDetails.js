import React, { useState, useEffect } from "react";
import UpdateForm from "./UpdateForm"; // Update the path accordingly
import Navbar from "./Navbar";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);

  // Dummy data to display while fetching from API
  const dummyData = {
    restaurantName: "Sample Restaurant",
    address: "123 Main St, City",
    openingTime: "9:00 AM",
    closingTime: "10:00 PM",
    username: "sampleuser",
    password: "********",
    ownerName: "John Doe",
    contactNumber: "123-456-7890",
  };

  useEffect(() => {
    // Mock API endpoint for user details
    const apiUrl = "https://example.com/api/userDetails";

    // Simulating a delay to mimic API request
    const fetchData = async () => {
      try {
        // Simulate fetching data from the API
        // In a real-world scenario, replace this with the actual fetch logic
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setUserDetails(dummyData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = (updatedDetails) => {
    // Update logic (e.g., make API call to update details)
    console.log("Updated details:", updatedDetails);
    // You can implement the logic to update the data on the backend here
  };

  const handleUpdateButtonClick = () => {
    setUpdateFormOpen(true);
  };

  const handleFormClose = () => {
    setUpdateFormOpen(false);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex ">
        <div className="max-w-md mx-auto p-4 border rounded shadow-lg mt-8">
          {userDetails ? (
            <>
              <h1 className="text-2xl font-bold mb-4 text-center">
                User Details
              </h1>
              <div className="mb-4">
                <strong>Restaurant Name:</strong> {userDetails.restaurantName}
              </div>
              <div className="mb-4">
                <strong>Address:</strong> {userDetails.address}
              </div>
              <div className="mb-4">
                <strong>Opening Time:</strong> {userDetails.openingTime}
              </div>
              <div className="mb-4">
                <strong>Closing Time:</strong> {userDetails.closingTime}
              </div>
              <div className="mb-4">
                <strong>Username:</strong> {userDetails.username}
              </div>
              <div className="mb-4">
                <strong>Password:</strong> {userDetails.password}
              </div>
              <div className="mb-4">
                <strong>Owner Name:</strong> {userDetails.ownerName}
              </div>
              <div className="mb-4">
                <strong>Contact Number:</strong> {userDetails.contactNumber}
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
                onClick={handleUpdateButtonClick}
              >
                Update Info
              </button>
            </>
          ) : (
            <p>Loading user details...</p>
          )}
        </div>
        <div className=" mx-auto">
          {isUpdateFormOpen && (
            <UpdateForm
              userDetails={userDetails}
              onUpdate={handleUpdate}
              onClose={handleFormClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
