// src/components/DisplayDropdown.js

import React, { useState } from 'react';
import './css/DisplayDropdown.css';
import displayIcon from '../assets/images/DisplayDropdown/Display.svg'; // Update the path based on your file structure

const DisplayDropdown = ({ groupBy, setGroupBy, sortBy, setSortBy }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="display-dropdown">
      <button className="display-button" onClick={() => setShowDropdown(!showDropdown)}>
        <img src={displayIcon} alt="Display Icon" className="display-icon" /> Display
        <span className="arrow">&#x25BC;</span>
      </button>

      {showDropdown && (
        <div className="dropdown-menu">
          <div className="dropdown-section">
            <label>Grouping</label>
            <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="dropdown-section">
            <label>Ordering</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayDropdown;