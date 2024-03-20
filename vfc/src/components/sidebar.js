"use client";
import React, { useState } from 'react';


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);


return (
    <div class = "sidebar">
        <div class = "dropdown-header" onClick={() => setIsOpen(!isOpen)}>
            <span>Dropdown</span>
            <span>{isOpen ? '▲' : '▼'}</span>
            <div/>
            {isOpen && (
            <div className="dropdown-content">
                {[...Array(5)].map((_, i) => (
                <div key={i}>
                    <label>
                        <input type="checkbox" />
                        {' '}Option {i + 1}
                    </label>
                </div>
                ))}
            </div>
        )}
      </div>
        </div>

);

};

// function Filter({filterName, options}) {

// }

// export default function Sidebar() {

// }



export default Sidebar;