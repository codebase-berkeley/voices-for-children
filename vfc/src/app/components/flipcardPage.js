"use client";
import {React, useState} from "react";
import FlipCard from "./flipcard.js";
import Modal from "./modal.js";
import rawdata from "./rawdata.json"
import { Andada_Pro } from "next/font/google/index.js";

function MultipleFlipCards(props) {
  // const [data, setData] = useState(rawdata);
  
  
  // Filters through data from filters checked
  const filteredData = props.data.filter(card => {
    // If there are no filters selected, show everything
    if (props.filters.length == 0) {
      return true;
    // Else return all items that have an attribute present in the currFilter array
    } else {
      return(
        props.filters.includes(card.giftType) ||
        props.filters.includes(card.location) ||
        props.filters.includes(card.date)
        );
    }
  })
  // Filters through data by searching
  const searchedData = filteredData.filter(card => {
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
            date = {card.date}
            giftType = {card.giftType}
          />
        ))}
      </div>
    </div>
  );
}

export default MultipleFlipCards;

