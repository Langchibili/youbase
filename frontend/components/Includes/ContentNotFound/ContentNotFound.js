'use client'
import './ContentNotFound.css'
import React from "react"

export default class ContentNotFound extends React.Component{
   render(){
    return (
        <div classname="not-found-page">
        <br/>
        <br/>
        <br/>
        <div className="not-found-content">
            <div className="emoji">😕</div>
            <br/>
            <h1>Oops! Content Not Found</h1>
                    <a href="/" className="home-button">Go To Homepage</a>
                </div>
        </div>
    )
   }
  }