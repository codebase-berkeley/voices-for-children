import React, { useEffect } from "react";
import "./modal.css";
import { useState } from "react";
import Edit from "./edit";

export default function Popup({ isOpen, setIsOpen, ...props }) {
  const handleClick = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  const parts = props.date ? props.date.split("-") : ["", "", ""];

  // Format the date if it's not empty, otherwise set it to an empty string
  const formattedDate = props.date ? `${parts[1]}/${parts[2]}/${parts[0]}` : "";

  if (!isOpen) return null;

  useEffect(() => {
    console.log(props);
  }, []);

  const [edit, setEdit] = useState(false);

  const openEdit = () => {
    setEdit(!edit);
  };

  async function deleteCard() {
    try {
      const response = await fetch("/api/deletePartnership", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.id,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      props.data = props.data.filter((entry) => entry.id != props.id);
      props.setData(props.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    handleClick();
  }

  console.log("hello" + props.id);
  console.log(props.data);

  return (
    <div className="loloverlay">
      <div className="lolcontainer">
        <div className="modal-top">
          <div className="exit-button" onClick={handleClick}>
            X
          </div>
        </div>
        <div className="titleContainer">
          <div className="company">CONTACT INFO : {props.company}</div>
        </div>
        <div className="middle">
          <div className="poc">Point of Contact : {props.poc}</div>
          <div className="email">Email : {props.email}</div>
          <div className="phone-number">Phone Number : {props.phone}</div>
          <div className="date-joined">Date Joined : {formattedDate}</div>
          <div className="gifts">Gifts : {props.giftType}</div>
          <div className="modalAddress">Address : {props.location}</div>
          <div className="cityState">City/State : {props.cityState}</div>
          <div className="Ticket Log Link">
            Ticket Log Link :{" "}
            <a
              id="logLink"
              href={"http://" + props.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.link}
            </a>
          </div>
          <div className="exitHere">
            <button className="LEAVE" onClick={openEdit}>
              Edit
            </button>
            <button onClick={deleteCard} className="LEAVE">
              Delete
            </button>
          </div>
        </div>
      </div>
      {edit ? (
        <Edit
          id={props.id}
          edit={edit}
          setEdit={setEdit}
          company={props.company}
          poc={props.poc}
          phone={props.phone}
          email={props.email}
          date={props.date}
          giftType={props.giftType}
          location={props.location}
          cityState={props.cityState}
          link={props.link}
          data={props.data}
          setData={props.setData}
          handleClick={handleClick}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
