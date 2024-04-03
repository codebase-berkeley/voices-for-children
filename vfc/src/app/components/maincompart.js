"use client";
import React, { useState, useEffect } from "react";
import "./maincompart.css";
import MultipleFlipCards from "./flipcardPage";
import TextField from "@mui/material/TextField";
import NewPopup from "./newPopup";
import rawdata from "./rawdata.json";

// import Data from "./rawdata";

function MainComPart() {
  //checkbox filters
  const [currFilters, setCurrFilters] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const locations = ["San Diego", "other one"];
  const date = [
    "December 2023",
    "November 2023",
    "October 2023",
    "September 2023",
    "August 2023",
    "July 2023",
    "June 2023",
    "May 2023",
    "April 2023",
  ];

  const [data, setData] = useState(rawdata);
  const [giftType, setGiftTypes] = useState([]);

  useEffect(() => {
    // Extract unique gift types from the data
    const uniqueGiftTypes = [
      ...new Set(data.map((item) => normalizeWord(item.giftType))),
    ];
    setGiftTypes(uniqueGiftTypes);
  }, [data]);

  const [isDisplayed, setIsDisplayed] = useState(false);
  const [inputText, setInputText] = useState("");

  //handles search bar input
  let inputHandler = (e) => {
    //convert input to lowercase
    var lowercase = e.target.value.toLowerCase();
    setInputText(lowercase);
  };

  //adds the filters to a list to be applied and displayed on the screen top

  function handleChange(e) {
    if (e.target.checked) {
      // If the checkbox is checked, add its value to the currFilters array
      setCurrFilters([...currFilters, e.target.value.toLowerCase()]);
    } else {
      // If the checkbox is unchecked, remove its value from the currFilters array
      setCurrFilters(
        currFilters.filter((item) => item !== e.target.value.toLowerCase())
      );
    }
    console.log(currFilters);
  }

  //removes filter when it is clicked in the card box area
  const removeFilter = (filterToRemove) => {
    setCurrFilters(currFilters.filter((filter) => filter !== filterToRemove));
  };

  const showFilters = () => {
    setIsDisplayed(!isDisplayed);
  };

  const [newIsOpen, setnewIsOpen] = useState(false);

  function handleNewChange() {
    setnewIsOpen(!newIsOpen);
    console.log(newIsOpen);
  }

  //function to normalize words   Ex. juSTIN --> Justin
  const normalizeWord = (sentence) => {
    const words = sentence.split(" ");
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return capitalizedWords.join(" ");
  };

  const [selectedValue, setSelectedValue] = useState('');

  const sortBy = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      {/* top of page */}
      <div class="top-of-page">
        <div class="logo">
          <img
            src="https://www.speakupnow.org/wp-content/uploads/2021/05/voices-for-children-logo-color.png"
            alt="My Image Description"
            style={{
              display: "flex",
              width: "20vh",
              height: "auto",
            }}
          />
        </div>
        <div class="searchbar">
          <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            label="Search"
          />
        </div>
      </div>
      {/* bottom of page */}
      <div class="bottom-of-page">
        {/* side bar of ALL filters */}
        <div class="all-filters">
          {/* start of filter */}
          <div class="each-filter">
            <button onClick={() => setIsOpen((prev) => !prev)} class="button">
              {!isOpen ? (
                <img
                  src="https://static.thenounproject.com/png/551749-200.png"
                  style={{ width: "1.7vh", height: "1.2vh" }}
                />
              ) : (
                <img
                  src="https://static.thenounproject.com/png/1240272-200.png"
                  style={{ width: "1.7vh", height: "1.2vh" }}
                />
              )}
              <h5> Location </h5>
            </button>

            {isOpen && (
              <div class="list">
                {locations.map((location, index) => (
                  <div key={index} className="list-item">
                    <input
                      value={`${location}`}
                      type="checkbox"
                      id={`location-${index}`}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor={`location-${index}`}
                      style={{ marginLeft: "8px" }}
                    >
                      {normalizeWord(location)}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* end of filter */}

          {/* start of filter */}
          <div class="each-filter">
            <button onClick={() => setIsOpen1((prev) => !prev)} class="button">
              {!isOpen1 ? (
                <img
                  src="https://static.thenounproject.com/png/551749-200.png"
                  style={{ width: "1.7vh", height: "1.2vh" }}
                />
              ) : (
                <img
                  src="https://static.thenounproject.com/png/1240272-200.png"
                  style={{ width: "1.7vh", height: "1.2vh" }}
                />
              )}{" "}
              <h5>Month / Year</h5>
            </button>

            {isOpen1 && (
              <div class="list">
                {date.map((date, index) => (
                  <div key={index} className="list-item">
                    <input
                      value={`${date}`}
                      type="checkbox"
                      id={`location-${index}`}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor={`location-${index}`}
                      style={{ marginLeft: "8px" }}
                    >
                      {date}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* end of filter */}

          {/* start of filter */}
          <div class="each-filter">
            <button onClick={() => setIsOpen2((prev) => !prev)} class="button">
              {!isOpen2 ? (
                <img
                  src="https://static.thenounproject.com/png/551749-200.png"
                  style={{ width: "1.7vh", height: "1.2vh" }}
                />
              ) : (
                <img
                  src="https://static.thenounproject.com/png/1240272-200.png"
                  style={{ width: "1.7vh", height: "1.2vh" }}
                />
              )}{" "}
              <h5>Gift Type</h5>
            </button>

            {isOpen2 && (
              <div class="list">
                {giftType.map((giftType, index) => (
                  <div key={index} className="list-item">
                    <input
                      value={`${giftType}`}
                      type="checkbox"
                      id={`location-${index}&nbsp;`}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor={`location-${index}`}
                      style={{ marginLeft: "8px" }}
                    >
                      {normalizeWord(giftType)}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* end of filter */}

          <div>
            <button class="apply-button" onClick={showFilters}>
              {" "}
              Show Filters{" "}
            </button>
            {/* {isDisplayed && currFilters} */}
          </div>
        </div>

        {/* end of ALL filter */}

        <div class="main-card-box">
          <div className="createNewContainer">
            <select value={selectedValue} onChange={sortBy}>
              <option value="">Sort By</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
            <button className="createNew" onClick={handleNewChange}>
              +
            </button>
          </div>
          <div class="card-box-top">
            {isDisplayed && (
              <div class="filter-buttons-container">
                {currFilters.map((filter, index) => (
                  <button
                    key={index}
                    class="small-filter-button"
                    onClick={() => removeFilter(filter)}
                  >
                    {filter} <span class="close-icon">x</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/*this is where the cards will go */}
          <MultipleFlipCards
            input={inputText}
            filters={currFilters}
            data={data}
          />
          {newIsOpen ? (
            <NewPopup
              newIsOpen={newIsOpen}
              setnewIsOpen={setnewIsOpen}
              prevData={data}
              setData={setData}
              giftType={giftType}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* end bottom of page */}
    </div>
  );
}

export default MainComPart;
