import "./inventoryentry.css";
import { useState } from "react";
import React from "react";

function InventoryEntry(props) {
  const [isTooltipVisible, setIsTooltipVisible] = React.useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="entry-wrapper">
      <div className="box">
        <h2 className="entry">{props.donor}</h2>
      </div>
      <div className="box">
        <h2 className="entry">{props.item_donated}</h2>
      </div>
      <div className="box">
        <h2 className="entry">{props.item_type}</h2>
      </div>
      <div className="box">
        <h2 className="entry">{props.amount}</h2>
      </div>
      <div className="box">
        <h2 className="entry">{props.date}</h2>
      </div>
      <div className="box" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <h2 className="entry">{props.thanked}</h2>
        {isTooltipVisible && <div className="tooltip">{props.thanked}</div>}
      </div>

      <div className="box">
        <button className="action-button" onClick={togglePopup}>...</button>
        {showPopup && (
          <div className="popup">
            <button className="popup-button" onClick={() => console.log('Edit clicked')}>Edit</button>
            <button className="popup-button" onClick={() => console.log('Delete clicked')}>Delete</button>
            <button className="popup-button" onClick={togglePopup}>Close</button>
          </div>
        )}
      </div>



    </div>
  );
}

export default InventoryEntry;
