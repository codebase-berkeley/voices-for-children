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
import Donation from "./donation";
import MainComPart from ".";
import { Main } from "next/document";

const msalInstance = new PublicClientApplication(msalConfig);

function Login( {Component} ) {
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
    console

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
    return (
      <button onClick={() => handleLogout()}>Logout</button>
    );
  }

  async function sasha() {
    if (!isAuthenticated && inProgress === InteractionStatus.None) {
      console.log("Login process not in progress. Initiating login...");
      console.log("inside sasha function");
      console.log("what is inprogress", inProgress);
      await handleLogin();
    }
  }
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
            <button onClick={() => sasha()}>Login</button>
          </div>
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
          <Component />
          <LogoutButton />
        </AuthenticatedTemplate>
      </div>
  );
}

function LoginPage( {Component}) {
  return (
    <MsalProvider instance={msalInstance}>
      <Login Component={MainComPart}/>
    </MsalProvider>
  );
}

export default LoginPage;
