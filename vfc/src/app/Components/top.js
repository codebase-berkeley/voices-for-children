"use client";
import { useState } from "react";
import "./top.css";

function Top() {
  const [buttonId, setButtonId] = useState("Donation_log");

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
          <button
            id={buttonId === "Donation_log" ? "clicked" : null}
            onClick={() => handleClick("Donation_log")}
          >
            Inventory
          </button>
          <button
            id={buttonId === "Inventory" ? "clicked" : null}
            onClick={() => handleClick("Inventory")}
          >
            Donation Log
          </button>
        </div>
      </div>
    </div>
  );
}

export default Top;
