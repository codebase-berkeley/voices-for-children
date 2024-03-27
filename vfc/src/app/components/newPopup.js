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
      name: event.target.name.value,
      locationImage: "vfc/src/app/assets/justinchen.jpg",
      location: event.target.location.value,
      cityState: event.target.cityState.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
      poc: event.target.poc.value,
      date: formattedDate,
      giftType: event.target.giftType.value,
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
          <form onSubmit={submitForm}>
            <div className="companyName">
              <div className="form-group">
                <label for="name">Company Name: </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Company Name"
                  required
                ></input>
              </div>
            </div>
            <div className="contacts">
              <div className="form-group">
                <label for="poc">Point of Contact: </label>
                <input
                  type="text"
                  id="poc"
                  name="poc"
                  placeholder="Enter POC Name"
                  required
                ></input>
              </div>

              <div className="form-group">
                <label id="phone" for="phone">
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter Phone Number"
                  required
                ></input>
              </div>

              <div className="form-group">
                <label for="email">Email: </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  required
                ></input>
              </div>

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

              <div className="form-group">
                <label for="address">Address: </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter Company Address"
                  required
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="cityState">
                  City/State (ex. San Jose, CA):{" "}
                </label>
                <select id="cityState" name="cityState" required>
                  <option value="">Select City/State</option>
                  <option value="San Jose, CA">San Jose, CA</option>
                  <option value="San Diego, CA">San Diego, CA</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
            <div className="giftImage">
              <div className="form-group">
                <label for="giftType">Gift Type: </label>
                <input
                  type="text"
                  id="giftType"
                  name="giftType"
                  placeholder="Enter gift type"
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
