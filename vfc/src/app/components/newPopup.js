import "./newPopup.css";

export default function NewPopup({
  newIsOpen,
  setnewIsOpen,
  prevData,
  setData,
}) {
  const handleNewClick = () => {
    setnewIsOpen(!newIsOpen);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch("/api/postPartnership", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("posted new id: ", result.id);

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
          <p className="popupTitle">Add New Partnership</p>
          <p className="x" onClick={handleNewClick}>
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
