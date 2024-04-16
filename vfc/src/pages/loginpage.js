"use client";
import "./loginpage.css";
function LoginPage() {
    
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
          <form className="login-form">
            <div class = "submit-button"> 
            <button type ="submit">Submit</button>
            </div>
          </form>
        </div>
        </div>
      );
};

export default LoginPage