"use client";
import "./loginpage.css";
import { useEffect, useState } from "react";
import {
  PublicClientApplication,
  EventType,
  InteractionStatus,
} from "@azure/msal-browser";
import { MsalProvider, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { authScopes, msalConfig } from "../app/authConfig";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import Donation from "./inventory";
import MainComPart from ".";
import { Main } from "next/document";
import microsoftLogo from "/public/assets/microsoftlogo.svg";

const msalInstance = new PublicClientApplication(msalConfig);

function Login({ Component }) {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts, inProgress } = useMsal();
  const [accountDetails, setAccountDetails] = useState(null);

  //   useEffect(async() => {
  //     if (!isAuthenticated && inProgress === InteractionStatus.None) {
  //       console.log("inside use effect");
  //       await instance.loginPopup();
  //     }
  // }, [isAuthenticated, inProgress, instance]);

  if (accounts.length > 0) {
    console.log("accounts", accounts);
  }

  async function handleLogin() {
    console.log("accounts", instance);
    console;

    // await instance.loginPopup;

    instance
      .loginPopup(authScopes)
      .then((response) => {
        console.log("login successful!", response);

        instance.setActiveAccount(response.account);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleLogout() {
    instance
      .logoutPopup(authScopes)
      .then((response) => {})
      .catch((e) => {
        console.log(e);
      });
  }

  function LogoutButton() {
    return <button onClick={() => handleLogout()}>Logout</button>;
  }

  async function sasha() {
    if (!isAuthenticated && inProgress === InteractionStatus.None) {
      console.log("Login process not in progress. Initiating login...");
      console.log("inside sasha function");
      console.log("what is inprogress", inProgress);
      await handleLogin();
    }
  }
  console.log("inside Login component", { Component }, isAuthenticated);
  return (
    <div className="login">
      <UnauthenticatedTemplate>
        {" "}
        <div class="logo">
          <img
            src="https://www.speakupnow.org/wp-content/uploads/2021/05/voices-for-children-logo-color.png"
            alt="My Image Description"
            style={{
              display: "flex",
              width: "20vh",
              height: "auto",
            }}
          />
        </div>
        <div className="login-container">
          {/* <div className="login-container-left">
          <img src="/assets/voices-for-children-logo-color.g" alt="VFC logo" class="vfc-logo"></img>
          <div className="vfc-text">Voices for</div>
          <div className="vfc-text-2">Children</div>
          </div> */}
          <div className = "login-container-right">
          <div className="vfc-text">Voices for <span class="bold-text">Children.</span></div>
        
            {/* <div className="login-text-header">Login</div> */}
            <div className = "login-text">Please sign in with an administrative account to access additional features.</div>
          <button className = "login-button" onClick={() => sasha()}>
          <img src="/assets/microsoftlogo.svg" alt="Microsoft logo" class="microsoft-logo"></img>
          <span className="button-text">Sign in with Microsoft</span>
            </button>
          </div>
        </div>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <Component />
        <LogoutButton />
      </AuthenticatedTemplate>
    </div>
  );
}

function LoginPage({ Component }) {
  return (
    <MsalProvider instance={msalInstance}>
      <Login Component={MainComPart} />
    </MsalProvider>
  );
}

export default LoginPage;
