"use client";
import React from "react";
import { useState } from "react";

//const ReactCardFlip = dynamic(() => import("react-card-flip"), { ssr: false });
import ReactCardFlip from "react-card-flip";
import "./flipcard.css";

const FlipCard = ({ imageUrl, name, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  console.log(isFlipped);

  const handleClick = () => {
    console.log("inside handliClick");
    console.log(isFlipped);
    setIsFlipped(!isFlipped);
  };
  const handle = () => {
    console.log("inside handle");
  };

  handle();
  return (
    <div>
      <div id="butt" onClick={handle}>
        hello
      </div>
      {/* <div className="experience-card"> */}
      {/* <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical"> */}
      {/* Front side */}
      {/* <div
            className="card-front"
            onClick={handleClick}
            style={{
              cursor: "pointer",
            }}
          > */}
      {/* <img src={imageUrl} alt={name} className="flipIMG" /> */}
      {/* </div> */}
      {/* Back side */}
      {/* <div className="card-back" onClick={handleClick}>
            <h4>{name}</h4>
            <p className="description">{description}</p>
          </div> */}
      {/* </ReactCardFlip> */}
      {/* </div> */}
    </div>
  );
};

export default FlipCard;
