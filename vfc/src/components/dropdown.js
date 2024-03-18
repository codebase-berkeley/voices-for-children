"use client"
import React, { useState } from 'react'; 
import "../components/dropdown.css"
import vfclogo from "../assets/vfclogo.png";
import random from "../assets/random.png";
import Image from 'next/image';
function Dropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpen1, setIsOpen1] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)
    const locations = ['Berkeley', 'Fremont', 'Los Angeles', 'San Diego', 'Atlanta', 'New Delhi', 'New York City', 'San Leandro', 'Lima'];
    const date = ['December 2023', 'November 2023', 'October 2023', 'September 2023', 'August 2023', 'July 2023', 'June 2023', 'May 2023', 'April 2023' ];
    const giftType = ['Toys', 'Food', 'Money', 'Alochol', 'Weed']
    return (
    <div class = "sidebar-page">
        <div class = "logo">
        <img src="https://www.speakupnow.org/wp-content/uploads/2021/05/voices-for-children-logo-color.png" alt="My Image Description" 
        
                style  = {{
                        display: 'flex',
                        width: '20vh',
                        height: 'auto', 
                }}
                />
                

        </div>
        <div class = "dropdowns">
        <div class = "column">
            <button onClick={() => setIsOpen((prev) => !prev)}
             class = "button"> 
             {!isOpen ?  
                <img src = "https://static.thenounproject.com/png/551749-200.png" style = {{width: '1.7vh', height: '1.2vh'}} /> 
                : <img src = "https://static.thenounproject.com/png/1240272-200.png" style = {{width: '1.7vh', height: '1.2vh'}} />
               } &nbsp; <h5> Location </h5>
             </button>

             {isOpen && (
                <div class = "list">
                     {locations.map((location, index) => (
                    <div key={index} className="list-item">
                            <input type="checkbox" id={`location-${index}`} />
                            <label htmlFor={`location-${index}`} style={{marginLeft: '8px'}}>
                            {location}
                            </label>
                         </div>
            ))}
    </div>
             )}
     </div>

     <div class = "column">
            <button onClick={() => setIsOpen1((prev) => !prev)}
             class = "button"> 
             {!isOpen1 ? 
                 <img src = "https://static.thenounproject.com/png/551749-200.png" style = {{width: '1.7vh', height: '1.2vh'}} /> 
                 : <img src = "https://static.thenounproject.com/png/1240272-200.png" style = {{width: '1.7vh', height: '1.2vh'}} />
               } &nbsp; <h5> Month  /  Year </h5>
             </button>

             {isOpen1 && (
                <div class = "list">
                     {date.map((date, index) => (
                    <div key={index} className="list-item">
                            <input type="checkbox" id={`location-${index}`} />
                            <label htmlFor={`location-${index}`} style={{marginLeft: '8px'}}>
                            {date}
                            </label>
                         </div>
            ))}
    </div>
             )}
     </div>

     <div class = "column">
            <button onClick={() => setIsOpen2((prev) => !prev)}
             class = "button"> 
             {!isOpen2 ? 
                 <img src = "https://static.thenounproject.com/png/551749-200.png" style = {{width: '1.7vh', height: '1.2vh'}} /> 
                 : <img src = "https://static.thenounproject.com/png/1240272-200.png" style = {{width: '1.7vh', height: '1.2vh'}} />
               } &nbsp; <h5>  Gift  Type </h5>
             </button>

             {isOpen2 && (
                <div class = "list">
                     {giftType.map((giftType, index) => (
                    <div key={index} className="list-item">
                            <input type="checkbox" id={`location-${index}`} />
                            <label htmlFor={`location-${index}`} style={{marginLeft: '8px'}}>
                            {giftType}
                            </label>
                         </div>
            ))}
    </div>
             )}
     </div>
     </div>
     <div> 
     <button class = "apply-button"> Apply Filters</button>
     </div>








     </div>
    );
}


export default Dropdown;