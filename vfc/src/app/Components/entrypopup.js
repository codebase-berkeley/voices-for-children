"use client";
import { Rowdies } from 'next/font/google';
import './entrypopup.css';
import { useState } from 'react';

function EntryPopup ({ onClose }) {
        
        const postData = async (event) => {  
            var name = event.target.name.value;
            var donor = document.donor.value;
            var type = document.type.value;
            var amt = document.amt.value;
            var date = document.date.value;
            var desc = document.thanked.value;
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
                        <b><div className="create-new-text">New Donation</div></b>
                        <div className="close">
                            <button id="x" onClick={handlePopupClose}><img src="apple-touch-icon.png" alt="x img" id="img"></img></button>
                        </div>
                    </div>
                    <form onSubmit={postData}>
                        <input type="text" placeholder="Donation Name" id="name" name="name"></input>
                        <input type="text" placeholder="Donor" id="donor" name="donor"></input>
                        <div className="form-container">
                            <input type="text" placeholder="Donation Type" id="type" name="type"></input>
                            <input type="text" placeholder="Amount" id="amt" name="amt"></input>
                            <input type="date" placeholder="Date" id="date" name="date"></input>
                        </div>
                        <div className="desc-container">
                            <span className="popup-text">Description</span>
                            <input type="text" placeholder="Thank you details, item usage, etc." id="desc" name="thanked"></input>
                            <div className="submit"><input type="submit" id = "submit"></input></div>
                        </div>
                    </form>
                </div>  
        )
}

export default EntryPopup;