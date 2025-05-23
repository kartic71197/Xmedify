import React from "react";
import medifyLogo from "../assets/medify-logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-around px-4 py-4 px-2">
      <div className="flex items-center">
        <img src={medifyLogo} alt="Medify" className="h-8 w-auto" />
      </div>
      <div className="flex items-center justify-around space-x-8 text-black text-sm">
        {/* Example navigation items */}
        <Link to="/">
        <p className="hover:underline">
          Find Doctors
        </p>
        </Link>
        <a href="#" className="hover:underline">
          Hospitals
        </a>
        <a href="#" className="hover:underline">
          Medicines
        </a>
        <a href="#" className="hover:underline">
          Surgeries
        </a>
        <a href="#" className="hover:underline">
          Software for Provider
        </a>
        <a href="#" className="hover:underline">
          Facilities
        </a>
        <Link to="/my-bookings">
          <button className="p-3 bg-blue-500 text-white rounded-lg">
            My Bookings
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
