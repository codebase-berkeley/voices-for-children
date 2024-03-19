"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import "./flipcard.css";
// Images:
import emailIcon from "/public/assets/emailIcon.png";
import locationIcon from "/public/assets/locationIcon.png";
import calendarIcon from "/public/assets/calendarIcon.png";
import phoneIcon from "/public/assets/phoneIcon.png";
import pocIcon from "/public/assets/point-of-contact.png";

export default function FlipCard(props) {
  // Takes in props: email, poc name, phone number
  const [isFlipped, setIsFlipped] = useState(false);
  console.log(isFlipped);

  const handleClick = () => {
    console.log("inside handliClick anthony");
    console.log(isFlipped);
    setIsFlipped(!isFlipped);
  };

  console.log("hi colin", emailIcon);
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
          <div className="bottom-top-row">
            <Image src={locationIcon} className='locationIcon'/>
            <div>Location: {props.cityState}</div>
            <Image src={calendarIcon} className='calendarIcon' />
            <div>Date: {props.date}</div>
          </div>
          <div className="bottom-bottom-row">
            <Image src={emailIcon} alt="Email Icon" className='emailIcon'/>
            <div>Email: {props.email}</div>
          </div>
        </div>
          {/* <img src={props.imageUrl} className="flipIMG" /> */}
        </div>
        {/* Back side */}
        <div className="card-back" onClick={handleClick}>
          {/* <p className="description">{props.description}</p> */}
          <div className="contact-info-back">{props.name}'s Contact Information</div>
          <hr/>
          <div className="location-container">
            <Image src={locationIcon} className="locationIcon"/>
            <div>Address: {props.location}</div>
          </div>
          <div className="phone-container">
            <Image src={phoneIcon} className="phoneIcon"/>
            <div>Phone Number: {props.phone}</div>
          </div>
          <div className="email-container">
            <Image src={emailIcon} className="emailIcon"/>
            <div>Email: {props.email}</div>
          </div>
          <div className="poc-container">
          <Image src={pocIcon} className="pocIcon"/>
            <div>Point of Contact: {props.poc }</div>
          </div>
        </div>
      </ReactCardFlip>
 
    </div>
  );
}
