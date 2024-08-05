import "./navbar.css";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Nav } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Navbar(props) {
  const [navbar, setNavbar] = useState("community");

  console.log(navbar);

  return (
    <div class="navbarTop">
      <ul className="navbarTip">
        <li className="list">
          <Link className="link" style={{ textDecoration: "none" }} to="/">
            <img
              src="https://www.speakupnow.org/wp-content/uploads/2021/05/voices-for-children-logo-color.png"
              alt="My Image Description"
              className="voices-for-children-logo"
            />
          </Link>
        </li>
        <div className="navbar-things">
          <li className="clist">
            <Link className="link" style={{ textDecoration: "none" }} to="/">
              <p
                id={props.onCommunity ? "goBlue" : ""}
                onClick={() => setNavbar("community")}
              >
                Community Partnerships
              </p>
            </Link>          
          </li>
          <li className="lists">
            <Link
              className="link"
              style={{ textDecoration: "none" }}
              to="/home"
            >
              <p
                id={!props.onCommunity ? "goBlue" : ""}
                onClick={() => setNavbar("donation")}
              >
                {/* <p
                id={navbar === "donation" ? "goBlue" : ""}
                onClick={() => setNavbar("donation")}
              > */}
                In-Kind Donation
              </p>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
}
