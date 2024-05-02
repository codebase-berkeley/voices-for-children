import "./inventoryentry.css";
import { useState } from "react";
import React from "react";

function InventoryEntry(props) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // const handleDelete = () => {
  //   // Handle the deletion logic here
  //   console.log("Item deleted");
  //   setShowDeleteConfirm(false); // Close the delete confirmation popup
  //   setShowPopup(false); // Close the main popup
  // };


  const handleDelete = async () => {

    const itemId = props.realKey;
    console.log(itemId);
    var bod = {id: itemId};
    console.log("body", JSON.stringify({itemId}));
    try {
      console.log("trying to delete a row", itemId);
      const response = await fetch('/api/deleteInventory', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({itemId})
      });
  
      // if (response.ok) {
      //   console.log('Item successfully deleted');
      //   // Optionally, trigger a refresh of the inventory list in the parent component
      //   props.onDelete(); // You'll need to pass this method as a prop from the parent component
      // } else {
      //   throw new Error('Failed to delete the item');
      // }
      if (!response.ok) {
        const text = await response.text();  // Get response as text
        throw new Error('Failed to delete the item: ' + text);
      }
      
      const data = await response.json();
      console.log('Item successfully deleted', data);

      // return data;
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  
    setShowDeleteConfirm(false); // Close the delete confirmation popup
    setShowPopup(false); // Close the main popup
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
          <div className="edit-popup">
            <button className="edit-popup-button" onClick={() => setShowDeleteConfirm(true)}>Delete</button>
            <button className="edit-popup-button" onClick={togglePopup}>Close</button>
          </div>
        )}
        {showDeleteConfirm && (
          <div className="delete-popup">
            <div className="delete-confirmation">
              Are you sure you want to delete?
              <button className="confirmation-button" onClick={handleDelete}>Yes</button>
              <button className="confirmation-button" onClick={() => setShowDeleteConfirm(false)}>No</button>
            </div>
          </div>
        )}
        {showDeleteConfirm && (
          <div
            className={`overlay ${showDeleteConfirm ? "show" : ""}`}
            onClick={() => setShowDeleteConfirm(false)}
          ></div>
        )}
      </div>
    </div>
  );
}
export default InventoryEntry;


