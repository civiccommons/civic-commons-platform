'use client';

import { useState } from 'react';
import Tesseract from 'tesseract.js';

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    licenseNumber: "",
    licenseType: "",
    licenseIssuer: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrError, setOcrError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOcrLoading(true);
    setOcrError("");
    try {
      const { data: { text } } = await Tesseract.recognize(file, "eng");
      // Simple regex-based parsing (customize as needed)
      const licenseNumberMatch = text.match(/License\s*Number[:\s]*([A-Za-z0-9\-]+)/i);
      const licenseTypeMatch = text.match(/License\s*Type[:\s]*([A-Za-z ]+)/i);
      const licenseIssuerMatch = text.match(/Issuer[:\s]*([A-Za-z ]+)/i);
      setForm((prev) => ({
        ...prev,
        licenseNumber: licenseNumberMatch ? licenseNumberMatch[1].trim() : prev.licenseNumber,
        licenseType: licenseTypeMatch ? licenseTypeMatch[1].trim() : prev.licenseType,
        licenseIssuer: licenseIssuerMatch ? licenseIssuerMatch[1].trim() : prev.licenseIssuer,
      }));
    } catch (err) {
      setOcrError("Could not parse license image. Please enter details manually.");
    } finally {
      setOcrLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock license validation logic (replace with real API call as needed)
    // For now, just mark as submitted
    setSubmitted(true);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {submitted ? (
          <div className="success-message" role="alert" aria-live="polite">
            Thank you for signing up!
          </div>
        ) : (
          <>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
              aria-required="true"
            />
            
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
              required
              aria-required="true"
            />
            
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a secure password"
              value={form.password}
              onChange={handleChange}
              required
              aria-required="true"
            />
            
            <label htmlFor="licensePhoto">Upload License Photo</label>
            <input
              type="file"
              id="licensePhoto"
              accept="image/*"
              onChange={handleFileChange}
              aria-describedby="ocr-status"
            />
            
            <div id="ocr-status" aria-live="polite">
              {ocrLoading && <div className="loading-message">Parsing license image...</div>}
              {ocrError && <div className="error-message">{ocrError}</div>}
            </div>
            
            <label htmlFor="licenseNumber">License Number</label>
            <input
              type="text"
              id="licenseNumber"
              name="licenseNumber"
              placeholder="Enter license number"
              value={form.licenseNumber}
              onChange={handleChange}
              required
              aria-required="true"
            />
            
            <label htmlFor="licenseType">License Type</label>
            <input
              type="text"
              id="licenseType"
              name="licenseType"
              placeholder="e.g., Driver's License, Professional License"
              value={form.licenseType}
              onChange={handleChange}
              required
              aria-required="true"
            />
            
            <label htmlFor="licenseIssuer">License Issuer</label>
            <input
              type="text"
              id="licenseIssuer"
              name="licenseIssuer"
              placeholder="e.g., State of California, Professional Board"
              value={form.licenseIssuer}
              onChange={handleChange}
              required
              aria-required="true"
            />
            
            <button type="submit">Create Account</button>
          </>
        )}
      </form>
    </div>
  );
}
