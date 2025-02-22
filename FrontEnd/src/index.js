import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from './App';
import AuthProvider from "./ContextAPi/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App1";

const root = ReactDOM.createRoot(document.querySelector("#root"));
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
