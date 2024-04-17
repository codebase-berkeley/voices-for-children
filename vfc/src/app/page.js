"use client";
import Image from "next/image";
//import FlipCard from "./components/Sophie";
import MultipleFlipCards from "./components/flipcardPage";
import React from "react";
import Card from "./components/test";
import ReactCardFlip from "react-card-flip";
import FlipCard from "./components/flipcard";
import emailIcon from "/public/assets/codebase.jpg";
import Modal from "./components/modal";
import MainComPart from "./pages/community_partnerships.js";
import newPopup from "./components/newPopup";
import Inventory from "./pages/inventory";
import InventoryEntry from "./Components/inventoryentry";
import Top from "./Components/top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EntryPopup from "./Components/entrypopup";
import Donation from "./pages/donation";
import LoginPage from "./pages/loginpage";

export default function Home() {
  var mock = {
    imageUrl: "codebase.jpg",
    name: "Codebase",
    description: "mentored software developer - voices for children nonprofit",
  };

  return (
    <div className="Dropdown">
      {/* <LoginPage/> */}
      <Router>
        <Routes>
        <Route path="/" element={<MainComPart />} />
          <Route path = "/l" element = {<LoginPage />} />
          <Route path="/home" element={<Inventory />} />
          <Route path="/donation_log" element={<Donation />} />
        </Routes>
      </Router>
    </div>
  );
}
