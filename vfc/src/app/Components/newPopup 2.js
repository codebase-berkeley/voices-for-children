import "./newPopup.css";

export default function NewPopup({
  newIsOpen,
  setnewIsOpen,
  prevData,
  setData,
}) {
  const handleNewCick = () => {
    setnewIsOpen(!newIsOpen);
    console.log(newIsOpen);
  };

  const submitForm = (event) => {
    event.preventDefault();

    // const newCard = {
    //     name: "hello",
    //     locationImage: "vfc/src/app/assets/justinchen.jpg",
    //     location: "NYC",
    //     cityState: "NYC, CA",
    //     phone: "(123)4567-8912",
    //     email: "justinchen722@berkeley.edu",
    //     poc: "Justin Chen",
    //     date: "07/22/2005",
    //     giftType: "Toys"
    // }

    // Change the input date to 07/22/2005 instead of 2005-07-22
    const inputDate = event.target.date ? event.target.date.value : "";

    // Check if inputDate is not empty before splitting
    const parts = inputDate ? inputDate.split("-") : ["", "", ""];

    // Format the date if it's not empty, otherwise set it to an empty string
    const formattedDate = inputDate
      ? `${parts[1]}/${parts[2]}/${parts[0]}`
      : "";

    const newCard = {
      name: event.target.companyName.value,
      locationImage: "vfc/src/app/assets/justinchen.jpg",
      location: event.target.location.value,
      cityState: event.target.cityState.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
      poc: event.target.poc.value,
      date: formattedDate,
      giftType: event.target.giftType.value,
      link: event.target.link.value
    };

    // const newCard = {
    //   name: event.target.name.value,
    //   locationImage: "vfc/src/app/assets/codebase.jpg", // default img if no location img uploaded
    //   location: event.target.location.value,
    //   cityState: event.target.cityState.value,
    //   phone: event.target.phone.value,
    //   email: event.target.email.value,
    //   poc: event.target.poc.value,
    //   date: event.target.date.value,
    //   giftType: event.target.giftType.value,
    // };

    console.log(newCard);

    const reader = new FileReader();
    const locImg = event.target.locationImage.files[0];

    if (locImg) {
      // Read and process the file
      reader.onloadend = () => {
        newCard.locationImage = reader.result; // If image uploaded, change location image
        setData((prevData) => [...prevData, newCard]);
        setnewIsOpen(false);
      };
      reader.readAsDataURL(locImg);
    } else {
      // Handle the case where no image is provided
      newCard.locationImage = "/assets/aqua.jpg"; // Set a default image path
      setData((prevData) => [...prevData, newCard]);
      setnewIsOpen(false);
    }
    console.log(newCard);
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
          <p className="x" onClick={handleNewCick}>
            X
          </p>
        </div>
        <div className="titleContainer">
          <p className="newTitle">Add New Partnership</p>
        </div>
        <div className="inputs">
          {/* <form action="submit_contact_form.php"> */}
          <form className="allInputs" onSubmit={submitForm}>
            <div className='columns'>
              <div className = 'col1'>
                <div className="companyName">
                    <div className="form-group">
                      <label for="name"><b>Company Name: </b></label>
                      <input
                        type="text"
                        id="name"
                        name="companyName"
                        placeholder="Enter Company Name"
                        required
                      ></input>
                    </div>
                </div>

                <div className="form-group">
                  <label id="phone" for="phone">
                    <b>Phone Number:</b>
                  </label>
                  <input
                    type="number"
                    id="name"
                    name="phone"
                    placeholder="Enter Phone Number"
                    required
                  ></input>
                </div>

                <div className="form-group">
                  <label id="date" for="date">
                    <b>Date:</b>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    max={maxDate}
                    required
                  ></input>
                </div>
                
                <div className="form-group">
                  <label htmlFor="cityState"><b>City/State: </b></label>
                  <select id="cityState" name="cityState" required>
                    <option value="">Select City/State</option>
                    <option value="Riverside, CA">Riverside, CA</option>
                    <option value="San Diego, CA">San Diego, CA</option>
                    {/* Add more options as needed */}
                  </select>
                </div>

                <div className="form-group">
                  <label for="locationImage"><b>Log Link</b></label>
                  <input
                    type="url"
                    id="name"
                    name="link"
                    placeholder="https://example.com"
                    required
                  ></input>
                </div>

              </div>

              <div className = 'col2'>
                <div className="contacts">
                  <div className="form-group">
                    <label for="poc"><b>Point of Contact (POC): </b></label>
                      <input
                        type="text"
                        id="name"
                        name="poc"
                        placeholder="Enter POC Name"
                        required
                      >
                      </input>
                    </div>
                  </div>

                  <div className="form-group">
                  <label for="email"><b>Email: </b></label>
                  <input
                    type="email"
                    id="name"
                    name="email"
                    placeholder="Enter Email"
                    required
                  ></input>
                  </div>
                
                <div className="form-group">
                  <label for="address"><b>Address: </b></label>
                  <input
                    type="text"
                    id="name"
                    name="location"
                    placeholder="Enter Company Address"
                    required
                  ></input>
                </div>


                <div className="form-group">
                  <label for="giftType"><b>Gift Type: </b></label>
                  <input
                    type="text"
                    id="name"
                    name="giftType"
                    placeholder="Enter gift type"
                    required
                  ></input>
                </div>


                  <div className="form-group">
                  <label for="locationImage"><b>[OPTIONAL] Company Image: </b></label>
                  <input
                    type="file"
                    id="locationImage"
                    name="locationImage"
                  ></input>
                </div>
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










{/* <div className="row1">
              <div className="companyName">
                <div className="form-group">
                  <label for="name"><b>Company Name: </b></label>
                  <input
                    type="text"
                    id="name"
                    name="companyName"
                    placeholder="Enter Company Name"
                    required
                  ></input>
                </div>
              </div>

              <div className="contacts">
                <div className="form-group">
                  <label for="poc"><b>Point of Contact (POC): </b></label>
                  <input
                    type="text"
                    id="name"
                    name="poc"
                    placeholder="Enter POC Name"
                    required
                  ></input>
                </div>
              </div>

              <div className="form-group">
                <label for="email"><b>Email: </b></label>
                <input
                  type="email"
                  id="name"
                  name="email"
                  placeholder="Enter Email"
                  required
                ></input>
              </div>
              <div className="form-group">
                <label for="address"><b>Address: </b></label>
                <input
                  type="text"
                  id="name"
                  name="location"
                  placeholder="Enter Company Address"
                  required
                ></input>
              </div>


              <div className="form-group">
                <label for="giftType"><b>Gift Type: </b></label>
                <input
                  type="text"
                  id="name"
                  name="giftType"
                  placeholder="Enter gift type"
                  required
                ></input>
              </div>

              <div className="form-group">
                <label for="address"><b>Address: </b></label>
                <input
                  type="text"
                  id="name"
                  name="location"
                  placeholder="Enter Company Address"
                  required
                ></input>
              </div>

            </div>
            
            <div className="row2">
              <div className="form-group">
                <label id="phone" for="phone">
                  <b>Phone Number:</b>
                </label>
                <input
                  type="number"
                  id="name"
                  name="phone"
                  placeholder="Enter Phone Number"
                  required
                ></input>
              </div>

              <div className="form-group">
                <label for="email"><b>Email: </b></label>
                <input
                  type="email"
                  id="name"
                  name="email"
                  placeholder="Enter Email"
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
                  required
                ></input>
              </div>

              {/* <div className="form-group">
                <label for="address"><b>Address: </b></label>
                <input
                  type="text"
                  id="name"
                  name="location"
                  placeholder="Enter Company Address"
                  required
                ></input>
              </div> */}

            //   <div className="form-group">
            //     <label for="giftType"><b>Gift Type: </b></label>
            //     <input
            //       type="text"
            //       id="name"
            //       name="giftType"
            //       placeholder="Enter gift type"
            //       required
            //     ></input>
            //   </div>
            // </div>
            // <div className="row4">
            //   <div className="form-group">
            //     <label htmlFor="cityState"><b>City/State: </b></label>
            //     <select id="cityState" name="cityState" required>
            //       <option value="">Select City/State</option>
            //       <option value="Riverside, CA">Riverside, CA</option>
            //       <option value="San Diego, CA">San Diego, CA</option>
            //       {/* Add more options as needed */}
            //     </select>
            //   </div>
            //   {/* <div className="form-group">
            //     <label for="giftType"><b>Gift Type: </b></label>
            //     <input
            //       type="text"
            //       id="name"
            //       name="giftType"
            //       placeholder="Enter gift type"
            //       required
            //     ></input>
            //   </div> */}
            // </div>
            // <div className="row5">
            //   <div className="form-group">
            //     <label for="locationImage"><b>Log Link</b></label>
            //     <input
            //       type="url"
            //       id="name"
            //       name="link"
            //       placeholder="https://example.com"
            //       required
            //     ></input>
            //   </div>
            //   <div className="form-group">
            //     <label for="locationImage"><b>[OPTIONAL] Company Image: </b></label>
            //     <input
            //       type="file"
            //       id="locationImage"
            //       name="locationImage"
            //     ></input>
            //   </div>
            // </div> */}