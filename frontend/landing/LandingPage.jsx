import React from "react";
import "./LandingPage.css";

const LandingPage = () => (
  <div className="landing-container">
    <div className="landing-content">
      <h1>Welcome to Civic Commons!</h1>
      <p>Join our community to access civic resources and collaborate for a better future.</p>
      <a href="/signup" className="signup-btn">Sign Up</a>
    </div>
  </div>
);

export default LandingPage;
