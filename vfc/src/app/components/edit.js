import "./newPopup.css";
import React, { useState, useEffect } from "react";

export default function Edit({
  id,
  edit,
  setEdit,
  company,
  poc,
  email,
  phone,
  date,
  giftType,
  location,
  cityState,
  link,
  image,
  data,
  setData,
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
  const [cityStateE, setCityState] = useState(cityState);

  const handleNewClick = () => {
    setEdit(!edit);
    console.log(edit);
  };

  function handleBothClicks() {
    handleNewClick();
    handleClick();
  }

  const submitForm = async (event) => {
    event.preventDefault();
  
    console.log("before edit data: ", data);
  
    const formData = new FormData();
    formData.append("id", id);
    formData.append("companyName", event.target.companyName.value);
    formData.append("location", event.target.location.value);
    formData.append("cityState", event.target.cityState.value);
    formData.append("phone", event.target.phone.value);
    formData.append("email", event.target.email.value);
    formData.append("poc", event.target.poc.value);
    formData.append("date", event.target.date.value);
    formData.append("giftType", event.target.giftType.value);
    formData.append("link", event.target.link.value);
  
    const locImg = event.target.locationImage.files[0];
    if (locImg) {
      formData.append("image", locImg);
    } else {
      formData.append("image", image)
    }
  
    try {
      const response = await fetch("/api/editPartnership", {
        method: "PUT",
        body: formData,
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Network response was not ok: ${errorResponse.error}`);
      }
  
      const result = await response.json();
  
      const updatedCard = {
        id: result.id,
        name: event.target.companyName.value,
        image: result.image,
        location: event.target.location.value,
        citystate: event.target.cityState.value,
        phone: event.target.phone.value,
        email: event.target.email.value,
        poc: event.target.poc.value,
        date: event.target.date.value,
        gifttype: event.target.giftType.value,
        link: event.target.link.value,
      };
  
      const index = data.findIndex((card) => card.id === id);
      setData((prevData) => {
        const newData = [...prevData];
        newData[index] = updatedCard;
        return newData;
      });
  
      setEdit(false);
      handleBothClicks();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };  
  

  const today = new Date();
  const year = today.getFullYear() + 100;
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Ensure two digits for month
  const day = String(today.getDate()).padStart(2, "0"); // Ensure two digits for day
  const maxDate = `${year}-${month}-${day}`;

  return (
    <div className="newOverlay">
      <div className="newContainer">
        <div className="containerTop">
          <p className="x" onClick={handleBothClicks}>
            X
          </p>
        </div>
        <div className="titleContainer">
          <p className="newTitle">Edit Partnership</p>
        </div>
        <div className="inputs">
          {/* <form action="submit_contact_form.php"> */}
          <form className="allInputs" onSubmit={submitForm}>
            <div className="row1">
              <div className="companyName">
                <div className="form-group">
                  <label for="name">Company Name: </label>
                  <input
                    type="text"
                    id="name"
                    name="companyName"
                    placeholder="Enter Company Name"
                    value={companyE}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  ></input>
                </div>
              </div>
              <div className="contacts">
                <div className="form-group">
                  <label for="poc">POC: </label>
                  <input
                    type="text"
                    id="name"
                    name="poc"
                    placeholder="Enter POC Name"
                    value={pocE}
                    onChange={(e) => setPoc(e.target.value)}
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row2">
              <div className="form-group">
                <label id="phone" for="phone">
                  Phone Number:
                </label>
                <input
                  type="number"
                  id="name"
                  name="phone"
                  placeholder="Enter Phone Number"
                  value={phoneE}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                ></input>
              </div>

              <div className="form-group">
                <label for="email">Email: </label>
                <input
                  type="email"
                  id="name"
                  name="email"
                  placeholder="Enter Email"
                  value={emailE}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
              </div>
            </div>
            <div className="row3">
              <div className="form-group">
                <label id="date" for="date">
                  Date:
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  max={maxDate}
                  value={dateE}
                  onChange={(e) => setDate(e.target.value)}
                  required
                ></input>
              </div>
              <div className="form-group">
                <label for="address">Address: </label>
                <input
                  type="text"
                  id="name"
                  name="location"
                  placeholder="Enter Company Address"
                  value={locationE}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                ></input>
              </div>
            </div>
            <div className="row4">
              <div className="form-group">
                <label htmlFor="cityState">City/State: </label>
                <select
                  id="cityState"
                  name="cityState"
                  value={cityStateE}
                  onChange={(e) => setCityState(e.target.value)}
                  required
                >
                  <option value="">Select City/State</option>
                  <option value="Riverside, CA">Riverside, CA</option>
                  <option value="San Diego, CA">San Diego, CA</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="form-group">
                <label for="giftType">Gift Type: </label>
                <input
                  type="text"
                  id="name"
                  name="giftType"
                  placeholder="Enter gift type"
                  value={giftTypeE}
                  onChange={(e) => setGiftTypes(e.target.value)}
                  required
                ></input>
              </div>
            </div>
            <div className="row5">
              <div className="form-group">
                <label for="locationImage">Log Link</label>
                <input
                  type="url"
                  id="name"
                  name="link"
                  placeholder="https://example.com"
                  value={linkE}
                  onChange={(e) => setLink(e.target.value)}
                  required
                ></input>
              </div>
              <div className="form-group">
                <label for="locationImage">(OPTIONAL) Company Image: </label>
                <input
                  type="file"
                  id="locationImage"
                  name="locationImage"
                ></input>
              </div>
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
