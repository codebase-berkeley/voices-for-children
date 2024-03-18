"use client";
import { Rowdies } from 'next/font/google';
import './inventory.css';
import InventoryEntry from './inventoryentry';
import {Link} from "react-router-dom";
import EntryPopup from './entrypopup.js';
import { useState } from 'react';

function Inventory() {
    const [visible, setVisible] = useState(false);
    function show() {
        setVisible(!visible);
        console.log(visible, "f")
    }
    return (
        <div className='inventory-page'>
            <div className = "search-wrapper">
                <div className='filterContainer'>
                    <div className="search">
                        <form><input type="text" placeholder="Search..." id="search"></input></form>
                    </div>
                    <div className="filter-wrappers">
                        <div className="filter-by">
                            <select name="filter-by" id="filter" placeholder="Filter By">
                                <option value="">Filter By</option>
                                <option value="sort">option1</option>
                            </select>
                        </div>
                        <div className="sort-by">
                            <select name="sort-by" id="sort">
                                <option value="">Sort By</option>
                                <option value="sort">option1</option>
                            </select>
                        </div>
                            <button id="create-new" onClick={show}>Create New</button>
                    </div>
                </div>
            </div>
            <div className="table-form">
                <div className="inventory-wrapper">
                    <div className="inventory-header">
                        <h2 className="inv-col-head">Donor</h2>
                        <h2 className="inv-col-head">Items Donated</h2>
                        <h2 className="inv-col-head">Item Type</h2>
                        <h2 className="inv-col-head">Amount</h2>
                        <h2 className="inv-col-head">Date Donated</h2>
                        <h2 className="inv-col-head">Thanked</h2>
                    </div>
                    <InventoryEntry donor = "surbhu" item_donated = "crocs" item_type = "shoes" amount = "5" date = "march 4"/>
                    <InventoryEntry donor = "surbhu" item_donated = "crocs" item_type = "shoes" amount = "5" date = "march 4"/>
                    <InventoryEntry donor = "surbhu" item_donated = "crocs" item_type = "shoes" amount = "5" date = "march 4"/>
                    <InventoryEntry donor = "surbhu" item_donated = "crocs" item_type = "shoes" amount = "5" date = "march 4"/>
                    <InventoryEntry donor = "surbhu" item_donated = "crocs" item_type = "shoes" amount = "5" date = "march 4"/>
                    <InventoryEntry donor = "surbhu" item_donated = "crocs" item_type = "shoes" amount = "5" date = "march 4"/>
                </div>
                <div className="create-form">
                    {visible && <EntryPopup />}
                </div>
            </div>
        </div>
    )
}

export default Inventory;
