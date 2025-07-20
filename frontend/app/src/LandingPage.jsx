
import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => (
  <div className="landing-container">
    <div className="landing-content">
      <h1>Welcome to Civic Commons!</h1>
      <p>Join our community to access civic resources and collaborate for a better future.</p>
      <Link to="/signup" className="signup-btn">Sign Up</Link>
    </div>
  </div>
);

export default LandingPage;
