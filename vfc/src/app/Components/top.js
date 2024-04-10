"use client";
import { useState } from "react";
import "./top.css";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

function Top() {
  const [buttonId, setButtonId] = useState("Inventory");

  const handleClick = (newId) => {
    setButtonId(newId);
  };

  console.log(buttonId);

  return (
    <div className="bigContainer">
      <Navbar></Navbar>
      <div className="inventoryContainer">
        <h1 className="name">In-Kind Donation</h1>
        <div className="flipSwitch">
          <Link className="link" style={{ textDecoration: "none" }} to="/home">
            <button className="BUTTON"
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
            <button className="BUTTON"
              id={buttonId === "Donation_log" ? "clicked" : null}
              onClick={() => handleClick("Donation_log")}
            >
              Donation Log
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Top;
