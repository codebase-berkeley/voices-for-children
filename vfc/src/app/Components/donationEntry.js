import "./inventoryentry.css";
function DonationEntry(props) {
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
