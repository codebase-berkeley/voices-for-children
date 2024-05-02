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

  // // Filters through data from filters checked
  // const filteredData = props.data.filter((card) => {
  //   //changes 07/22/2005 to July 22, 2005
  //   const newDate = formatDate(card.date).toLowerCase();
  //   // If there are no filters selected, show everything
  //   if (props.filters.length == 0) {
  //     return true;
  //     // Else return all items that have an attribute present in the currFilter array
  //   } else {
  //     return (
  //       props.filters.includes(card.giftType.toLowerCase()) ||
  //       //filter ex. Given San Diego, CA it will include when checking off San Diego box
  //       props.filters.every((filter) =>
  //         card.cityState.toLowerCase().includes(filter.toLowerCase())
  //       ) ||
  //       props.filters.every((filter) => newDate.includes(filter.toLowerCase()))
  //     );
  //   }
  // });
  const filteredData = props.data.filter((card) => {
    const newDate = formatDate(card.date).toLowerCase();
    const cardAttributes = [
      card.giftType.toLowerCase(),
      card.cityState.toLowerCase(),
      newDate,
    ];

    // Return true if there are no filters, else check each filter on all relevant attributes
    return (
      props.filters.length === 0 ||
      props.filters.every((filter) => {
        const lowerCaseFilter = filter.toLowerCase();
        return cardAttributes.some((attribute) =>
          attribute.includes(lowerCaseFilter)
        );
      })
    );
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
            cityState={card.cityState}
            phone={card.phone}
            email={card.email}
            poc={card.poc}
            locationImage={card.locationImage}
            // phoneImage={card.phoneImage}
            // emailImage={card.emailImage}
            date={card.date}
            giftType={card.giftType}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
}

export default MultipleFlipCards;
