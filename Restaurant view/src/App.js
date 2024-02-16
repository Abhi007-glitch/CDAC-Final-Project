import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './Components/Dashboard';
import CurrentOrders from './Components/CurrentOrders';
import OrderAccepted from './Components/OrderAccepted';
import OrderCompleted from './Components/OrderCompleted';
import Menu from './Components/Menu';
import UserDetails from './Components/UserDetails';
import HomePage from './pages/HomePage';
// import DashboardPage from './pages/DashboardPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/current-orders" element={<CurrentOrders />} />
          <Route path="/order-accepted" element={<OrderAccepted/>} />
          <Route path="/order-completed" element={<OrderCompleted />} />
          <Route path="/menu" element={<Menu/>} />
          <Route path="/UserDetails" element={<UserDetails />} />
       
      </Routes>
    </Router>
  );
};

export default App;
