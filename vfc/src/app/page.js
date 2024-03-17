"use client";
import Image from "next/image";
import Inventory from "./Components/inventory";
import InventoryEntry from "./Components/inventoryentry";
import Top from "./Components/top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EntryPopup from "./Components/entrypopup";

export default function Home() {
  return (
    <div className="App">
      <Router>
        <Top  />
        <Routes>
          <Route path="/" element={<Inventory />} />
          {/* <Route path="/donation_log" element={<Inventory />} /> */}
        </Routes>
      </Router>
    </div>
  );
}
