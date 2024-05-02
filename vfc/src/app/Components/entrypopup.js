"use client";
import { Rowdies } from 'next/font/google';
import './entrypopup.css';
import { useState } from 'react';


function EntryPopup(props) {
    // Define states for each form input
    const [name, setName] = useState('');
    const [donor, setDonor] = useState('');
    const [type, setType] = useState('');
    const [amt, setAmt] = useState('');
    const [date, setDate] = useState('');
    const [desc, setDesc] = useState('');
    
    const postData = async () => {
        console.log("INSIDE POST DATA");
        
        var instock = amt > 0 ? 'Yes' : 'No';
        console.log("amount", amt)
        const response = await fetch("/api/postDonation", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                donor,
                type,
                amt,
                date,
                desc,
                instock
            }),
        });
        // return response.json();
        const data = await response.json();
        if (data.success) {
            props.onDataSubmitted();  // Call this on successful post
            handlePopupClose();
        } else {
            console.error('Failed to post data:', data.message);
        }
        
    };

    const handlePopupClose = () => {
        props.onClose();
    };

 

    return (
        <div className="popup">
            <div className="create-new-bar">
                <h1 className="create-new-text"><b>New Donation</b></h1>
                <div className="close">
                    <button id="x" onClick={handlePopupClose}><img src="apple-touch-icon.png" alt="x img"></img></button>
                </div>
            </div>
            <button onClick={postData}>trial button</button>
            <form onSubmit={(event) => {
                event.preventDefault();
                postData();
            }}>
                <input type="text" placeholder="Donation Name" id="name" name="name" value={name} onChange={e => setName(e.target.value)}></input>
                <input type="text" placeholder="Donor" id="donor" name="donor" value={donor} onChange={e => setDonor(e.target.value)}></input>
                <div className="form-container">
                    <input type="text" placeholder="Donation Type" id="type" name="type" value={type} onChange={e => setType(e.target.value)}></input>
                    <input type="text" placeholder="Amount" id="amt" name="amt" value={amt} onChange={e => setAmt(e.target.value)}></input>
                    <input type="date" placeholder="Date" id="date" name="date" value={date} onChange={e => setDate(e.target.value)}></input>
                </div>
                <div className="desc-container">
                    <span className="popup-text">Description</span>
                    <input type="text" placeholder="Thank you details, item usage, etc." id="desc" name="thanked" value={desc} onChange={e => setDesc(e.target.value)}></input>
                </div>
                <button className="submit" id="submit" type="submit">submit</button>
            </form>
        </div>
    );
}

export default EntryPopup;

// function EntryPopup ({ onClose }) {
        
//         const postData = async (event) => {  
//             console.log("INSIDE POST DATA");
//             var name = event.target.name.value;
//             var donor = document.donor.value;
//             var type = document.type.value;
//             var amt = document.amt.value;
//             var date = document.date.value;
//             var desc = document.thanked.value;
//             var instock = null;
//             if (amt > 0) {
//                 instock = 'Yes';
//             } else {
//                 instock = 'No'
//             }
        
//             console.log("TRYING TO POST INVISIBLE ERROR");
//             console.log(name, donor, type);
//             const response = await fetch("/api/postDonation", {
//             method: "POST",
//             body: JSON.stringify(
//                 name,
//                 donor,
//                 type,
//                 amt,
//                 date,
//                 desc,
//                 instock,
//             ),
//             });
//             return response.json();
            
//         };

//         // function postData() {
//         //     console.log("trying post");
//         // }
    
//         const handlePopupClose = () => {
//             onClose(); // Call the onClose function passed from Inventory to close the popup test
//         };
//         return (
//                 <div className="popup">
//                     <div className="create-new-bar">
//                         <b><h1 className="create-new-text">New Donation</h1></b>
//                         <div className="close">
//                             <button id="x" onClick={handlePopupClose}><img src="apple-touch-icon.png" alt="x img"></img></button>
//                         </div>
//                     </div>
//                     <button onClick={postData}>trial button</button>
//                     <form>
//                         <input type="text" placeholder="Donation Name" id="name" name="name"></input>
//                         <input type="text" placeholder="Donor" id="donor" name="donor"></input>
//                         <div className="form-container">
//                             <input type="text" placeholder="Donation Type" id="type" name="type"></input>
//                             <input type="text" placeholder="Amount" id="amt" name="amt"></input>
//                             <input type="date" placeholder="Date" id="date" name="date"></input>
//                         </div>
//                         <div className="desc-container">
//                             <span className="popup-text">Description</span>
//                             <input type="text" placeholder="Thank you details, item usage, etc." id="desc" name="thanked"></input>
//                             {/* <div className="submit"><input type="submit" id = "submit" onClick={postData}></input></div> */}
//                         </div>
//                     </form>
//                     <button className="submit" id = "submit" onClick={postData}>submit button</button>
//                 </div>  
//         )
// }

// export default EntryPopup;