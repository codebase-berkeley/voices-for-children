"use client";
import React from "react";
import FlipCard from "./flipcard.js";
import Modal from "./modal.js";

const experience = [
  {
    name: "Codebase",
    locationImage: "vfc/src/app/assets/codebase.jpg",
    location: "University Avenue and, Oxford St, Berkeley, CA 94720",
    cityState: "Berkeley, CA",
    phoneImage: "vfc/src/app/assets/phone.png",
    phone: "(123)4567-8900",
    emailImage: "vfc/src/app/assets/email.png",
    email: "cindy@berkeley.edu",
    poc: "Cindy Sanchez",
    date: "05/06/2005",
  },
  {
    name: "LEGO",
      locationImage: "vfc/src/app/assets/codebase.jpg",
      location: "1 Dr Carlton B Goodlett Pl, San Francisco, CA 94102",
      cityState: "San Francisco, CA",
      phoneImage: "vfc/src/app/assets/phone.png",
      phone: "(123)4567-8900",
      emailImage: "vfc/src/app/assets/email.png",
      email: "colin@berkeley.edu",
      poc: "Colin O'Brien",
      date: "01/01/2000",
  },
  {
    name: "COMPANY",
    locationImage: "vfc/src/app/assets/codebase.jpg",
    location: "Street Avenue and, ABC St, Oakland, CA 00000",
    cityState: "Berkeley, CA",
    phoneImage: "vfc/src/app/assets/phone.png",
    phone: "(123)4567-8900",
    emailImage: "vfc/src/app/assets/email.png",
    email: "angie@berkeley.edu",
    poc: "Angie Zhu",
    date: "12/12/2012",
  },
  {
    name: "LONGER COMPANY NAME",
    locationImage: "vfc/src/app/assets/location.png",
    location: "Street Avenue and, ABC St, San Jose, CA 00000",
    cityState: "Berkeley, CA",
    phoneImage: "vfc/src/app/assets/phone.png",
    phone: "123-4567-8900",
    emailImage: "vfc/src/app/assets/email.png",
    email: "kinton@berkeley.edu",
    phone: "(123)4567-8900",
    poc: "Kinton Duong",
    date: "10/10/2010",
  },
];

function MultipleFlipCards() {
  
  return (
    <div className="app">
      <div className="exp-container">
        {experience.map((exp, index) => (
          <FlipCard
            key={index}
            name={exp.name}
            location={exp.location}
            cityState={exp.cityState}
            phone={exp.phone}
            email={exp.email}
            poc={exp.poc}
            locationImage={exp.locationImage}
            phoneImage={exp.phoneImage}
            emailImage={exp.emailImage}
            date = {exp.date}
          />
        ))}
      </div>
    </div>
  );
}

export default MultipleFlipCards;
