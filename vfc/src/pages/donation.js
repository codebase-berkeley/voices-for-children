import "./donation.css";
import { useState, useEffect } from "react";
import DonationEntry from "../app/Components/donationEntry";
import EntryPopup from "../app/Components/entrypopup.js";
import Top from "../app/Components/top";
import Navbar from "../app/Components/navbar";
// import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Login from "./loginpage";
import LogoutButton from "./loginpage";

// Login imports
import {
  PublicClientApplication,
  EventType,
  InteractionStatus,
} from "@azure/msal-browser";
import { MsalProvider, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { authScopes, msalConfig } from "../app/authConfig";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import LoginPage from "./loginpage";

const msalInstance = new PublicClientApplication(msalConfig);

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

  // console.log("HITTING ENDPOINT");
  // axios
  //   .get("./api/hello")
  //   .then((response) => console.log("hello api response", response.data))
  //   .catch((error) => console.error("Error fetching data:", error));

  useEffect(() => {

    const getReq = async () => {
      const response = await fetch('/api/hello')
      .then((response) => {
        const a = response.json();
        console.log("adasdasasd")
        console.log(a)
      })
      .then((data) => {
        console.log(data)
        console.log("hello api response", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    }
    getReq();
    
  }, []); // The empty dependency array ensures it only runs once after the initial render

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

  const [buttonId, setButtonId] = useState("Donation_log");

  const handleClick = (newId) => {
    setButtonId(newId);
  };
  console.log("yo")
  console.log(buttonId);

  return (
    <MsalProvider instance={msalInstance}>
      <div>
        <UnauthenticatedTemplate>
          <Login Component={Donation} />
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
          <div className="bigContainer">
            <Navbar buttonId={buttonId} setButtonId={setButtonId}></Navbar>
            <div className="inventoryContainer">
              <h1 className="name">In-Kind Donation</h1>
              <div className="flipSwitch">
                {/* <Link
                  className="link"
                  style={{ textDecoration: "none" }}
                  to="/home"
                >
                  <button
                    className="BUTTON"
                    id={buttonId === "Inventory" ? "clicked" : null}
                    onClick={() => handleClick("Inventory")}
                  >
                    Inventory
                  </button>
                </Link>
                <Link
                  className="link"
                  style={{ textDecoration: "none" }}
                  to="/donation_log"
                >
                  <button
                    className="BUTTON"
                    id={buttonId === "Donation_log" ? "clicked" : null}
                    onClick={() => handleClick("Donation_log")}
                  >
                    Donation Log
                  </button>
                </Link> */}
              </div>
            </div>
          </div>
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
                    <select name="sort-by" className="SELECT" onChange={handleSort}>
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
        </AuthenticatedTemplate>
      </div>
    </MsalProvider>
  );
}

export default Donation;
