"use client";

import React from "react";
import FlipCard from "./flipcard.js";


const experience = [
  {
    imageUrl: "codebase.jpg",
    name: "Codebase",
    description: "mentored software developer - voices for children nonprofit",
  },
  {
    imageUrl: "CSK2022BigGroup.jpg",
    name: "CS Kickstart",
    description: "director of inclusion - planning a super fun program for freshmen",
  },
  {
    imageUrl: "eecs.jpg", 
    name: "CS61B",
    description: "data structures ai",
  },
  {
    imageUrl: "cal.jpg",
    name: "RCSA",
    description: "web dev committee",
  }
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
          />
        ))}
      </div>
    </div>
  );
}

export default MultipleFlipCards;