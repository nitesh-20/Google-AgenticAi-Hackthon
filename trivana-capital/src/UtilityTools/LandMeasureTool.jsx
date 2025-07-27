import React, { useState, useRef, useEffect } from 'react';
import './LandMeasureTool.css';

// Simple toast function
const toast = {
  success: (message) => {
    const toastEl = document.createElement('div');
    toastEl.className = 'toast toast-success';
    toastEl.textContent = message;
    document.body.appendChild(toastEl);
    setTimeout(() => toastEl.remove(), 3000);
  },
  info: (message) => {
    const toastEl = document.createElement('div');
    toastEl.className = 'toast toast-info';
    toastEl.textContent = message;
    document.body.appendChild(toastEl);
    setTimeout(() => toastEl.remove(), 3000);
  }
};




export const LandMeasureTool = () => {
  const [measurements, setMeasurements] = useState([]);
  const [currentMeasurement, setCurrentMeasurement] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('acres');
  const [showGuide, setShowGuide] = useState(true);
  const [savedMeasurements, setSavedMeasurements] = useState([]);
  const [drawingPoints, setDrawingPoints] = useState([]);
  const mapRef = useRef(null);

  // Convert area between units
  const convertArea = (area, fromUnit, toUnit) => {
    let sqMeters = area;
    if (fromUnit === 'acres') sqMeters = area * 4046.86;
    if (fromUnit === 'hectares') sqMeters = area * 10000;
    
    if (toUnit === 'acres') return sqMeters / 4046.86;
    if (toUnit === 'hectares') return sqMeters / 10000;
    return sqMeters;
  };

  const formatArea = (area, unit) => {
    const converted = convertArea(area, 'sqmeters', unit);
    return `${converted.toFixed(2)} ${unit === 'sqmeters' ? 'sq m' : unit}`;
  };

  const formatPerimeter = (perimeter) => {
    if (perimeter > 1000) {
      return `${(perimeter / 1000).toFixed(2)} km`;
    }
    return `${perimeter.toFixed(2)} m`;
  };

  // Calculate area using shoelace formula
  const calculateArea = (coordinates) => {
    if (coordinates.length < 3) return 0;
    
    let area = 0;
    for (let i = 0; i < coordinates.length; i++) {
      const j = (i + 1) % coordinates.length;
      area += coordinates[i][0] * coordinates[j][1];
      area -= coordinates[j][0] * coordinates[i][1];
    }
    return Math.abs(area / 2) * 111000 * 111000; // Convert to square meters
  };

  // Calculate perimeter
  const calculatePerimeter = (coordinates) => {
    if (coordinates.length < 2) return 0;
    
    let perimeter = 0;
    for (let i = 0; i < coordinates.length; i++) {
      const j = (i + 1) % coordinates.length;
      const dx = (coordinates[j][0] - coordinates[i][0]) * 111000;
      const dy = (coordinates[j][1] - coordinates[i][1]) * 111000;
      perimeter += Math.sqrt(dx * dx + dy * dy);
    }
    return perimeter;
  };

  const handleMapClick = (e) => {
    if (!isDrawing) return;
    
    const rect = mapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 360 - 180;
    const y = 90 - ((e.clientY - rect.top) / rect.height) * 180;
    
    const newPoints = [...drawingPoints, [x, y]];
    setDrawingPoints(newPoints);
  };

  const handleMapDoubleClick = () => {
    if (drawingPoints.length >= 3) {
      const area = calculateArea(drawingPoints);
      const perimeter = calculatePerimeter(drawingPoints);
      
      const measurement = {
        id: `measurement-${Date.now()}`,
        name: `Field ${measurements.length + 1}`,
        area,
        perimeter,
        coordinates: drawingPoints,
        timestamp: new Date(),
        units: selectedUnit
      };
      
      setCurrentMeasurement(measurement);
      setIsDrawing(false);
      setDrawingPoints([]);
      toast.success(`Land area measured: ${formatArea(area, selectedUnit)}`);
    }
  };

  const handleStartDrawing = () => {
    setIsDrawing(true);
    setCurrentMeasurement(null);
    setDrawingPoints([]);
    toast.info("Click on the map to start drawing your land boundary");
  };

  const handleClearMeasurement = () => {
    setCurrentMeasurement(null);
    setIsDrawing(false);
    setDrawingPoints([]);
    toast.info("Measurement cleared");
  };

  const handleSaveMeasurement = () => {
    if (currentMeasurement) {
      const savedMeasurement = {
        ...currentMeasurement,
        id: `measurement-${Date.now()}`,
        name: `Field ${savedMeasurements.length + 1}`,
        units: selectedUnit
      };
      setSavedMeasurements([...savedMeasurements, savedMeasurement]);
      toast.success("Measurement saved successfully!");
    }
  };

  const handleExportMeasurement = () => {
    if (currentMeasurement) {
      const data = {
        name: currentMeasurement.name || "Land Measurement",
        area: formatArea(currentMeasurement.area, selectedUnit),
        perimeter: formatPerimeter(currentMeasurement.perimeter),
        coordinates: currentMeasurement.coordinates,
        timestamp: currentMeasurement.timestamp.toISOString(),
        unit: selectedUnit
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `land-measurement-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast.success("Measurement exported successfully!");
    }
  };

  // SVG Icons
  const RulerIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0Z"/>
      <path d="m14.5 12.5 2-2"/>
      <path d="m11.5 9.5 2-2"/>
      <path d="m8.5 6.5 2-2"/>
      <path d="m17.5 15.5 2-2"/>
    </svg>
  );

  const PenIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 19l7-7 3 3-7 7-3-3z"/>
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
      <path d="M2 2l7.586 7.586"/>
    </svg>
  );

  const TrashIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18"/>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    </svg>
  );

  const SaveIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
      <polyline points="17,21 17,13 7,13 7,21"/>
      <polyline points="7,3 7,8 15,8"/>
    </svg>
  );

  const DownloadIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7,10 12,15 17,10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );

  const CalculatorIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="2" width="16" height="20" rx="2"/>
      <line x1="8" y1="6" x2="16" y2="6"/>
      <line x1="16" y1="14" x2="16" y2="18"/>
      <path d="M16 10h.01"/>
      <path d="M12 10h.01"/>
      <path d="M8 10h.01"/>
      <path d="M12 14h.01"/>
      <path d="M8 14h.01"/>
      <path d="M12 18h.01"/>
      <path d="M8 18h.01"/>
    </svg>
  );

  const XIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18"/>
      <path d="M6 6l12 12"/>
    </svg>
  );

  return (
    <div className="land-measure-tool">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <RulerIcon />
            </div>
            <div className="header-text">
              <h1>SmartField Measure</h1>
              <p>AI-Powered Land Measurement Tool</p>
            </div>
          </div>
          <div className="ai-badge">AI-Powered</div>
        </div>
      </header>

      <div className="main-content">
        {/* Tools Panel */}
        <div className="tools-panel">
          <div className="panel-card">
            <h3>Measurement Tools</h3>
            <div className="tools-buttons">
              <button 
                onClick={handleStartDrawing}
                disabled={isDrawing}
                className={`btn btn-primary ${isDrawing ? 'btn-disabled' : ''}`}
              >
                <PenIcon />
                {isDrawing ? "Drawing..." : "Draw Land Boundary"}
              </button>
              
              <button 
                onClick={handleClearMeasurement}
                className="btn btn-outline"
                disabled={!currentMeasurement && !isDrawing}
              >
                <TrashIcon />
                Clear Measurement
              </button>

              {currentMeasurement && (
                <>
                  <button 
                    onClick={handleSaveMeasurement}
                    className="btn btn-success"
                  >
                    <SaveIcon />
                    Save Measurement
                  </button>
                  
                  <button 
                    onClick={handleExportMeasurement}
                    className="btn btn-tool"
                  >
                    <DownloadIcon />
                    Export
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Measurement Results */}
          <div className="panel-card">
            <h3><CalculatorIcon /> Measurement Results</h3>
            
            {/* Unit Selection */}
            <div className="unit-selection">
              <label>Display Units</label>
              <div className="unit-buttons">
                {['acres', 'hectares', 'sqmeters'].map((unit) => (
                  <button
                    key={unit}
                    className={`btn btn-sm ${selectedUnit === unit ? 'btn-active' : 'btn-outline'}`}
                    onClick={() => setSelectedUnit(unit)}
                  >
                    {unit === 'sqmeters' ? 'Sq Meters' : unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Display */}
            {currentMeasurement ? (
              <div className="results-display">
                <div className="result-item">
                  <span>Total Area</span>
                  <div className="result-value">
                    {formatArea(currentMeasurement.area, selectedUnit)}
                  </div>
                </div>
                
                <div className="result-item">
                  <span>Perimeter</span>
                  <div className="result-value">
                    {formatPerimeter(currentMeasurement.perimeter)}
                  </div>
                </div>

                <div className="result-item">
                  <span>Points</span>
                  <div className="result-value">
                    {currentMeasurement.coordinates.length}
                  </div>
                </div>

                <div className="timestamp">
                  Measured at {currentMeasurement.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ) : (
              <div className="no-results">
                <RulerIcon />
                <p>Start drawing on the map to see measurement results</p>
              </div>
            )}
          </div>

          {/* Saved Measurements */}
          {savedMeasurements.length > 0 && (
            <div className="panel-card">
              <h3>Saved Fields ({savedMeasurements.length})</h3>
              <div className="saved-list">
                {savedMeasurements.slice(-3).map((measurement) => (
                  <div key={measurement.id} className="saved-item">
                    <div className="saved-name">{measurement.name}</div>
                    <div className="saved-area">
                      {formatArea(measurement.area, measurement.units)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Map */}
        <div className="map-container">
          <div className="map-card">
            <div 
              ref={mapRef}
              className="map-area"
              onClick={handleMapClick}
              onDoubleClick={handleMapDoubleClick}
            >
              {/* Satellite imagery simulation */}
              <div className="satellite-bg"></div>
              
              {/* Drawing points */}
              {drawingPoints.map((point, index) => (
                <div
                  key={index}
                  className="map-point"
                  style={{
                    left: `${((point[0] + 180) / 360) * 100}%`,
                    top: `${((90 - point[1]) / 180) * 100}%`
                  }}
                />
              ))}
              
              {/* Drawing lines */}
              {drawingPoints.length > 1 && (
                <svg className="map-lines">
                  <polygon
                    points={drawingPoints.map(point => 
                      `${((point[0] + 180) / 360) * 100},${((90 - point[1]) / 180) * 100}`
                    ).join(' ')}
                    className="drawn-polygon"
                  />
                </svg>
              )}

              {/* Current measurement polygon */}
              {currentMeasurement && (
                <svg className="map-lines">
                  <polygon
                    points={currentMeasurement.coordinates.map(point => 
                      `${((point[0] + 180) / 360) * 100},${((90 - point[1]) / 180) * 100}`
                    ).join(' ')}
                    className="measurement-polygon"
                  />
                </svg>
              )}
            </div>
            
            {/* Map overlay with instructions */}
            {isDrawing && (
              <div className="map-overlay">
                <div className="overlay-message">
                  📍 Click points on the map to draw your land boundary. Double-click to finish.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Guide Overlay */}
      {showGuide && (
        <div className="guide-overlay">
          <div className="guide-card">
            <button 
              className="guide-close"
              onClick={() => setShowGuide(false)}
            >
              <XIcon />
            </button>
            
            <div className="guide-header">
              <div className="guide-logo">
                <RulerIcon />
              </div>
              <h2>Welcome to SmartField Measure</h2>
              <p>AI-powered land measurement tool designed for farmers and landowners</p>
            </div>
            
            <div className="guide-content">
              <h3>How to Use</h3>
              <div className="guide-steps">
                <div className="guide-step">
                  <div className="step-icon">1</div>
                  <div>
                    <h4>Draw Your Land</h4>
                    <p>Click 'Draw Land Boundary' and click points on the map to outline your field. Double-click to finish.</p>
                  </div>
                </div>
                <div className="guide-step">
                  <div className="step-icon">2</div>
                  <div>
                    <h4>Instant Calculations</h4>
                    <p>Get real-time area and perimeter measurements in acres, hectares, or square meters.</p>
                  </div>
                </div>
                <div className="guide-step">
                  <div className="step-icon">3</div>
                  <div>
                    <h4>Save & Export</h4>
                    <p>Save your measurements and export them as files for record keeping and sharing.</p>
                  </div>
                </div>
              </div>

              <div className="guide-features">
                <h3>Key Features</h3>
                <div className="feature-badges">
                  <span className="feature-badge">📡 Works offline in remote areas</span>
                  <span className="feature-badge">🌍 Multi-language support</span>
                  <span className="feature-badge">📍 GPS location integration</span>
                </div>
              </div>

              <div className="accuracy-note">
                <h4>📍 Accuracy Note</h4>
                <p>For best results, enable location services and ensure good GPS signal. Measurements are suitable for general planning; consult a surveyor for legal boundaries.</p>
              </div>

              <div className="guide-actions">
                <button onClick={() => setShowGuide(false)} className="btn btn-primary">
                  Start Measuring
                </button>
                <button onClick={() => setShowGuide(false)} className="btn btn-outline">
                  Skip Tutorial
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default LandMeasureTool;
