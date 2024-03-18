import "./donation.css";
import { useState } from "react";
import DonationEntry from "./donationEntry";
import EntryPopup from "./entrypopup.js";

function Donation() {
  const [visible, setVisible] = useState(false);
  function show() {
    setVisible(true);
    console.log(visible, "f");
  }
  return (
    <div className="inventory-page">
      <div className="search-wrapper">
        <div className="filterContainer">
          <div className="search">
            <form>
              <input type="text" placeholder="Search..." id="search"></input>
            </form>
          </div>
          <div className="filter-wrappers">
            <div className="filter-by">
              <select name="filter-by" id="filter" placeholder="Filter By">
                <option value="">Filter By</option>
                <option value="sort">option1</option>
              </select>
            </div>
            <div className="sort-by">
              <select name="sort-by" id="sort">
                <option value="">Sort By</option>
                <option value="sort">option1</option>
              </select>
            </div>
            <button id="create-new" onClick={show}>
              Create New
            </button>
          </div>
        </div>
      </div>
      <div className="table-form">
        <div className="inventory-wrapper">
          <div className="inventory-header">
            <div className="box">
              <h2 id='title' className="inv-col-head">Name</h2>
            </div>
            <div className="box">
              <h2 id='title' className="inv-col-head">Type</h2>
            </div>
            <div className="box">
              <h2 id='title' className="inv-col-head">Amount</h2>
            </div>
            <div className="box">
              <h2 id='title' className="inv-col-head">In Stock</h2>
            </div>
          </div>
          <DonationEntry
            name="surbhu"
            type="tickets"
            amount="30"
            instock="YES!"
          />
        </div>
        <div className="create-form">{visible && <EntryPopup />}</div>
      </div>
    </div>
  );
}

export default Donation;
