"use client";
import { useState } from "react";
import "./top.css";
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
            <Link className="link" style={{ textDecoration: "none" }} to="/">
              <img
                style={{ textDecoration: "none" , display: 'block'}}
                onClick={() => handleClick("Inventory")}
                src="voices-for-children-logo-color.png"
                alt="Voices for Children Logo"
              />
            </Link>
          </li>
        </ul>
      </div>
      <div className="inventoryContainer">
        <h1 className="name">In-Kind Donation</h1>
        <div className="flipSwitch">
          <Link className="link" style={{ textDecoration: "none" }} to="/">
            <button
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
