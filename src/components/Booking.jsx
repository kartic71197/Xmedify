import React, { useEffect, useState } from "react";
import axios from "axios";
import Hospitals from "./Hospitals";

const Booking = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [results, setResults] = useState([]);
  const [showStates, setShowStates] = useState(false);
  const [showCities, setShowCities] = useState(false);

  useEffect(() => {
    axios
      .get("https://meddata-backend.onrender.com/states")
      .then((response) => setStates(response.data))
      .catch((err) => console.error("Error fetching states:", err));
  }, []);

  useEffect(() => {
    if (selectedState) {
      axios
        .get(`https://meddata-backend.onrender.com/cities/${selectedState}`)
        .then((response) => setCities(response.data))
        .catch((err) => console.error("Error fetching cities:", err));
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://meddata-backend.onrender.com/data?state=${selectedState}&city=${selectedCity}`
      );
      setResults(res.data);
    } catch (error) {
      console.error("Error fetching medical centers:", error);
    }
  };

  return (
    <div className="bg-white p-6 max-w-2xl mx-auto border rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Search Medical Centers</h1>
      <div className="flex flex-col gap-4">
        {/* State Dropdown */}
        <div id="state" className="relative">
          <label className="block mb-1 font-medium">Select State</label>
          <div
            className="border p-2 rounded cursor-pointer"
            onClick={() => setShowStates(!showStates)}
          >
            {selectedState || "-- Select State --"}
          </div>
          {showStates && (
            <ul className="absolute bg-white border w-full max-h-40 overflow-y-auto z-10">
              {states.map((state, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedState(state);
                    setSelectedCity("");
                    setShowStates(false);
                  }}
                >
                  {state}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* City Dropdown */}
        <div id="city" className="relative">
          <label className="block mb-1 font-medium">Select City</label>
          <div
            className="border p-2 rounded cursor-pointer"
            onClick={() => setShowCities(!showCities)}
          >
            {selectedCity || "-- Select City --"}
          </div>
          {showCities && (
            <ul className="absolute bg-white border w-full max-h-40 overflow-y-auto z-10">
              {cities.map((city, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedCity(city);
                    setShowCities(false);
                  }}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSearch}
          disabled={!selectedState || !selectedCity}
        >
          Search
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Medical Centers</h2>
          <h1>
            {results.length} medical centers available in {selectedCity}
          </h1>
          <ul className="list-disc pl-5 space-y-1">
            {results.map((item, idx) => (
              <Hospitals data={item} key={idx} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Booking;
