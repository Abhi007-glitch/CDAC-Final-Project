import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Body from "./components/Body";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import RestaurantMenu from "./components/RestaurantMenu";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./components/Dashboard";
import CurrentOrders from "./components/CurrentOrders";
import OrderAccepted from "./components/OrderAccepted";
import OrderCompleted from "./components/OrderCompleted";
import UserDetails from "./components/UserDetails";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import RequireAuth from "./utils/RequireAuth";
import SignUp from "./components/SignUp";

const About = lazy(() => import("./components/About"));

const App1 = () => {
  return (
   
    <Routes>
      {/* The all the childrens of below route will be routing of childrens of Layout (layout contains Outlet which can serve anyof these children as per route)*/}
      <Route path="/" element={<Layout />}>
        {/* public route */}
        <Route path="/" element={<Body />} />
        <Route
          path="/about"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <About />
            </Suspense>
          }
        />
        <Route path="/restaurants/homePage" element={<HomePage />} />
        <Route path="/restaurants/login" element={<LoginPage />} />
        <Route path="/restaurants/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restaurant/:id" element={<RestaurantMenu />} />
        <Route path="/signUp" element={<SignUp />} />
      
      
        {/* Protected route */}
        {/* Enclosing all the protected routes by RequireAuth */}

        {/* <Route element={<RequireAuth />}> */}
          <Route path="/restaurant/dashboard" element={<Dashboard />} />
          <Route
            path="/restaurant/current-orders"
            element={<CurrentOrders />}
          />
         <Route
            path="/restaurant/order-completed"
            element={<OrderCompleted />}
          />
          <Route path="/restaurant/UserDetails" element={<UserDetails />} />
          <Route path="/restaurant/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
        {/* </Route> */}


        catch all route
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default App1;
