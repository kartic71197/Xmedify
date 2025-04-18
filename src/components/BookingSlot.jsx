import React, { useState } from "react";

const BookingSlot = ({ date, timeSlots, hospital }) => {
  const [selectedTime, setSelectedTime] = useState("");

  const createBooking = (time) => {
    setSelectedTime(time);

    const newBooking = {
      "Hospital Name": hospital["Hospital Name"],
      City: hospital["City"],
      State: hospital["State"],
      "Hospital Type": hospital["Hospital Type"],
      "Hospital overall rating": hospital["Hospital overall rating"],
      bookingDate: date,
      bookingTime: time,
    };

    // Get existing bookings
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Add new one
    const updatedBookings = [...existingBookings, newBooking];

    // Save back to localStorage
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.entries(timeSlots).map(([label, times]) => (
        <div key={label}>
          <p className="font-semibold mb-2">{label}</p>
          <div className="flex flex-wrap gap-2">
            {times.map((time, i) => (
              <div
                key={i}
                onClick={() => createBooking(time)}
                className={`border px-3 py-1 rounded text-sm cursor-pointer ${
                  selectedTime === time
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-blue-100"
                }`}
              >
                {time}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingSlot;
