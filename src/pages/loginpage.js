"use client";
import "./loginpage.css";
import { useEffect, useState } from "react";
import {
  PublicClientApplication,
  InteractionStatus,
} from "@azure/msal-browser";
import { MsalProvider, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { authScopes, msalConfig } from "../app/authConfig";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import MainComPart from "./index";
import microsoftLogo from '../../public/assets/microsoftlogo.svg';

const msalInstance = new PublicClientApplication(msalConfig);

function Login() {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts, inProgress } = useMsal();

  const handleLogin = async () => {
    try {
      const response = await instance.loginPopup(authScopes);
      console.log("login successful!", response);
      instance.setActiveAccount(response.account);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = async () => {
    try {
      await instance.logoutPopup();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is authenticated.");
    }
  }, [isAuthenticated]);

  return (
    <div className="login">
      <UnauthenticatedTemplate>
        <div className="logo">
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
          <div className="login-container-right">
            <div className="vfc-text">
              Voices for <span className="bold-text">Children.</span>
            </div>
            <div className="login-text">
              Please sign in with an administrative account to access additional features.
            </div>
            <button className="login-button-lp" onClick={handleLogin}>
              <img
                src={"/assets/microsoftlogo.svg"}
                alt="Microsoft logo"
                className="microsoft-logo"
              />
              <span className="button-text">Sign in with Microsoft</span>
            </button>
          </div>
        </div>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <MainComPart />
        <button onClick={handleLogout}>Logout</button>
      </AuthenticatedTemplate>
    </div>
  );
}

function LoginPage() {
  return (
    <MsalProvider instance={msalInstance}>
      <Login />
    </MsalProvider>
  );
}

export default LoginPage;