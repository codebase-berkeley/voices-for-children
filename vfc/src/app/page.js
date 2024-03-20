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
import MainComPart from "./components/maincompart.js"

export default function Home() {
  var mock = {
    imageUrl: "codebase.jpg",
    name: "Codebase",
    description: "mentored software developer - voices for children nonprofit",
  };

  return (
    <div class = "Dropdown">
      <MainComPart />
    </div>
  );
}
