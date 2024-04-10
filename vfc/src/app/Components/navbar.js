import "./navbar.css";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div class="navbarTop">
      <ul className="navbarTip">
        <li>
          <Link className="link" style={{ textDecoration: "none" }} to="/">
            <img
              src="https://www.speakupnow.org/wp-content/uploads/2021/05/voices-for-children-logo-color.png"
              alt="My Image Description"
              style={{
                width: "20vh",
                height: "auto",
              }}
            />
          </Link>
        </li>
        <li className="routers">
          <Link
            className="link"
            style={{ textDecoration: "none" }}
            to="/"
          >
            <div>Community Partnerships</div>
          </Link>
          <Link
            className="link"
            style={{ textDecoration: "none" }}
            to="/home"
          >
            <div>In-Kind Donation</div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
