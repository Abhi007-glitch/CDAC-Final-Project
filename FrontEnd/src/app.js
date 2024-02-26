import React, { lazy, Suspense ,useState} from "react"
import  ReactDOM  from "react-dom/client"
import Header from "./components/Header"
import Body from "./components/Body"
import {createBrowserRouter,Outlet,Route,RouterProvider, Routes} from 'react-router-dom';
import * as obj from "./components/Header";

import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Contact from "./components/Contact";
import OfferComponent from "./components/Offers";
import Cart from "./components/Cart"

import { Provider } from "react-redux";
import store from "./Redux/store"
import LocationContext from "./ContextAPi/Location";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./components/Dashboard";
import CurrentOrders from "./components/CurrentOrders";
import OrderAccepted from "./components/OrderAccepted";
import OrderCompleted from "./components/OrderCompleted";
import Menu from "./components/Menu";
import UserDetails from "./components/UserDetails";
import { AuthProvider } from "./ContextAPi/AuthProvider";
import App1 from "./App1";

const Tittle  = obj.Logo; // after export default we can rename any componet (either name exported or named exported)


 const About = lazy(()=>import("./components/About"));



const footer = <div><h1>footer</h1></div>


const LayoutComponent = ()=>{

const [longitude, setLongitude]= useState(73.8567437);
const [latitude,setLatitude] = useState(18.5204303);
const [location_name,setLocation]= useState('pune');
const [page, setPage]= useState(1);  
const locationContextValue = {longitude,latitude,setLatitude,setLongitude,location_name,setLocation,page, setPage}; // Location Context value
  


    return (
    <div className=" flex-col justify-center items-center h-screen ">
       <LocationContext.Provider value={locationContextValue}>
       <Provider store={store}>
       <AuthProvider>
       
        <Routes>
            <Route path="/*" element={<App1/>}/>
        </Routes>
       </AuthProvider>
       </Provider>
       </LocationContext.Provider>
       
    </div> )
};


// defining and configuring router

const appRouter = createBrowserRouter([
    {
        path:"/*",
        element:<LayoutComponent/>,
        errorElement:<Error/> ,  // defining an Error element which will be displayed if any error in route occurs
        

    //     children:[
    //      {
    //          path:"/",
    //          element:<Body/>
    //      },   
    //     {
    //         path:"/about",
    //         element:<Suspense fallback={<h1>Loading...</h1>}>
            
    //         <About />
    //         {/* <Routes>
    //         <Route path="/" element={<HomePage />} />
    //           <Route path="/register" element={<RegisterPage />} />
    //           <Route path="/login" element={<LoginPage />} />
    //           <Route path="/dashboard" element={<Dashboard />} />
    //           <Route path="/current-orders" element={<CurrentOrders />} />
    //           <Route path="/order-accepted" element={<OrderAccepted/>} />
    //           <Route path="/order-completed" element={<OrderCompleted />} />
    //           <Route path="/menu" element={<Menu/>} />
    //           <Route path="/UserDetails" element={<UserDetails />} />
    //       </Routes>
    //     */}
    //       </Suspense>
    //     },

    //     {
    //         path:"/restaurantHomePage", // homepage
    //         element:<HomePage />
    //     },
    //     {
    //         path:"/register",
    //         element:<RegisterPage />
    //     },
    //     {
    //         path:"/login",
    //         element:<LoginPage />
    //     },
    //     {
    //         path:"/dashboard",
    //         element:<Dashboard />
    //     },
    //     {
    //         path:"/current-orders" ,
    //         element:<CurrentOrders />
    //     },
    //     {
    //         path:"/order-accepted",
    //         element:<OrderAccepted/>
    //     },
    //     {
    //         path:"/order-completed",
    //         element:<OrderCompleted />
    //     },
    //     {
    //         path:"/menu",
    //         element:<Menu />
    //     },
    //     {
    //         path:"/UserDetails",
    //         element:<UserDetails />
    //     },
    //     {
    //         path:"/offer",
    //         element:<OfferComponent/>
    //     },
    //     {
    //         path:"/restaurant/:id",
    //         element:<RestaurantMenu/>
    //     },
    //     {
    //         path:"/cart",
    //         element:<Cart/>
    //     }
    // ] //listing different component that can be rendered inside this LayOutComponent(having constant header and footer Component) based on route


    },
    
]);


const root = ReactDOM.createRoot(document.querySelector("#root"));


//providing or implementing defined router in our Application
root.render(<RouterProvider router={appRouter} />)