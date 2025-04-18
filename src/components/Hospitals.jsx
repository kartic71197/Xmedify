import React, { useState } from "react";
import dayjs from "dayjs";
import BookingSlot from "./BookingSlot";

const timeSlots = {
  Morning: generateTimeSlots("08:00", "12:00"),
  Afternoon: generateTimeSlots("12:00", "16:00"),
  Evening: generateTimeSlots("16:00", "20:00"),
};

function generateTimeSlots(start, end) {
  const startTime = dayjs()
    .hour(parseInt(start))
    .minute(parseInt(start.split(":")[1]));
  const endTime = dayjs()
    .hour(parseInt(end))
    .minute(parseInt(end.split(":")[1]));
  const slots = [];

  let time = startTime;
  while (time.isBefore(endTime)) {
    slots.push(time.format("h:mm A"));
    time = time.add(30, "minute");
  }

  return slots;
}

const Hospitals = ({ data }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  const dates = Array.from({ length: 7 }, (_, i) =>
    dayjs().add(i, "day").format("MMM D")
  );

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="border rounded-lg p-3">
      <h3 className="font-semibold text-blue-500">{data["Hospital Name"]}</h3>
      <button
        onClick={toggleDropdown}
        className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
      >
        Book FREE Center Visit
      </button>

      {showDropdown && (
        <div className="mt-4 border p-3 rounded bg-gray-100">
          {/* Top Date Navigation */}
          {dates.map((date, index) => {
            return (
              <button
                key={index}
                onClick={() => setSelectedDateIndex(index)}
                className={`px-3 py-1 rounded ${
                  index === selectedDateIndex
                    ? "bg-blue-600 text-white"
                    : "bg-white border"
                }`}
              >
                {index === 0 ? <p>Today</p> : <p>{date}</p>}
              </button>
            );
          })}

          {/* Time Slot Table */}
          <BookingSlot
            date={dates[selectedDateIndex]}
            timeSlots={timeSlots}
            hospital={data}
          />
        </div>
      )}
    </div>
  );
};

export default Hospitals;
