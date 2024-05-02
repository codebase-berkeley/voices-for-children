"use client";
import { React, useState } from "react";
import FlipCard from "./flipcard.js";
import Modal from "./modal.js";
// import rawdata from "./rawdata.json";
import { Andada_Pro } from "next/font/google/index.js";

function MultipleFlipCards(props) {
  const formatDate = (dateString) => {
    let date = new Date(dateString);
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Filters through data from filters checked
  const filteredData = props.data.filter((card) => {
    const newDate = formatDate(card.date).toLowerCase();
    const cardAttributes = [
        card.gifttype.toLowerCase(),
        card.citystate.toLowerCase(),
        newDate
    ];

    // Return true if there are no filters, else check each filter on all relevant attributes
    return props.filters.length === 0 || props.filters.every((filter) => {
      console.log(filter);
        const lowerCaseFilter = filter.filtername.toLowerCase();
        console.log("lowere case filter", lowerCaseFilter);
        return cardAttributes.some(attribute => attribute.includes(lowerCaseFilter));
    });
});
  // Filters through data by searching
  const searchedData = filteredData.filter((card) => {
    //if nothing in the input, return everything
    if (props.input == "") {
      return true;
    } else {
      //only return cards that match the name
      return card.name.toLowerCase().includes(props.input);
    }
  });
  return (
    <div className="app">
      <div className="card-container">
        {searchedData.map((card, index) => (
          <FlipCard
            key={index}
            name={card.name}
            location={card.location}
            cityState={card.citystate}
            phone={card.phone}
            email={card.email}
            poc={card.poc}
            image={card.image}
            date={card.date}
            giftType={card.gifttype}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
}

export default MultipleFlipCards;
