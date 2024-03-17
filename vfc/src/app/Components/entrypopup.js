import { Rowdies } from 'next/font/google';
import './entrypopup.css';

function EntryPopup () {
    return (
        <div className="popup">
            <div className="create-new-bar">
                <h1 className="create-new-text">New Donation</h1>
            </div>
            <form>
                <input type="text" placeholder="Donation Name"></input>
                <input type="text" placeholder="Donor"></input>
                <input type="text" placeholder="Donation Type"></input>
                <input type="text" placeholder="Amount"></input>
                <input type="text" placeholder="Date"></input>
                <span className="popup-text">Description</span>
                <input type="text" placeholder="Thank you details, item usage, etc."></input>
            </form>
        </div>
    )
}

export default EntryPopup;