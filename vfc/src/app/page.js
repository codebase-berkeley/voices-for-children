"use client";
import Inventory from "./components/inventory";
import Top from "./components/top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EntryPopup from "./components/entrypopup";

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
