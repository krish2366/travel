import React, { useState } from "react";
import { BrowserRouter as Router, Routes , Route} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Trips from "./pages/Trips";
import TripDetails from "./pages/TripDetail";
import BookingPage from "./pages/BookingPage";
import Dashboard from "./pages/Dashboard";
import OAuthCallback from "./pages/OAuthCallback";
import MyBookings from "./pages/MyBookings";
import NotFound from "./pages/NotFound";
import AddTrip from "./pages/AddTrip";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="/" element={<Dashboard />} />


        <Route path="/addtrip" element={<AddTrip />} />

        
        <Route path="/trips" element={<Trips />} />
        <Route path="/tripdetails" element={<TripDetails />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/mybookings" element={<MyBookings />} />



        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
