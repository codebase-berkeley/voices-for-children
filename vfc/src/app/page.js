"use client";
import Image from "next/image";
<<<<<<< HEAD
//import FlipCard from "./components/Sophie";
import MultipleFlipCards from "./components/flipcardPage";
import React from "react";
import Card from "./components/test";
import ReactCardFlip from "react-card-flip";
import FlipCard from "./components/flipcard";
import emailIcon from "/public/assets/codebase.jpg";
import Modal from "./components/modal";
import MainComPart from "./components/maincompart.js"
import newPopup from "./components/newPopup";
=======
import Inventory from "./Components/inventory";
import InventoryEntry from "./Components/inventoryentry";
import Top from "./Components/top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EntryPopup from "./Components/entrypopup";
import Donation from "./Components/donation";
>>>>>>> 1c7cfb7c8292d7c066b907b3d982aaadd603bb09

export default function Home() {
  var mock = {
    imageUrl: "codebase.jpg",
    name: "Codebase",
    description: "mentored software developer - voices for children nonprofit",
  };

  return (
<<<<<<< HEAD
    <div class = "Dropdown">
      <MainComPart />
=======
    <div className="App">
      <Router>
        <Top  />
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route path="/donation_log" element={<Donation />} />
        </Routes>
      </Router>
>>>>>>> 1c7cfb7c8292d7c066b907b3d982aaadd603bb09
    </div>
  );
}
