"use client";
import React from "react";
import FlipCard from "./flipcard.js";

const experience = [
  {
    imageUrl: "codebase.jpg",
    name: "Codebase",
    description: "mentored",
    location: "berkeley",
    phone: "123-4567-8900",
    email: "cindysanchez@berkeley.edu",
    donor: "donor name",
  },
  {
    imageUrl: "CSK2022BigGroup.jpg",
    name: "CS Kickstart",
    description:
      "director of inclusion",
    location: "berkeley",
    phone: "123-4567-8900",
    email: "cindysanchez@berkeley.edu",
    donor: "donor name",
  },
  {
    imageUrl: "eecs.jpg",
    name: "CS61B",
    description: "data structures ai",
    location: "berkeley",
    phone: "123-4567-8900",
    email: "cindysanchez@berkeley.edu",
    donor: "donor name",
  },
  {
    imageUrl: "cal.jpg",
    name: "TEST",
    description: "web dev committee",
    location: "berkeley",
    phone: "123-4567-8900",
    email: "cindysanchez@berkeley.edu",
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
            imageUrl={exp.imageUrl}
            name={exp.name}
            description={exp.description}
            location={exp.location}
            phone={exp.phone}
            email={exp.email}
            donor={exp.donor}
          />
        ))}
      </div>
    </div>
  );
}

export default MultipleFlipCards;
