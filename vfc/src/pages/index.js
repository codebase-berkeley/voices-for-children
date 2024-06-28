"use client";
import React, { useState, useEffect } from "react";
import "./index.css";
import MultipleFlipCards from "../app/components/flipcardPage";
import TextField from "@mui/material/TextField";
import NewPopup from "../app/components/newPopup";
import rawdata from "./rawdata.json";
import Navbar from "../app/components/navbar";
import {
  PublicClientApplication,
  EventType,
  InteractionStatus,
} from "@azure/msal-browser";
import Login from "./loginpage";
import { MsalProvider, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { authScopes, msalConfig } from "../app/authConfig";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import LoginPage from "./loginpage";
// import Data from "./rawdata";
const msalInstance = new PublicClientApplication(msalConfig);
import "./index.css";
import { Nav } from "react-bootstrap";

// import Data from "./rawdata";

function MainComPart() {
  //checkbox filters
  const [currFilters, setCurrFilters] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const locations = ["San Diego", "Riverside"];
  const [data, setData] = useState([]);
  const [stagData, setStagData] = useState([]);

  const [locFilters, setLocFilters] = useState([]);
  const [monthFilters, setMonthFilters] = useState([]);
  const [yearFilters, setYearFilters] = useState([]);
  const [giftFilters, setGiftFilters] = useState([]);

  const currentYear = new Date().getFullYear();
  const year = [];
  for (let i = 2000; i <= currentYear; i++) {
    year.push(i.toString());
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getPartnership");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();  // Properly handle the promise
        console.log("get donation api response", jsonData);
        console.log("jsonData", jsonData)
        setData(jsonData);
        setStagData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const month = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [giftType, setGiftTypes] = useState([]);

  useEffect(() => {
    // Extract unique gift types from the data
    console.log("in useeffect w normalize call", data);
    const uniqueGiftTypes = [
      ...new Set(data.map((item) => normalizeWord(item.gifttype))),
    ];
    setGiftTypes(uniqueGiftTypes.sort());
  }, [data]);

  const [isDisplayed, setIsDisplayed] = useState(false);
  const [inputText, setInputText] = useState("");

  //handles search bar input
  let inputHandler = (e) => {
    if (e.key === "Enter") {
      // Convert input to lowercase
      var lowercase = e.target.value.toLowerCase();

      setInputText(lowercase);
      // Perform search with the lowercase value
      console.log("Search triggered with:", lowercase);
    }
  };

  //adds the filters to a list to be applied and displayed on the screen top

  function handleChange(e) {
    const filter = {
      filtername: e.target.value.toLowerCase(),
      filtertype: e.target.className
    }
    if (e.target.checked) {
      // If the checkbox is checked, add its value to the currFilters array
      console.log("e target CLASS", e.target.className)
      console.log(e.target.className == "location-filter")
      console.log(filter)
       
      setCurrFilters([...currFilters, filter]);
      if (filter.filtertype == "location-filter") {
        setLocFilters([...locFilters, filter.filtername])
      } else if (filter.filtertype == "year-filter") {
        setYearFilters([...yearFilters, filter.filtername])
      } else if (filter.filtertype == "month-filter") {
        setMonthFilters([...monthFilters, filter.filtername])
      } else if (filter.filtertype == "gifttype-filter") {
        console.log("appending to gift filters", filter.filtername)
        setGiftFilters([...giftFilters, filter.filtername])
      }

      console.log("location array: ", locFilters)
      console.log("year array: ", yearFilters)
      console.log("month array: ", monthFilters)
      console.log("gift array: ", giftFilters)


    } else {
      // If the checkbox is unchecked, remove its value from the currFilters array
      setCurrFilters(prevFilters => prevFilters.filter(item => item.filtername !== e.target.value.toLowerCase()));
      if (filter.filtertype === "location-filter") {
        setLocFilters(prev => prev.filter(item => item !== filter.filtername));
      } else if (filter.filtertype === "year-filter") {
        setYearFilters(prev => prev.filter(item => item !== filter.filtername));
      } else if (filter.filtertype === "month-filter") {
        setMonthFilters(prev => prev.filter(item => item !== filter.filtername));
      } else if (filter.filtertype === "gifttype-filter") {
        setGiftFilters(prev => prev.filter(item => item !== filter.filtername));
      }
      
    }
    console.log("current filters", currFilters);
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
    console.log(sentence, "from inside normalize");
    if (typeof sentence !== 'string') {
      console.error('Input is not a string');
      return [];
    }
    const words = sentence.split(" ");
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return capitalizedWords.join(" ");
  };

  const [selectedValue, setSelectedValue] = useState("");

  const sortBy = (event) => {
    setSelectedValue(event.target.value);

    if (event.target.value === "az") {
      const sortedByName = [...data].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setData(sortedByName);
    } else if (event.target.value === "old") {
      const sortedByDate = [...data].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setData(sortedByDate);
    } else if (event.target.value === "new") {
      const sortedByDate = [...data].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setData(sortedByDate);
    } else if (event.target.value === "za") {
      const sortedByName = [...data].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      setData(sortedByName);
    }
  };

  return (
    <div>
       <AuthenticatedTemplate>
      {/* top of page */}
      <Navbar onCommunity={true} />
      {/* bottom of page */}
      <div class="bottom-of-page">
        {/* side bar of ALL filters */}
        <div class="all-filters">
          {/* start of filter */}
          <div class="each-filter">
            <button onClick={() => setIsOpen((prev) => !prev)} className="button">
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
                      className = "location-filter"
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
              <h5>Year</h5>
            </button>

            {isOpen1 && (
              <div class="list">
                {year.map((year, index) => (
                  <div key={index} className="list-item">
                    <input
                      value={`${year}`}
                      type="checkbox"
                      id={`year-${index}`}
                      onChange={handleChange}
                      className = "year-filter"
                    />
                    <label
                      htmlFor={`year-${index}`}
                      style={{ marginLeft: "8px" }}
                    >
                      {year}
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
              <h5>Month</h5>
            </button>

            {isOpen2 && (
              <div class="list">
                {month.map((month, index) => (
                  <div key={index} className="list-item">
                    <input
                      value={`${month}`}
                      type="checkbox"
                      id={`month-${index}`}
                      onChange={handleChange}
                      className = "month-filter"
                    />
                    <label
                      htmlFor={`month-${index}`}
                      style={{ marginLeft: "8px" }}
                    >
                      {month}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* end of filter */}

          {/* start of filter */}
          <div class="each-filter">
            <button onClick={() => setIsOpen3((prev) => !prev)} class="button">
              {!isOpen3 ? (
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

            {isOpen3 && (
              <div class="list">
                {giftType.map((giftType, index) => (
                  <div key={index} className="list-item">
                    <input
                      value={`${giftType}`}
                      type="checkbox"
                      id={`giftType-${index}&nbsp;`}
                      onChange={handleChange}
                      className = "gifttype-filter"
                    />
                    <label
                      htmlFor={`giftType-${index}`}
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
            {/* <button class="apply-button" onClick={showFilters}>
              {" "}
              Show Filters{" "}
            </button> */}
            {/* {isDisplayed && currFilters} */}
          </div>
        </div>

        {/* end of ALL filter */}

        <div class="main-card-box">
          <div className="createNewContainer">
            <div className="SEARCH">
              <div class="searchbar">
                <TextField
                  id="outlined-basic"
                  onKeyDown={inputHandler}
                  variant="outlined"
                  label="Search"
                  InputLabelProps={{
                    sx: { color: "black", "&.Mui-focused": { color: "black" } },
                  }}
                />
              </div>
            </div>
            <select className="sortBy" value={selectedValue} onChange={sortBy}>
              <option value="">Sort By</option>
              <option value="az">A - Z</option>
              <option value="za">Z - A</option>
              <option value="old">Oldest - Newest</option>
              <option value="new">Newest - Oldest</option>
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
            locFilters={locFilters}
            giftFilters={giftFilters}
            yearFilters={yearFilters}
            monthFilters={monthFilters}
            data={data}
            setData={setData}
            stagData={stagData}
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
      </AuthenticatedTemplate>
    <UnauthenticatedTemplate>
    <Login Component={MainComPart} />
  </UnauthenticatedTemplate>
 </div>
  );
}

export default MainComPart;
