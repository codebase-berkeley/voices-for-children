import "./newPopup.css";
import React, { useState } from "react";

export default function EditPopup({
  id,
  company,
  poc,
  email,
  phone,
  date,
  giftType,
  location,
  link,
  data,
  setData,
  edit,
  setEdit,
  handleClick,
}) {
  const [companyE, setCompany] = useState(company);
  const [pocE, setPoc] = useState(poc);
  const [emailE, setEmail] = useState(email);
  const [phoneE, setPhone] = useState(phone);
  const [dateE, setDate] = useState(date);
  const [giftTypeE, setGiftTypes] = useState(giftType);
  const [locationE, setLocation] = useState(location);
  const [linkE, setLink] = useState(link);

  const handleNewClick = () => {
    setEdit(!edit);
  };

  function handleBothClicks() {
    handleNewClick();
    handleClick();
  }

  const submitForm = async (event) => {
    event.preventDefault();

    const newCard = {
      id: id,
      name: event.target.companyName.value,
      image: "/assets/aqua.jpg",
      location: event.target.location.value,
      citystate: event.target.cityState.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
      poc: event.target.poc.value,
      date: event.target.date.value,
      gifttype: event.target.giftType.value,
      link: event.target.link.value,
    };

    const reader = new FileReader();
    const locImg = event.target.locationImage.files[0];

    if (locImg) {
      reader.onloadend = () => {
        newCard.image = reader.result;
        const index = data.findIndex((card) => card.id === id);
        setData((prevData) => {
          const newData = [...prevData];
          newData[index] = newCard;
          return newData;
        });
        setEdit(false);
      };
      reader.readAsDataURL(locImg);
    } else {
      newCard.image = "/assets/aqua.jpg";
      const index = data.findIndex((card) => card.id === id);
      setData((prevData) => {
        const newData = [...prevData];
        newData[index] = newCard;
        return newData;
      });
      setEdit(false);
      handleBothClicks();
    }

    try {
      const response = await fetch("/api/editPartnership", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          name: event.target.companyName.value,
          location: event.target.location.value,
          citystate: event.target.cityState.value,
          date: event.target.date.value,
          email: event.target.email.value,
          poc: event.target.poc.value,
          phone: event.target.phone.value,
          gifttype: event.target.giftType.value,
          link: event.target.link.value,
          image: newCard.image,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const today = new Date();
  const year = today.getFullYear() + 100;
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const maxDate = `${year}-${month}-${day}`;

  return (
    <div className="popupOverlay">
      <div className="popupContainer">
        <div className="containerTop">
          <p className="popupTitle">Edit Partnership</p>
          <p className="x" onClick={handleBothClicks}>
            ✕
          </p>
        </div>
        <div className="inputs">
          <form className="allInputs" onSubmit={submitForm}>
            <div className="form-group">
              <label htmlFor="companyName">Company Name:</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                placeholder="Enter Company Name"
                value={companyE}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={emailE}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter Phone Number"
                value={phoneE}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="poc">Point of Contact (POC):</label>
              <input
                type="date"
                id="poc"
                name="poc"
                max={maxDate}
                value={dateE}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cityState">City/State:</label>
              <select id="cityState" name="cityState" required>
                <option value="">Select City/State</option>
                <option value="Riverside, CA">Riverside, CA</option>
                <option value="San Diego, CA">San Diego, CA</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="link">Log Link:</label>
              <input
                type="url"
                id="link"
                name="link"
                placeholder="https://example.com"
                value={linkE}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                max={maxDate}
                value={dateE}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Address:</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter Company Address"
                value={locationE}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="giftType">Gift Type:</label>
              <input
                type="text"
                id="giftType"
                name="giftType"
                placeholder="Enter Gift Type"
                value={giftTypeE}
                onChange={(e) => setGiftTypes(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="companyImage">(OPTIONAL) Company Image:</label>
              <input
                type="file"
                id="companyImage"
                name="image"
                accept="image/*"
              />
            </div>

            <div className="buttonContainer">
              <button id="submitButton" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
