import React, { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import Navbar from '../components/Navbar';

const MyBookings = () => {
  const [bookings, setBooking] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('bookings');
    if (data) {
      setBooking(JSON.parse(data));
    }
  }, []);

  return (
    <>
      <Heading />
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
        <div className="space-y-4">
          {bookings.length > 0 ? (
            bookings.map((item, index) => (
              <div
                key={index}
                className="border p-4 rounded shadow bg-white"
              >
                <h3 className="font-semibold text-blue-600">{item["Hospital Name"]}</h3>
                <p className="text-sm text-gray-700">
                  {item.City}, {item.State}
                </p>
                <p className="text-sm">Booking Date: {item.bookingDate}</p>
                <p className="text-sm">Booking Time: {item.bookingTime}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No bookings yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyBookings;
