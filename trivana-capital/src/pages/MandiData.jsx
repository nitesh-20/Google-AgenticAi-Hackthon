import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/mandidata.css";

const MandiData = () => {
  const [selectedState, setSelectedState] = useState("Kerala");
  const [mandiData, setMandiData] = useState([]);
  const [filteredMandiData, setFilteredMandiData] = useState([]);
  const [mandiList, setMandiList] = useState([]);
  const [selectedMandi, setSelectedMandi] = useState("All Mandis");
  const [error, setError] = useState(false);

  const stateList = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
 "Odisha", "Punjab", "Rajasthan", "Telangana", "Tripura", "Uttar Pradesh",
    "West Bengal", "Chandigarh",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        setSelectedMandi("All Mandis");
        const response = await axios.get(
          `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd0000010a02a0f0648d45834339bb57de46bf9b&format=json&filters[state]=${selectedState}`
        );
        const records = response.data.records;
        setMandiData(records);
        setFilteredMandiData(records);

        // Get unique Mandis from data
        const mandis = ["All Mandis", ...new Set(records.map(item => item.market))];
        setMandiList(mandis);
      } catch (error) {
        console.error("Error fetching mandi data:", error);
        setError(true);
        setMandiData([]);
        setFilteredMandiData([]);
        setMandiList([]);
      }
    };

    fetchData();
  }, [selectedState]);

  useEffect(() => {
    if (selectedMandi === "All Mandis") {
      setFilteredMandiData(mandiData);
    } else {
      const filtered = mandiData.filter(item => item.market === selectedMandi);
      setFilteredMandiData(filtered);
    }
  }, [selectedMandi, mandiData]);

  return (
    <div className="mandi-container">
      <h2 className="mandi-heading">📊 Mandi Commodity Prices</h2>

      <div className="dropdown-container">
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="state-dropdown"
        >
          {stateList.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>

        {mandiList.length > 0 && (
          <select
            value={selectedMandi}
            onChange={(e) => setSelectedMandi(e.target.value)}
            className="state-dropdown"
          >
            {mandiList.map((mandi, index) => (
              <option key={index} value={mandi}>{mandi}</option>
            ))}
          </select>
        )}
      </div>

      <div className="mandi-table-container">
        <table className="mandi-table">
          <thead>
            <tr>
              <th>State</th>
              <th>District</th>
              <th>Market</th>
              <th>Commodity</th>
              <th>Arrival Date</th>
              <th>Min Price</th>
              <th>Max Price</th>
              <th>Modal Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredMandiData.length > 0 ? (
              filteredMandiData.map((item, index) => (
                <tr key={index}>
                  <td>{item.state || "Not Available"}</td>
                  <td>{item.district || "Not Available"}</td>
                  <td>{item.market || "Not Available"}</td>
                  <td>{item.commodity || "Not Available"}</td>
                  <td>{item.arrival_date || "Not Available"}</td>
                  <td>{item.min_price || "Not Available"}</td>
                  <td>{item.max_price || "Not Available"}</td>
                  <td>{item.modal_price || "Not Available"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  No data available for this selection
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MandiData;
