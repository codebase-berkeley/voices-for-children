"use client";
import React from "react";
import FlipCard from "./flipcard.js";
// import locationIcon from "../assets/location.png"

const experience = [
  {
    name: "Codebase",
    // description: "mentored",
    locationImage: "vfc/src/app/assets/codebase.jpg",
    location: "berkeley",
    phoneImage: "vfc/src/app/assets/phone.png",
    phone: "123-4567-8900",
    emailImage: "vfc/src/app/assets/email.png",
    email: "cindysanchez@berkeley.edu",
    // donorImage: "donor.png",
    donor: "donor name",
    date: "04/20/1969",
  },
  {
    name: "CS Kickstart",
    // description: "director of inclusion",
      locationImage: "vfc/src/app/assets/codebase.jpg",
      location: "berkeley",
      phoneImage: "vfc/src/app/assets/phone.png",
      phone: "123-4567-8900",
      emailImage: "vfc/src/app/assets/email.png",
      email: "cindysanchez@berkeley.edu",
      // donorImage: "donor.png",
      donor: "donor name",
  },
  {
    name: "CS61B",
    // description: "data structures ai",
    locationImage: "vfc/src/app/assets/codebase.jpg",
    location: "berkeley",
    phoneImage: "vfc/src/app/assets/phone.png",
    phone: "123-4567-8900",
    emailImage: "vfc/src/app/assets/email.png",
    email: "cindysanchez@berkeley.edu",
    // donorImage: "donor.png",
    donor: "donor name",
  },
  {
    name: "TEST",
    // description: "web dev committee",
    locationImage: "vfc/src/app/assets/location.png",
    location: "berkeley",
    phoneImage: "vfc/src/app/assets/phone.png",
    phone: "123-4567-8900",
    emailImage: "vfc/src/app/assets/email.png",
    email: "cindysanchez@berkeley.edu",
    // donorImage: "donor.png",
    donor: "donor name",
  },
];

function MultipleFlipCards() {
  
  return (
    <div className="app">
      <div className="exp-container">
        {experience.map((exp, index) => (
          <FlipCard
            key={index}
            // imageUrl={exp.imageUrl}
            name={exp.name}
            // description={exp.description}
            location={exp.location}
            phone={exp.phone}
            email={exp.email}
            donor={exp.donor}
            locationImage={exp.locationImage}
            phoneImage={exp.phoneImage}
            emailImage={exp.emailImage}
            date = {exp.date}
            // donorImage={exp.donorImage}
          />
        ))}
      </div>
      {/* <img src = {cal}> </img> */}
    </div>
  );
}

export default MultipleFlipCards;
