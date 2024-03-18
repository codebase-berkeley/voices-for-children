import { Rowdies } from 'next/font/google';
import './entrypopup.css';

function EntryPopup () {
    const [visible, setVisible] = useState(true);
    function hide() {
        setVisible(false);
    }
    return (
        <div className="popup">
            <div className="create-new-bar">
                <h1 className="create-new-text">New Donation</h1>
                <img src="./apple-touch-icon.png" onClick={hide} ></img>
            </div>
            <form>
                <input type="text" placeholder="Donation Name" id="name"></input>
                <input type="text" placeholder="Donor" id="donor"></input>
                <div className="form-container">
                    <input type="text" placeholder="Donation Type" id="type"></input>
                    <input type="text" placeholder="Amount" id="amt"></input>
                    <input type="date" placeholder="Date" id="date"></input>
                </div>
                <span className="popup-text">Description</span>
                <input type="text" placeholder="Thank you details, item usage, etc." id="desc"></input>
                <input type="submit" id = "submit"></input>
            </form>
        </div>
    )
}

export default EntryPopup;