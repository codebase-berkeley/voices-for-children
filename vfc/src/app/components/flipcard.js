"use client";
import React from "react";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import "./flipcard.css";
export default function FlipCard(props) {
  // Takes in props: email, poc name, phone number
  const [isFlipped, setIsFlipped] = useState(false);
  console.log(isFlipped);

  const handleClick = () => {
    console.log("inside handliClick anthony");
    console.log(isFlipped);
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/* Front side */}
        <div
          className="card-front"
          onClick={handleClick}
          style={{
            cursor: "pointer",
          }}
        >
        <div className="top">
            <div className="title">{props.name}</div>
        </div>
        <div className="bottom">
          <div className="bottom-top-row"></div>
          <div className="bottom-bottom-row"></div>
        </div>
          {/* <img src={props.imageUrl} className="flipIMG" /> */}
        </div>
        {/* Back side */}
        <div className="card-back" onClick={handleClick}>
          <p className="description">{props.description}</p>
          <div className="location">
            <div className="location-container">
              <img></img>
              {props.location}
            </div>
          </div>
          <div className="phone-numbers">
            <div className="phone-container">
              <img></img>
              {props.phone}
            </div>
          </div>
          <div className="email-addresses">
            <div className="email-container">
              <img></img>
              {props.email}
            </div>
          </div>
          <div className="donor-company">
            <div className="donor-container">
              <img></img>
              {props.donor}
            </div>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
}
