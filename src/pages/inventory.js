// "use client";
import { Rowdies } from "next/font/google";
import "./inventory.css";
import { useState, useEffect } from "react";
import DonationEntry from "@/app/Components/donationEntry";
import EntryPopup from "@/app/Components/entrypopup";
import Top from "@/app/Components/top";
import Navbar from "../app/Components/navbar";
// import Top from "../app/Components/top";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Link from "next/link";
import { json } from "react-router-dom";
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

function Inventory() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  var inKindData = null;
  /* working w api data */
  const [apiData, setApiData] = useState("");
  var currSearchKey = null;
  var currSearchObject = null;
  var lastSearch = null;
  var currSearch = {
    [currSearchKey]: currSearchObject,
  };

  const [originalData, setOriginalData] = useState(
    []

    // const [seen, setSeen] = useState(false);
    // async function show() {
    //     console.log("calling show");
    //     setSeen(!seen);
    //     console.log(seen, "from inventory")
    // }
  );

  // console.log("HITTING ENDPOINT");
  // axios
  //   .get("./api/hello")
  //   .then((response) => console.log("hello api response", response.data))
  //   .catch((error) => console.error("Error fetching data:", error));

  useEffect(() => {
    const getReq = async () => {
      const response = await fetch("/api/hello")
        .then((response) => {
          console.log("adasdasasd");
        })
        .then((data) => {
          console.log("hello api response", data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    getReq();
  }, []); // The empty dependency array ensures it only runs once after the initial render

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getInventory");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json(); // Properly handle the promise

        console.log("get donation api response", jsonData);
        setOriginalData(jsonData);
        setDonationData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // const fetchData = async () => {
    //   const response = await fetch("/api/getDonation")
    //     .then((response) => {
    //       inKindData = response.json();
    //       console.log("get donation api response", inKindData);
    //       console.log(JSON.parse(inKindData));
    //     })
    //     // .then((data) => {
    //     //   console.log(data);
    //     //   console.log("get donation api response data", data);
    //     // })
    //     .catch((error) => {
    //       console.error("Error fetching data:", error);
    //     });
    // };
    fetchData();
  }, []);

  var lastEvent = null;

  const [donationData, setDonationData] = useState([...originalData]);
  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };
  const handleSort = (event) => {
    const selectedOption = event.target.value;
    setSortBy(selectedOption);

    if (selectedOption === "") {
      setDonationData([...originalData]);
      return;
    }

    const sortedData = [...donationData].sort((a, b) => {
      if (selectedOption === "amount") {
        return a.amount - b.amount;
      } else if (selectedOption === "name") {
        return a.donor.localeCompare(b.donor);
      } else if (selectedOption === "item_type") {
        return a.item_type.localeCompare(b.item_type);
      } else if (selectedOption === "stock") {
        return a.stock.localeCompare(b.stock);
      }
    });
    setDonationData(sortedData);
  };

  const applyFilters = (currentSearch, currentFilter) => {
    let filteredData = [...originalData];

    if (currentFilter) {
      filteredData = filteredData.filter((item) =>
        item.item_type.toLowerCase().includes(currentFilter.toLowerCase())
      );
    }
    if (currentSearch) {
      filteredData = filteredData.filter(
        (item) =>
          item.item_donated
            .toLowerCase()
            .includes(currentSearch.toLowerCase()) ||
          item.item_type.toLowerCase().includes(currentSearch.toLowerCase())
      );
    }

    setDonationData(filteredData);
  };

  // const handleChange = (event) => {
  //   setSearch(event.target.value);
  //   applyFilters();

  //   if (event.target.value === '') {
  //   setInventoryData([...originalData]);
  // }

  // }
  const handleChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    applyFilters(newSearch, filter);
  };

  const handleSearch = (event) => {
    currSearch[event.target.value] = event;
    lastSearch = event.target.value;
    lastEvent = event;
    if (search === "") {
      setDonationData([...originalData]);
    } else {
      const filteredData = originalData.filter((item) => {
        return (
          item.item_donated.toLowerCase().includes(search.toLowerCase()) ||
          item.amount.toLowerCase().includes(search.toLowerCase()) ||
          item.item_type.toLowerCase().includes(search.toLowerCase())
        );
      });
      setDonationData(filteredData);
    }
  };

  const handleFilter = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    applyFilters(search, newFilter);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(event);
    }
  };

  const [buttonId, setButtonId] = useState("Donation_log");

  const handleClick = (newId) => {
    setButtonId(newId);
  };
  console.log("yo");

  console.log(buttonId);
  useEffect(() => {
    console.log("original", donationData);
  }, [donationData]);

  return (
    <div>

      {/* <Top></Top> */}
      <div className="inventory-page">
        <div className="search-wrapper">
          <div className="filterContainer">
            <div className="search">
              <form>
                {/* <input
                  type="text"
                  value={search}
                  onChange={handleChange}
                  onKeyPress={(e) => handleKeyPress(e)}
                  placeholder="Search..."
                  id="search"
                ></input> */}
                  <div className="searchbar">
                    <TextField
                      id="outlined-basic"
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeyPress(e)}
                      variant="outlined"
                      label="Search"
                      InputLabelProps={{
                        sx: {
                          color: "black",
                          "&.Mui-focused": { color: "black" },
                        },
                      }}
                    />
                  </div>
                </form>
              </div>
              <div className="filter-wrappers">
                <div className="filter-by">
                  <select
                    value={filter}
                    name="filter-by"
                    // id="filter"
                    className="SELECT"
                    placeholder="Filter By"
                    onChange={(e) => handleFilter(e)}
                  >
                    <option value="">Filter By</option>
                    <option value="Tickets">Tickets</option>
                    <option value="Toys">Toys</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="sort-by">
                  <select
                    name="sort-by"
                    className="SELECT"
                    onChange={handleSort}
                  >
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="item_type">Item Type</option>
                    <option value="amount">Amount</option>
                    <option value="stock">In Stock</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="table-form">
            <div className="inventory-wrapper">
              <div className="inventory-header">
                <div className="inv-col-head">
                  <h2 id="title">Name</h2>
                </div>
                <div className="inv-col-head">
                  <h2 id="title">Type</h2>
                </div>
                <div className="inv-col-head">
                  <h2 id="title">Amount</h2>
                </div>
                <div className="inv-col-head">
                  <h2 id="title">In Stock</h2>
                </div>
              </div>
              {donationData.map((item, index) => (
                <DonationEntry
                  key={index}
                  name={item.item_donated}
                  item_type={item.item_type}
                  amount={item.total_amount}
                  stock={item.total_amount > 0 ? 'Yes' : 'No'}
                />
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}

export default Inventory;
