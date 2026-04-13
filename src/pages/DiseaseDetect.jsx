import React from "react";

export default function DiseaseDetect() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px", padding: "2rem" }}>
      <h2>AI Tools (Disease Detection)</h2>
      <p>Upload an image of your crop to detect diseases instantly using AI.</p>
      <div style={{ marginTop: "2rem", border: "2px dashed #ccc", padding: "3rem", borderRadius: "10px" }}>
        <p>Drop your crop image here</p>
        <button style={{ padding: "10px 20px", marginTop: "10px", cursor: "pointer", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}>Upload Image</button>
      </div>
    </div>
  );
}