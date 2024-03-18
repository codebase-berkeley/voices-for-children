"use client";
import { Rowdies } from 'next/font/google';
import './entrypopup.css';
import { useState } from 'react';

function EntryPopup ({ onClose }) {
        const handlePopupClose = () => {
            onClose(); // Call the onClose function passed from Inventory to close the popup
        };
        return (
                <div className="popup">
                    <div className="create-new-bar">
                        <h1 className="create-new-text">New Donation</h1>
                        <button onClick={handlePopupClose}><img src="./apple-touch-icon.png" alt="x img"></img></button>
                    </div>
                    <form>
                        <input type="text" placeholder="Donation Name" id="name"></input>
                        <input type="text" placeholder="Donor" id="donor"></input>
                        <div className="form-container">
                            <input type="text" placeholder="Donation Type" id="type"></input>
                            <input type="text" placeholder="Amount" id="amt"></input>
                            <input type="date" placeholder="Date" id="date"></input>
                        </div>
                        <span className="popup-text">Description</span>
                        <input type="text" placeholder="Thank you details, item usage, etc." id="desc"></input>
                        <input type="submit" id = "submit"></input>
                    </form>
                </div>  
        )
}

export default EntryPopup;