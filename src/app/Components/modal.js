import React, { useEffect } from "react";
import "./modal.css";
import { useState } from "react";

export default function Popup({ isOpen, setIsOpen, onDelete, ...props }) {
  const handleClick = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  if (!isOpen) return null;

  useEffect(() => {
    console.log(props);
  }, []);

  const deleteEntry = async () => {
    const itemId = props.number;
    console.log(itemId);
    console.log("body", JSON.stringify({ itemId }));
    try {
      const response = await fetch("/api/deletePartnership", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });

      if (!response.ok) {
        const text = await response.text(); // Get response as text
        throw new Error("Failed to delete the item: " + text);
      }

      const data = await response.json();
      console.log("Item successfully deleted", data);
      onDelete();
      handleClick();
      // return data;
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="loloverlay">
      <div
        className="container"
        style={{ backgroundImage: `url(${props.locationImage})` }}
      >
        <div className="modal-top">
          <div className="exit-button" onClick={handleClick}>
            ✕
          </div>
        </div>
        <div className="titleContainer">
          {/* <div className="company">CONTACT INFO : {props.company}</div> */}
        </div>
        <div className="middle">
          <div className="company">{props.company}</div>
          <div className="contactInfo">
            <div className="halfDivider">
              <div className="poc">
                <b>Point of Contact :</b> {props.poc}
              </div>
              <div className="email">
                <b>Email :</b> {props.email}
              </div>
              <div className="phone-number">
                <b>Phone Number :</b> {props.phone}
              </div>
              <div className="date-joined">
                <b>Date Joined :</b> {props.date}
              </div>
              <div className="gifts">
                <b>Gifts :</b> {props.giftType}
              </div>
            </div>
            <div className="halfDivider">
              <div className="modalAddress">
                <b>Address :</b> {props.location}
              </div>
              <div className="cityState">
                <b>City/State :</b> {props.cityState}
              </div>
              <div className="Ticket Log Link">
                <b>Ticket Log Link :</b>{" "}
                <a
                  id="logLink"
                  href={"http://" + props.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {props.link}
                </a>
              </div>
            </div>
          </div>
          <div className="placeHolder">
            <div className="exitHere">
              <button className="LEAVE" onClick={deleteEntry}>
                Delete
              </button>
              <button onClick={handleClick} className="LEAVE">
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
