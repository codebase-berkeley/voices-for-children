import React, { useEffect } from "react";
import "./modal.css";
import { useState } from "react";

export default function Popup({ isOpen, setIsOpen, ...props }) {
  const handleClick = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  if (!isOpen) return null;

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div className="overlay">
      <div className="container">
        <div className="modal-top">
          <div className="exit-button" onClick={handleClick}>
            X
          </div>
        </div>
        <div className="titleContainer">
          <div className="company">CONTACT INFO : {props.company}</div>
        </div>
        <div className="middle">
          <div className="poc">Point of Contact : {props.poc}</div>
          <div className="email">Email : {props.email}</div>
          <div className="phone-number">Phone Number : {props.phone}</div>
          <div className="date-joined">Date Joined : {props.date}</div>
          <div className="gifts">Gifts : {props.giftType}</div>
          <div className="modalAddress">Address : {props.location}</div>
          <div className="cityState">City/State : {props.cityState}</div>
          <div className="Ticket Log Link">Ticket Log Link : <a href={"http://" + props.link} target="_blank" rel="noopener noreferrer">{props.link}</a></div>
          <div className="exitHere">
            <button className="LEAVE">Edit</button>
            <button onClick={handleClick} className="LEAVE">Exit Here</button>
          </div>
        </div>
      </div>
    </div>
  );
}
