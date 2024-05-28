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
    const formData = new FormData(event.target); // Use FormData to handle data submission including files

    try {
      const response = await fetch("/api/postPartnership", {
        method: "POST",
        body: formData, // Send formData directly
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("posted new id: ", result.id);

      // Update local state to include new partnership card
      const newCard = {
        id: result.id,
        name: formData.get("companyName"),
        location: formData.get("location"),
        citystate: formData.get("cityState"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        poc: formData.get("poc"),
        date: formData.get("date"),
        gifttype: formData.get("giftType"),
        link: formData.get("link"),
        image: result.image,
      };

      setData((prevData) => [...prevData, newCard]);
      setnewIsOpen(false);
      console.log("frontend data: ", prevData);
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
                <label htmlFor="link">Log Link</label>
                <input
                  type="url"
                  id="name"
                  name="link"
                  placeholder="https://example.com"
                  required
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="locationImage">
                  (OPTIONAL) Company Image:{" "}
                </label>
                <input
                  type="file"
                  id="locationImage"
                  name="image" // Changed from 'locationImage' to 'image'
                  accept="image/*"
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