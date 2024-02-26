import React from "react";
import Footer from "../components/LandingPage/Footer";
import { useDispatch } from "react-redux";
import { setRestaurantView } from "../Redux/Slices/restaurantViewSlice";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white mt-[5%] ">
      <div className="relative isolate px-6 lg:px-8">
        {/* Rest of your content remains unchanged */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div className="mx-auto max-w-2xl  sm:pt-36 sm:pb-12 ">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Partner with Us at <br />
              0% commission
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              And get ads worth INR 1500. Valid for new restaurant partners in
              select cities.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/restaurants/register"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register your Restaurant
              </Link>
              <Link
                to="/restaurants/login"
                className="text-sm font-semibold leading-6 text-gray-900"
               
              >
                Already registerd<span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <hr />
        {/* Second Section */}
        <div id="documents" className="mx-auto max-w-2xl  sm:pt-12 sm:pb-12">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
            Get started with online ordering
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 text-center">
            Please keep the documents ready for a smooth signup:
          </p>
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
        <hr />

        <div className="bg-white p-8  w-full md:w-2/3 lg:w-60% mb-8 mx-auto max-w-2xl py-32 sm:py-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-8">
            How it works?
          </h1>
          <div className="flex justify-between">
            <div className="w-full md:w-1/3 mb-4 md:mb-0 border text-center p-2 m-2 relative">
              <div className="flex items-center justify-center py-6">
                <img
                  src="https://b.zmtcdn.com/merchant-onboarding/ecb5e086ee64a4b8b063011537be18171600699886.png"
                  alt="Step 1"
                  className="w-64px h-64px object-cover rounded-md mb-2"
                />
              </div>

              <h3 className="text-xl font-bold mb-2">Step 1</h3>
              <p>Create your page on our website</p>
              <p>Help users discover your place.</p>
            </div>
            <div className="w-full md:w-1/3 mb-4 md:mb-0 border text-center p-2 m-2 relative">
              <div className="flex items-center justify-center py-6">
                <img
                  src="https://b.zmtcdn.com/merchant-onboarding/71d998231fdaeb0bffe8ff5872edcde81600699935.png"
                  alt="Step 1"
                  className="w-64px h-64px object-cover rounded-md mb-2"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Step 2</h3>
              <p>Register for online ordering</p>
              <p>And deliver orders to millions of customers with ease.</p>
            </div>
            <div className="w-full md:w-1/3 border text-center p-2 m-2 relative">
              <div className="flex items-center justify-center py-6">
                <img
                  src="https://b.zmtcdn.com/merchant-onboarding/efdd6ac0cd160a46c97ad58d9bbd73fd1600699950.png"
                  alt="Step 1"
                  className="w-64px h-64px object-cover rounded-md mb-2"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Step 3</h3>
              <p>Start receiving orders online</p>
              <p>Manage orders on our web dashboard.</p>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
