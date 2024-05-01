"use client";
import { Rowdies } from 'next/font/google';
import './entrypopup.css';
import { useState } from 'react';

function EntryPopup ({ onClose }) {
        
        const postData = async () => {  
            var name = document.getElementById("name").value;
            var donor = document.getElementById("donor").value;
            var type = document.getElementById("type").value;
            var amt = document.getElementById("amt").value;
            var date = document.getElementById("date").value;
            var desc = document.getElementById("desc").value;
            var instock = null;
            if (amt > 0) {
                instock = 'Yes';
            } else {
                instock = 'No'
            }
        
            // console.log(name, donor, type)
            const response = await fetch("/api/postDonation", {
            method: "POST",
            body: JSON.stringify(
                name,
                donor,
                type,
                amt,
                date,
                desc,
                instock,
            ),
            });
            return response.json();
            
        };
    
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
                        <input type="text" placeholder="Donation Name" id="names"></input>
                        <input type="text" placeholder="Donor" id="donor"></input>
                        <div className="form-container">
                            <input type="text" placeholder="Donation Type" id="type"></input>
                            <input type="text" placeholder="Amount" id="amt"></input>
                            <input type="date" placeholder="Date" id="dates"></input>
                        </div>
                        <div className="desc-container">
                            <span className="popup-text">Description</span>
                            <input type="text" placeholder="Thank you details, item usage, etc." id="desc"></input>
                            <div className="submit"><input type="submit" id = "submit"></input></div>
                        </div>
                    </form>
                </div>  
        )
}

export default EntryPopup;