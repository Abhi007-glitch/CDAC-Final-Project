import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/LandingPage/Navbar';
import Footer from '../Components/LandingPage/Footer';

const LandingPage = () => {
  return (
    <div>
    <div className="bg-gray-100 mid-h-screen flex flex-col items-center justify-center ">
      <Navbar />

      {/* First Section */}
      <div  className="bg-white pl-10 pr-10 pt-10 pb-10 rounded-lg shadow-md w-full md:w-2/3 lg:w-60% mb-8 mt-4">
     
        <h1 className="text-4xl mb-4 font-semibold">Partner with Us <br /> at 0% commission for the 1st month!</h1>
        <h6 className="text-2xl">And get ads worth INR 1500. Valid for new restaurant partners in select cities.</h6>
        <br />
  
        <div className="flex justify-between">
          <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Register Your New Restaurant
          </Link>
        
          <Link to="/login" className="bg-green-500 text-black px-4 py-2 rounded-md">
            View Your Existing Restaurant
          </Link>
        </div>
      </div>





      {/* Second Section */}
      <div id='documents' className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-60% mb-8 mt-4">
        <h2 className="text-3xl mb-4 text-center">Get started with online ordering</h2>
        <p className="mb-3 text-center">Please keep the documents ready for a smooth signup:</p>
        <ul className="list-disc pl-20 pr-20 m-4 flex justify-between">
          <div>
            <li>FSSAI license</li>
            <li>PAN card</li>
            <li>Regular GSTIN </li>
          </div>
          <div>
            <li>Bank account details</li>
            <li>Your restaurant menu</li>
            <li>Dish images for top 5 items</li>
          </div>
        </ul>
   
      </div>


      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-60% mb-8">
        <h1  className="text-2xl  mb-4 text-center">How it works?</h1>
        <div className="flex justify-between">
          <div className="w-full md:w-1/3 mb-4 md:mb-0 border text-center p-2 m-2">
            <h3 className="text-xl font-bold mb-2">Step 1</h3>
            <p>Create your page on our website</p>
            <p>Help users discover your place.</p>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0 border text-center p-2 m-2">
            <h3 className="text-xl font-bold mb-2 ">Step 2</h3>
            <p>Register for online ordering</p>
            <p>And deliver orders to millions of customers with ease.</p>
          </div>
          <div className="w-full md:w-1/3 border text-center p-2 m-2">
            <h3 className="text-xl font-bold mb-2">Step 3</h3>
            <p>Start receiving orders online</p>
            <p>Manage orders on our web dashboard.</p>
  
          </div>
        </div>

        </div>

    
    </div>
    <Footer></Footer>
    </div>
  );
};

export default LandingPage;
