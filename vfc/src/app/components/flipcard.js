"use client";
import React from "react";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import "./flipcard.css";
export default function FlipCard(props) {
  const [isFlipped, setIsFlipped] = useState(false);
  console.log(isFlipped);

  const handleClick = () => {
    console.log("inside handliClick anthony");
    console.log(isFlipped);
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        {/* Front side */}
        <div
          className="card-front"
          onClick={handleClick}
          style={{
            cursor: "pointer",
          }}
        >
          <h1>colin</h1>
          {/* <img src={props.imageUrl} className="flipIMG" /> */}
        </div>
        {/* Back side */}
        <div className="card-back" onClick={handleClick}>
          <p className="description">{props.description}</p>
        </div>
      </ReactCardFlip>
    </div>
  );
}
