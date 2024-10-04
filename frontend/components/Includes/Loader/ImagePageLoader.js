import React from 'react';
import './ImagePageLoader.css'; // Include this in your CSS file

export default function ImagePageLoader() {
  return (
    <div className="loading-container">
      <img
        src="/youbase-logo.png"
        alt="Loading"
        className="loading-image"
      />
    </div>
  )
}
