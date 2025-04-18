import React, { useEffect, useState } from "react";
import axios from "axios";
import Hospitals from "./Hospitals";

const Booking = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get("https://meddata-backend.onrender.com/states")
      .then((response) => setStates(response.data))
      .catch((err) => console.error("Error fetching states:", err));
  }, []);

  // Fetch cities when a state is selected
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
      console.log(res.data);
      setResults(res.data);
    } catch (error) {
      console.error("Error fetching medical centers:", error);
    }
  };

  return (
    <div className="bg-white p-6 max-w-2xl mx-auto border rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Search Medical Centers</h1>
      <div className="flex justify-between items-center">
        <div className="mb-4" id="state">
          <label className="block mb-1 font-medium">Select State</label>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity(""); // reset city
            }}
          >
            <option value="">-- Select State --</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4" id="city">
          <label className="block mb-1 font-medium">Select City</label>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">-- Select City --</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <button
          label="Search"
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
          <h1>{results.length} medical centers available in {selectedCity}</h1>
          <ul className="list-disc pl-5 space-y-1">
            {results.map((item, idx) => (
              <Hospitals data={item} key={idx}/>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Booking;
