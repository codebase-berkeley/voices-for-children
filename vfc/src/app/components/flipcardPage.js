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
    //changes 07/22/2005 to July 22, 2005
    const newDate = formatDate(card.date).toLowerCase();
    // If there are no filters selected, show everything
    if (props.filters.length == 0) {
      return true;
      // Else return all items that have an attribute present in the currFilter array
    } else {
      return (
        props.filters.includes(card.gifttype.toLowerCase()) ||
        //filter ex. Given San Diego, CA it will include when checking off San Diego box
        props.filters.every((filter) =>
          card.citystate.toLowerCase().includes(filter.toLowerCase())
        ) ||
        props.filters.every((filter) => newDate.includes(filter.toLowerCase()))
      );
    }
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
            id={card.id}
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
            data={props.data}
            setData={props.setData}
          />
        ))}
      </div>
    </div>
  );
}

export default MultipleFlipCards;