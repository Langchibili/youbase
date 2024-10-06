'use client'

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
      <div style={{width:"100%",color:'gray',margin:"0 auto",textAlign:'center',position:'fixed', bottom:'20px'}}>
        <h6 style={{fontWeight:'bolder'}}>YOUBASE</h6>
        <small>@Copyright <strong>2024~</strong></small>
      </div>
    </div>
  )
}
