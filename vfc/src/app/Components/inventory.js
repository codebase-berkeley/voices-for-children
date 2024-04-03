"use client";
import { Rowdies } from "next/font/google";
import "./inventory.css";
import InventoryEntry from "./inventoryentry";
// import { Link } from "react-router-dom";
import EntryPopup from "./entrypopup.js";
import { useState } from "react";

function Inventory() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [sortBy, setSortBy] = useState(""); 
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [originalData, setOriginalData] = useState([
    {
      donor: "Codebase",
      item_donated: "Cal x Auburn Football",
      item_type: "Tickets",
      amount: 3,
      date: "3/4/2024",
      thanked: "Thanked. Thanked at banquet on 3/4",

    }, 
    { donor: "Kinton Duong",
    item_donated: "Cal x USC Basketball",
    item_type: "Tickets",
    amount: 4,
    date: "3/4/2024",
    thanked: "Thanked. Thanked at banquet on 3/4",}, 

    { donor: "Codebase",
    item_donated: "Stuffed Teddy Bear",
    item_type: "Toys",
    amount: 2,
    date: "2/6/2024",
    thanked: "Thanked. Thanked at banquet on 3/4",}, 

    { donor: "John Doe",
    item_donated: "Cal x Stanford Tickets",
    item_type: "Tickets",
    amount: 1,
    date: "12/24/2023",
    thanked: "Thanked. Thanked at banquet on 3/4",}, 

    { donor: "John Doe",
    item_donated: "2020 Macbook Pro",
    item_type: "Electronics",
    amount: 5,
    date: "1/9/2024",
    thanked: "Thanked. Thanked at banquet on 3/4",}

  ]);
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

    const sortedData = [...inventoryData].sort((a, b) => {
      if (selectedOption === "amount") {
        return a.amount - b.amount;
      } else if (selectedOption === "date") {
        return new Date(a.date) - new Date(b.date);
      }  else if (selectedOption === "donor") {
        return a.donor.localeCompare(b.donor);
      } else if (selectedOption === "item_type") {
        return a.item_type.localeCompare(b.item_type);
      } else if (selectedOption === "item_donated") {
        return a.item_donated.localeCompare(b.item_donated);
      }
      return 0;
    });
    setInventoryData(sortedData);
  };


  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value === '') {
      setInventoryData([...originalData]);
    } else {
      const filteredData = originalData.filter(item => {
      return (
        item.donor.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.item_donated.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.item_type.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });
    setInventoryData(filteredData);
  }
  };

  const handleFilter = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    if (selectedFilter === '') {
      setInventoryData([...originalData]);
    } else {
      const filteredData = originalData.filter(item => {
        return (
          item.item_type.toLowerCase().includes(selectedFilter.toLowerCase())
        );
      });
      setInventoryData(filteredData);
    }
  };

  return (
    <div className="inventory-page">
      <div className="search-wrapper">
        <div className="filterContainer">
          <div className="search">
            <form>
              <input type="text"  
              value={search} 
                onChange={(e) => handleSearch(e)} 
              placeholder="Search..." 
              id="search"></input>
            </form>
          </div>
          <div className="filter-wrappers">
            <div className="filter-by">
              <select value={filter} name="filter-by" id="filter" placeholder="Filter By" onChange={(e) => handleFilter(e)}>
              <option value="">All Categories</option>
                <option value="Tickets">Tickets</option>
                <option value="Toys">Toys</option>
                <option value="Electronics">Electronics</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="sort-by">
              <select name="sort-by" id="sort" onChange={handleSort}>
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
              <h2 id="title" className="inv-col-head">Donor</h2>
            </div>
            <div className="box">
              <h2 id="title" className="inv-col-head">Items Donated</h2>
            </div>
            <div className="box">
              <h2 id="title" className="inv-col-head">Item Type</h2>
            </div>
            <div className="box">
              <h2 id="title" className="inv-col-head">Amount</h2>
            </div>
            <div className="box">
              <h2 id="title" className="inv-col-head">Date Donated</h2>
            </div>
            <div className="box">
              <h2 id="title" className="inv-col-head">Thanked</h2>
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
  );
}

export default Inventory;
