import React, { useEffect } from "react";
import "./modal.css";
import { useState } from "react";

export default function Popup({isOpen, setIsOpen, ...props}) {
  const handleClick = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  if (!isOpen) return null;

  useEffect(() => {
    console.log(props);
  }, [])

  return (
    <div className="overlay">
      <div className="container">
        <div className="modal-top">
          <div className="company">CONTACT INFO : {props.company}</div>
          <div className="exit-button" onClick={handleClick}>
            X
          </div>
        </div>
        <div className="middle">
          <div className="left">
            <div className="poc">Point of Contact</div>
            <div className="email">EMAIL</div>
            <div className="phone-number">PHONE NUMBER</div>
            <div className="date-joined">DATE JOINED</div>
          </div>
          <div className="gifts">GIFTS</div>

          <div className="address">ADDRESS</div>
        </div>
      </div>
    </div>
  );
}
