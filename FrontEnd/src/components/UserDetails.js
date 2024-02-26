import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
 // const restId = useSelector((store) => store.restaurantView.restId);
 const restObj = JSON.parse(localStorage.getItem("restObj"));
 const restId = restObj.id;
 const yourToken = restObj.token;
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        
        const response = await axios.get(`/restaurant/owndetails/${restId}`, {
          headers: {    Accept: 'application/json',
          "Content-Type" : 'application/json',  Authorization : `Bearer ${yourToken}` },
          withCredentials: true,
        });
        console.log("Data form userDetails : ", response);
        const data = response.data;
        setUserDetails(data);
       
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchUserDetails();
  }, []);

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
                <strong>ID:</strong> {userDetails.id}
              </div>
              <div className="mb-4">
                <strong>Restaurant Name:</strong> {userDetails.restName}
              </div>
              <div className="mb-4">
                <strong>Email:</strong> {userDetails.restEmail}
              </div>
              <div className="mb-4">
                <strong>Password:</strong> {userDetails.restPassword}
              </div>
              <div className="mb-4">
                <strong>Address:</strong> {userDetails.restAddr}
              </div>
              <div className="mb-4">
                <strong>Contact Number:</strong> {userDetails.restContact}
              </div>
              <div className="mb-4">
                <strong>UPI ID:</strong> {userDetails.restUPIID}
              </div>
              <div className="mb-4">
                <strong>Opening Time:</strong> {userDetails.restOpeningTime}
              </div>
              <div className="mb-4">
                <strong>Closing Time:</strong> {userDetails.restClosingTime}
              </div>
        
            </>
          ) : (
            <p>Loading user details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
