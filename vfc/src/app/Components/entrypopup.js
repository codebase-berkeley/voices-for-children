"use client";
import { Rowdies } from 'next/font/google';
import './entrypopup.css';
import { useState } from 'react';

function EntryPopup ({ onClose }) {
        const handlePopupClose = () => {
            onClose(); // Call the onClose function passed from Inventory to close the popup test
        };
        return (
                <div className="popup">
                    <div className="create-new-bar">
                        <b><h1 className="create-new-text">New Donation</h1></b>
                        <div className="close">
                            <button id="x" onClick={handlePopupClose}><img src="apple-touch-icon.png" alt="x img"></img></button>
                        </div>
                    </div>
                    <form>
                        <input type="text" placeholder="Donation Name" id="name" required></input>
                        <input type="text" placeholder="Donor" id="donor" required></input>
                        <div className="form-container">
                            <input type="text" placeholder="Donation Type" id="type" required></input>
                            <input type="text" placeholder="Amount" id="amt" required></input>
                            <input type="date" placeholder="Date" id="date" required></input>
                        </div>
                        <div className="desc-container">
                            <span className="popup-text">Description</span>
                            <input type="text" placeholder="Thank you details, item usage, etc." id="desc" required></input>
                            <div className="submit"><input type="submit" id = "submit"></input></div>
                        </div>
                    </form>
                </div>  
        )
}

export default EntryPopup;