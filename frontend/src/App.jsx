import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authProvider as AuthProvider } from "./context/authContext.jsx";
import Landing from "./pages/Landing.jsx";
import Auth from "./pages/Auth.jsx";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}