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

  const submitForm = async (event) => {
    event.preventDefault();

    // Change the input date to 07/22/2005 instead of 2005-07-22
    const inputDate = event.target.date ? event.target.date.value : "";

    // Check if inputDate is not empty before splitting
    const parts = inputDate ? inputDate.split("-") : ["", "", ""];

    // Format the date if it's not empty, otherwise set it to an empty string
    const formattedDate = inputDate
      ? `${parts[1]}/${parts[2]}/${parts[0]}`
      : "";

    const newCard = {
      id: prevData.length + 1,
      name: event.target.companyName.value,
      image: "/assets/aqua.jpg",
      location: event.target.location.value,
      citystate: event.target.cityState.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
      poc: event.target.poc.value,
      date: formattedDate,
      gifttype: event.target.giftType.value,
      link: event.target.link.value,
    };

    const reader = new FileReader();
    const locImg = event.target.locationImage.files[0];

    // USE THIS PART OF THE CODE TO CHANGE THE IMAGE
    if (locImg) {
      // Read and process the file
      reader.onloadend = () => {
        newCard.image = reader.result; // If image uploaded, change location image
        setData((prevData) => [...prevData, newCard]);
        setnewIsOpen(false);
        console.log(newCard);
      };
      reader.readAsDataURL(locImg);
    //WHEN THERE IS NO IMAGE SET DEFAULT AQUA
    } else {
      // Handle the case where no image is provided
      newCard.image = "/assets/aqua.jpg"; // Set a default image path
      setData((prevData) => [...prevData, newCard]);
      setnewIsOpen(false);
    }

    console.log("newCard:" + newCard);

    try {
      // Fetch data here
      const response = await fetch("/api/postPartnership", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: event.target.companyName.value,
          location: event.target.location.value,
          citystate: event.target.cityState.value,
          phone: event.target.phone.value,
          email: event.target.email.value,
          poc: event.target.poc.value,
          date: formattedDate,
          gifttype: event.target.giftType.value,
          link: event.target.link.value,
          image: newCard.image,
        }),
      });

      const { id } = await response.json();
      newCard.id = id;
      console.log("posted new id: ", id);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

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
            <div className="row1">
              <div className="companyName">
                <div className="form-group">
                  <label for="name">Company Name: </label>
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
                  <label for="poc">POC: </label>
                  <input
                    type="text"
                    id="name"
                    name="poc"
                    placeholder="Enter POC Name"
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
              <div className="form-group">
                <label for="address">Address: </label>
                <input
                  type="text"
                  id="name"
                  name="location"
                  placeholder="Enter Company Address"
                  required
                ></input>
              </div>
            </div>
            <div className="row4">
              <div className="form-group">
                <label htmlFor="cityState">City/State: </label>
                <select id="cityState" name="cityState" required>
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
