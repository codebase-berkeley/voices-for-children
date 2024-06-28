import "./navbar.css";
// import TextField from "@mui/material/TextField";
import Link from 'next/link'
import { useState } from "react";
// import { Nav } from "react-bootstrap";
// import { useRouter } from "next/router";

export default function Navbar(props) {
  const [navbar, setNavbar] = useState("community");

  console.log(navbar);

  return (
    <div class="navbarTop">
      <div className="navbarTip">
        <div className="list">
            <img
              src="https://www.speakupnow.org/wp-content/uploads/2021/05/voices-for-children-logo-color.png"
              alt="My Image Description"
              className="voices-for-children-logo"
            />
        </div>
        <div className="navbar-things">
          <div className="clist">
            <Link className="link" style={{ textDecoration: "none" }} href="/">
              <p
                id={props.onCommunity ? "goBlue" : ""}
                onClick={() => setNavbar("community")}
              >
                Community Partnerships
              </p>
            </Link>          
          </div>
          <div className="lists">
            <Link
              className="link"
              style={{ textDecoration: "none" }}
              href="/in-kind-donations"
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
          </div>
        </div>
      </div>
    </div>
  );
}
