"use client";
import React, { useState } from 'react';

const Card = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    console.log("inside handle click test");
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="front"><h1>front</h1></div>
      <div className="back"><h1>back</h1></div>
    </div>
  );
};

export default Card;