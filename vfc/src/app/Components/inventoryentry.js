import "./inventoryentry.css";


function InventoryEntry(props) {
  return (
    <div className="entry-wrapper">
      <div className="box">
        <h2 className="entry">{props.donor}</h2>
      </div>
      <div className="box">
        <h2 className="entry">{props.item_donated}</h2>
      </div>
      <div className="box">
        <h2 className="entry">{props.item_type}</h2>
      </div>
      <div className="box">
        <h2 className="entry">{props.amount}</h2>
      </div>
      <div className="box">
        <h2 className="entry">{props.date}</h2>
      </div>
      <div className="box">
        <h2 className="entry">{props.thanked}</h2>
      </div>
    </div>
  );
}

export default InventoryEntry;
