import "./inventoryentry.css";
import React from "react";

function DonationEntry(props) {
  const [isTooltipVisible, setIsTooltipVisible] = React.useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };
  
  return (
    <div className="entry-wrapper">
      <div className="box">
        <h2 className="entry">{props.name}</h2>
      </div>
      <div className="box">
        <h2 className="entry">{props.type}</h2>
      </div>

      <div className="box">
        <h2 className="entry">{props.amount}</h2>
      </div>
      <div className="box">
        <h2 className="entry">{props.instock}</h2>
      </div>
    </div>
  );
}

export default DonationEntry;
