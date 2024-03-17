"use client";
import { useState } from "react";
import "./top.css";
import Inventory from "./inventory";
import { Link } from "react-router-dom";

function Top() {
  const [buttonId, setButtonId] = useState("Inventory");

  const handleClick = (newId) => {
    setButtonId(newId);
  };

  return (
    <div className="bigContainer">
      <div className="nav">
        <ul>
          <li>
            <div className="icon"></div>
          </li>
        </ul>
      </div>
      <div className="inventoryContainer">
        <h1 className="name">In-Kind Donation</h1>
        <div className="flipSwitch">
          <Link
            className = "link"
            style={{ textDecoration: "none" }}
            to="/"
          > 
            <button
              id={buttonId === "Inventory" ? "clicked" : null}
              onClick={() => handleClick("Inventory")}
            >
              Inventory
            </button>
          </Link>
          <Link
            className = "link"
            style={{ textDecoration: "none" }}
            to="/inventory"
          >
            <button
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
