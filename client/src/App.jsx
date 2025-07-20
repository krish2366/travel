import React, { useState } from "react";
import { BrowserRouter as Router, Routes , Route} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Trips from "./pages/Trips";
import TripDetails from "./pages/TripDetail";
import BookingPage from "./pages/BookingPage";
import Dashboard from "./pages/Dashboard";
import OAuthCallback from "./pages/OAuthCallback";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/tripdetails" element={<TripDetails />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />

      </Routes>
    </Router>
  );
}

export default App;
