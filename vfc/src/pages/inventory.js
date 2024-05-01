"use client";
import { Rowdies } from "next/font/google";
import "./inventory.css";
import InventoryEntry from "../app/Components/inventoryentry";
// import { Link } from "react-router-dom";
import EntryPopup from "../app/Components/entrypopup.js";
import { useState, useEffect } from "react";
import Navbar from "../app/Components/navbar";
import Top from "../app/Components/top";
import TextField from "@mui/material/TextField";

function Inventory() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  var currSearchKey = null;
  var currSearchObject = null;
  var lastSearch = null;
  var currSearch = {
    [currSearchKey]: currSearchObject,
  };
  var lastEvent = null;
  const [originalData, setOriginalData] = useState([
  ]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch("/api/getInventory");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonDataInventory = await response.json();  // Properly handle the promise
        
        console.log("get donation api response", jsonDataInventory);
        setOriginalData(jsonDataInventory);
        setDonationData(jsonDataInventory);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // const [seen, setSeen] = useState(false);
  // async function show() {
  //     console.log("calling show");
  //     setSeen(!seen);
  //     console.log(seen, "from inventory")
  // }

  const [inventoryData, setInventoryData] = useState([...originalData]);
  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };
  const handleSort = (event) => {
    const selectedOption = event.target.value;
    setSortBy(selectedOption);

    if (selectedOption === "") {
      setInventoryData([...originalData]);
      return;
    }

    const sortedData = [...inventoryData].sort((a, b) => {
      if (selectedOption === "amount") {
        return a.amount - b.amount;
      } else if (selectedOption === "date") {
        return new Date(a.date) - new Date(b.date);
      } else if (selectedOption === "donor") {
        return a.donor.localeCompare(b.donor);
      } else if (selectedOption === "item_type") {
        return a.item_type.localeCompare(b.item_type);
      } else if (selectedOption === "item_donated") {
        return a.item_donated.localeCompare(b.item_donated);
      }
    });
    setInventoryData(sortedData);
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
          item.donor.toLowerCase().includes(currentSearch.toLowerCase()) ||
          item.item_donated
            .toLowerCase()
            .includes(currentSearch.toLowerCase()) ||
          item.item_type.toLowerCase().includes(currentSearch.toLowerCase())
      );
    }

    setInventoryData(filteredData);
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
      setInventoryData([...originalData]);
    } else {
      const filteredData = originalData.filter((item) => {
        return (
          item.donor.toLowerCase().includes(search.toLowerCase()) ||
          item.item_donated.toLowerCase().includes(search.toLowerCase()) ||
          item.item_type.toLowerCase().includes(search.toLowerCase())
        );
      });
      setInventoryData(filteredData);
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

  return (
    <div>
      <Top></Top>
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
                  className="SELECT"
                  value={filter}
                  name="filter-by"
                  id="filter"
                  placeholder="Filter By"
                  onChange={(e) => handleFilter(e)}
                >
                  <option value="">All Categories</option>
                  <option value="Tickets">Tickets</option>
                  <option value="Toys">Toys</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="sort-by">
                <select
                  className="SELECT"
                  name="sort-by"
                  id="sort"
                  onChange={handleSort}
                >
                  <option value="">Sort By</option>
                  <option value="donor">Donor</option>
                  <option value="item_donated">Items Donated</option>
                  <option value="item_type">Item Type</option>
                  <option value="amount">Amount</option>
                  <option value="date">Date Donated</option>
                </select>
              </div>
              <button id="create-new" onClick={togglePopup}>
                Create New
              </button>
            </div>
          </div>
        </div>
        <div className="table-form">
          <div className="inventory-wrapper">
            <div className="inventory-header">
              <div className="box">
                <h2 id="title" className="inv-col-head">
                  Donor
                </h2>
              </div>
              <div className="box">
                <h2 id="title" className="inv-col-head">
                  Items Donated
                </h2>
              </div>
              <div className="box">
                <h2 id="title" className="inv-col-head">
                  Item Type
                </h2>
              </div>
              <div className="box">
                <h2 id="title" className="inv-col-head">
                  Amount
                </h2>
              </div>
              <div className="box">
                <h2 id="title" className="inv-col-head">
                  Date Donated
                </h2>
              </div>
              <div className="box">
                <h2 id="title" className="inv-col-head">
                  Thanked
                </h2>
              </div>
            </div>

            {inventoryData.map((item, index) => (
              <InventoryEntry
                key={index}
                donor={item.donor}
                item_donated={item.item_donated}
                item_type={item.item_type}
                amount={item.amount}
                date={item.date}
                thanked={item.thanked}
              />
            ))}
          </div>
          <div className="create-form">
            {popupVisible && <EntryPopup onClose={togglePopup} />}
            {/* {seen && <EntryPopup  />} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
