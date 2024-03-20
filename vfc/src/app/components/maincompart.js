"use client"
import React, { useState } from 'react'; 
import "./maincompart.css"



function MainComPart() {

        
    const [currFilters, setCurrFilters] = useState([])    
    const [isOpen, setIsOpen] = useState(false)
    const [isOpen1, setIsOpen1] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)
    const locations = ['San Diego', 'other one'];
    const date = ['December 2023', 'November 2023', 'October 2023', 'September 2023', 'August 2023', 'July 2023', 'June 2023', 'May 2023', 'April 2023' ];
    const giftType = ['Toys', 'Food', 'Money', 'Alochol', 'Weed']
    const [isDisplayed, setIsDisplayed] = useState(false);
    //adds the filters to a list to be applied and displayed on the screen top
    
    function handleChange(e) {
        if (e.target.checked) {
            // If the checkbox is checked, add its value to the currFilters array
            setCurrFilters([...currFilters, e.target.value]);
        } else {
            // If the checkbox is unchecked, remove its value from the currFilters array
            setCurrFilters(currFilters.filter((item) => item !== e.target.value));
        }
    }

    //removes filter when it is clicked in the card box area
    const removeFilter = (filterToRemove) => {
        setCurrFilters(currFilters.filter((filter) => filter !== filterToRemove));
      };
    

     const showFilters = () => {
        setIsDisplayed(!isDisplayed);
     } 

    return (
      
    <div>
        {/* top of page */}
        <div class = "top-of-page">
        <div class = "logo">
        <img src="https://www.speakupnow.org/wp-content/uploads/2021/05/voices-for-children-logo-color.png" alt="My Image Description" 
        
                style  = {{
                        display: 'flex',
                        width: '20vh',
                        height: 'auto', 
                }}
                />
                

        </div>
        </div>

        

        {/* bottom of page */}
        <div class = "bottom-of-page">
        
        {/* side bar of ALL filters */}
        <div class = "all-filters">

        {/* start of filter */}
        <div class = "each-filter">
            <button onClick={() => setIsOpen((prev) => !prev)}
             class = "button"> 
             {!isOpen ?  
                <img src = "https://static.thenounproject.com/png/551749-200.png" style = {{width: '1.7vh', height: '1.2vh'}} /> 
                : <img src = "https://static.thenounproject.com/png/1240272-200.png" style = {{width: '1.7vh', height: '1.2vh'}} />
               }<h5> Location </h5>
             </button>

             {isOpen && (
                <div class = "list">
                     {locations.map((location, index) => (
                    <div key={index} className="list-item">
                            <input value = {`${location}`} type="checkbox" id={`location-${index}`} onChange = {handleChange} />
                            <label htmlFor={`location-${index}`} style={{marginLeft: '8px'}}>
                            {location}
                            </label>
                         </div>
                        ))}
                </div>
             )}
        </div>
        {/* end of filter */}

                
        {/* start of filter */}
        <div class = "each-filter">
            <button onClick={() => setIsOpen1((prev) => !prev)}
             class = "button"> 
             {!isOpen1 ? 
                 <img src = "https://static.thenounproject.com/png/551749-200.png" style = {{width: '1.7vh', height: '1.2vh'}} /> 
                 : <img src = "https://static.thenounproject.com/png/1240272-200.png" style = {{width: '1.7vh', height: '1.2vh'}} />
               } <h5>Month  /  Year</h5>
             </button>

             {isOpen1 && (
                <div class = "list">
                     {date.map((date, index) => (
                    <div key={index} className="list-item">
                            <input value = {`${date}`} type="checkbox" id={`location-${index}`} onChange = {handleChange} />
                            <label htmlFor={`location-${index}`} style={{marginLeft: '8px'}}>
                            {date}
                            </label>
                         </div>
                        ))}
                </div>
             )}
        </div>
        {/* end of filter */}

        {/* start of filter */}
        <div class = "each-filter">
            <button onClick={() => setIsOpen2((prev) => !prev)}
             class = "button"> 
             {!isOpen2 ? 
                 <img src = "https://static.thenounproject.com/png/551749-200.png" style = {{width: '1.7vh', height: '1.2vh'}} /> 
                 : <img src = "https://static.thenounproject.com/png/1240272-200.png" style = {{width: '1.7vh', height: '1.2vh'}} />
               } <h5>Gift  Type</h5>
             </button>

             {isOpen2 && (
                <div class = "list">
                     {giftType.map((giftType, index) => (
                        <div key={index} className="list-item">
                            <input value = {`${giftType}`} type="checkbox" id={`location-${index}&nbsp;`} onChange = {handleChange} />
                            <label htmlFor={`location-${index}`} style={{marginLeft: '8px'}}>
                            {giftType}
                            </label>
                         </div>
                        ))}
                </div>
             )}
        </div>
        {/* end of filter */}

     <div> 
        <button class = "apply-button" onClick={showFilters}> Show Filters </button>
        {/* {isDisplayed && currFilters} */}
     </div> 
     </div>

     {/* end of ALL filter */}

     {/* This is where all the cards go */}
     <div class = "main-card-box">
        <div class = "card-box-top">
                {isDisplayed && (
                <div class="filter-buttons-container">
                {currFilters.map((filter, index) => (
                        <button
                        key={index}
                        class="small-filter-button"
                        onClick={() => removeFilter(filter)}
                        >
                        {filter} <span class="close-icon">x</span>
                        </button>
                ))}
                </div>
                )}  
        </div>

        <div>Hello world!</div>
     </div>
     
 
     
     </div>
     {/* end bottom of page */}

     </div>
    );
}


export default MainComPart;