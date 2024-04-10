import "./donation.css";
import { useState } from "react";
import DonationEntry from "./donationEntry";
import EntryPopup from "./entrypopup.js";
import Top from "./top";

function Donation() {
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
    {
      name: "Codebase",
      item_type: "Tickets",
      amount: "30",
      stock: "Yes",
    },
    {
      name: "John Doe",
      item_type: "Tickets",
      amount: "10",
      stock: "No",
    },
    {
      name: "John Doe",
      item_type: "Toys",
      amount: "100",
      stock: "Yes",
    },
    {
      name: "Codebase",
      item_type: "Electronics",
      amount: "10",
      stock: "No",
    },
    {
      name: "Kinton Duong",
      item_type: "Tickets",
      amount: "40",
      stock: "No",
    },
  ]);

  // const [seen, setSeen] = useState(false);
  // async function show() {
  //     console.log("calling show");
  //     setSeen(!seen);
  //     console.log(seen, "from inventory")
  // }

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
        return a.name.localeCompare(b.name);
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
          item.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
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
          item.name.toLowerCase().includes(search.toLowerCase()) ||
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

  return (
    <div>
      <Top></Top>
      <div className="inventory-page">
        <div className="search-wrapper">
          <div className="filterContainer">
            <div className="search">
              <form>
                <input
                  type="text"
                  value={search}
                  onChange={handleChange}
                  onKeyPress={(e) => handleKeyPress(e)}
                  placeholder="Search..."
                  id="search"
                ></input>
              </form>
            </div>
            <div className="filter-wrappers">
              <div className="filter-by">
                <select
                  value={filter}
                  name="filter-by"
                  id="filter"
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
                <select name="sort-by" id="sort" onChange={handleSort}>
                  <option value="">Sort By</option>
                  <option value="sort">Name</option>
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
              <div className="box">
                <h2 id="title" className="inv-col-head">
                  Name
                </h2>
              </div>
              <div className="box">
                <h2 id="title" className="inv-col-head">
                  Type
                </h2>
              </div>
              <div className="box">
                <h2 id="title" className="inv-col-head">
                  Amount
                </h2>
              </div>
              <div className="box">
                <h2 id="title" className="inv-col-head">
                  In Stock
                </h2>
              </div>
            </div>
            {donationData.map((item, index) => (
              <DonationEntry
                key={index}
                name={item.name}
                item_type={item.item_type}
                amount={item.amount}
                stock={item.stock}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donation;
