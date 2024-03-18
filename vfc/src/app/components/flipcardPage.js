"use client";
import React from "react";
import FlipCard from "./flipcard.js";
// import cal from "../assets/cal.jpg"

const experience = [
  {
    name: "Codebase",
    description: "mentored",
    locationImage: "location.png",
    location: "berkeley",
    phoneImage: "phone.png",
    phone: "123-4567-8900",
    emailImage: "email.png",
    email: "cindysanchez@berkeley.edu",
    donorImage: "donor.png",
    donor: "donor name",
    imageUrl: "codebase.jpg",
  },
  {
    name: "CS Kickstart",
    description:
      "director of inclusion",
    locationImage: "location.png",
    location: "berkeley",
    phoneImage: "phone.png",
    phone: "123-4567-8900",
    emailImage: "email.png",
    email: "cindysanchez@berkeley.edu",
    donorImage: "donor.png",
    donor: "donor name",
  },
  {
    name: "CS61B",
    description: "data structures ai",
    locationImage: "location.png",
    location: "berkeley",
    phoneImage: "phone.png",
    phone: "123-4567-8900",
    emailImage: "email.png",
    email: "cindysanchez@berkeley.edu",
    donorImage: "donor.png",
    donor: "donor name",
  },
  {
    name: "TEST",
    description: "web dev committee",
    locationImage: "location.png",
    location: "berkeley",
    phoneImage: "phone.png",
    phone: "123-4567-8900",
    emailImage: "email.png",
    email: "cindysanchez@berkeley.edu",
    donorImage: "donor.png",
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
            description={exp.description}
            location={exp.location}
            phone={exp.phone}
            email={exp.email}
            donor={exp.donor}
            locationImage={exp.locationImage}
            phoneImage={exp.phoneImage}
            emailImage={exp.emailImage}
            donorImage={exp.donorImage}
          />
        ))}
      </div>
      {/* <img src = {cal}> </img> */}
    </div>
  );
}

export default MultipleFlipCards;
