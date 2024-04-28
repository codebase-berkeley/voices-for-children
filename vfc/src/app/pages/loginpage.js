"use client";
import "./loginpage.css";
import { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from "../authConfig";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

function LoginPage() {
  const {instance} = useMsal();
  const [accountDetails, setAccountDetails] = useState(null);

  function handleLogin() {
    instance.loginPopup(loginRequest).catch(e => {
      console.log('Error loggin in', e);
    }).then((response) => {
      console.log('Login returned', response);

      setAccountDetials({ name: resopnse?.account?.name })
    })
  }
  return (
    <div className = "login"> <div class = "logo">
    <img src="https://www.speakupnow.org/wp-content/uploads/2021/05/voices-for-children-logo-color.png" alt="My Image Description" 
    
            style  = {{
                    display: 'flex',
                    width: '20vh',
                    height: 'auto', 
            }}
            />
    </div>
      <div className="login-container">
        <AuthenticatedTemplate className="login-form">
          <h6>You're logged in!</h6>

          <button onClick={() => handleLogout()}>Logout</button>
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <h6>You're logged out!</h6>

          <button onClick={() => handleLogin()}>Logout</button>
        </UnauthenticatedTemplate>
      </div>
    </div>
    );
};

export default LoginPage