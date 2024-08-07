import React, { useState, useEffect } from "react";
import "./index.css";
import MultipleFlipCards from "@/app/Components/flipcardPage";
import TextField from "@mui/material/TextField";
import NewPopup from "@/app/Components/newPopup";
import Navbar from "@/app/Components/navbar";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Login from "./loginpage";

function MainComPart() {
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
        const jsonData = await response.json();
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
    const uniqueGiftTypes = [
      ...new Set(data.map((item) => normalizeWord(item.gifttype))),
    ];
    setGiftTypes(uniqueGiftTypes.sort());
  }, [data]);

  const [isDisplayed, setIsDisplayed] = useState(false);
  const [inputText, setInputText] = useState("");

  const inputHandler = (e) => {
    if (e.key === "Enter") {
      const lowercase = e.target.value.toLowerCase();
      setInputText(lowercase);
    }
  };

  function handleChange(e) {
    const filter = {
      filtername: e.target.value.toLowerCase(),
      filtertype: e.target.className
    }
    if (e.target.checked) {
      setCurrFilters([...currFilters, filter]);
      if (filter.filtertype === "location-filter") {
        setLocFilters([...locFilters, filter.filtername]);
      } else if (filter.filtertype === "year-filter") {
        setYearFilters([...yearFilters, filter.filtername]);
      } else if (filter.filtertype === "month-filter") {
        setMonthFilters([...monthFilters, filter.filtername]);
      } else if (filter.filtertype === "gifttype-filter") {
        setGiftFilters([...giftFilters, filter.filtername]);
      }
    } else {
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
  }

  const removeFilter = (filterToRemove) => {
    setCurrFilters(currFilters.filter((filter) => filter !== filterToRemove));
  };

  const showFilters = () => {
    setIsDisplayed(!isDisplayed);
  };

  const [newIsOpen, setnewIsOpen] = useState(false);

  function handleNewChange() {
    setnewIsOpen(!newIsOpen);
  }

  const normalizeWord = (sentence) => {
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
        <Navbar onCommunity={true} />
        <div className="bottom-of-page">
          <div className="all-filters">
            <div className="each-filter">
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
                <div className="button-text">Location</div>
              </button>
              {isOpen && (
                <div className="list">
                  {locations.map((location, index) => (
                    <div key={index} className="list-item">
                      <input
                        value={location}
                        type="checkbox"
                        id={`location-${index}`}
                        className="location-filter"
                        onChange={handleChange}
                      />
                      <label htmlFor={`location-${index}`} style={{ marginLeft: "8px" }}>
                        {normalizeWord(location)}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="each-filter">
              <button onClick={() => setIsOpen1((prev) => !prev)} className="button">
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
                )}
                <div className="button-text">Year</div>
              </button>
              {isOpen1 && (
                <div className="list">
                  {year.map((year, index) => (
                    <div key={index} className="list-item">
                      <input
                        value={year}
                        type="checkbox"
                        id={`year-${index}`}
                        className="year-filter"
                        onChange={handleChange}
                      />
                      <label htmlFor={`year-${index}`} style={{ marginLeft: "8px" }}>
                        {year}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="each-filter">
              <button onClick={() => setIsOpen2((prev) => !prev)} className="button">
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
                )}
                <div className="button-text">Month</div>
              </button>
              {isOpen2 && (
                <div className="list">
                  {month.map((month, index) => (
                    <div key={index} className="list-item">
                      <input
                        value={month}
                        type="checkbox"
                        id={`month-${index}`}
                        className="month-filter"
                        onChange={handleChange}
                      />
                      <label htmlFor={`month-${index}`} style={{ marginLeft: "8px" }}>
                        {month}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="each-filter">
              <button onClick={() => setIsOpen3((prev) => !prev)} className="button">
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
                )}
                <div className="button-text">Gift Type</div>
              </button>
              {isOpen3 && (
                <div className="list">
                  {giftType.map((giftType, index) => (
                    <div key={index} className="list-item">
                      <input
                        value={giftType}
                        type="checkbox"
                        id={`giftType-${index}`}
                        className="gifttype-filter"
                        onChange={handleChange}
                      />
                      <label htmlFor={`giftType-${index}`} style={{ marginLeft: "8px" }}>
                        {normalizeWord(giftType)}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="main-card-box">
            <div className="createNewContainer">
              <div className="SEARCH">
                <div className="searchbar">
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
              </select><button className="createNew" onClick={handleNewChange}>
                +
              </button>
            </div>
            <div className="card-box-top">
              {isDisplayed && (
                <div className="filter-buttons-container">
                  {currFilters.map((filter, index) => (
                    <button
                      key={index}
                      className="small-filter-button"
                      onClick={() => removeFilter(filter)}
                    >
                      {filter} <span className="close-icon">x</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
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
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
    </div>
  );
}

export default MainComPart;