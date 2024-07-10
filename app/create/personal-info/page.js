"use client";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../nav";
import { Required, RequiredText } from "../component";

export default function PersonalInfo() {
  const storedPersonalInfo = localStorage.getItem("personalInfo");
  const initialPersonalInfo = storedPersonalInfo
    ? JSON.parse(storedPersonalInfo)
    : {
        name: "",
        email: "",
        phone: "",
        url: "",
        website: "",
      };

  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);

  const handleChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("personalInfo", JSON.stringify(personalInfo));

    alert("Saved!");
    console.log(personalInfo);
  };

  return (
    <div>
      <Navbar activepath="/create/personal-info" />
      <div className="container">
        <form className="form" id="personalInfoForm" onSubmit={handleSubmit}>
          <label htmlFor="name" className="label">
            Name: <Required />
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={personalInfo.name}
            onChange={handleChange}
            className="input"
            required
          />

          <label htmlFor="email" className="label">
            Email: <Required />
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
            className="input"
            required
          />

          <label htmlFor="phone" className="label">
            Phone: <Required />
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            className="input"
            required
          />
          <label htmlFor="phone" className="label">
            LinkedIn URL:
          </label>
          <input
            type="text"
            id="url"
            name="url"
            value={personalInfo.url}
            onChange={handleChange}
            className="input"
          />
          <label htmlFor="phone" className="label">
            Personal Website or Relevant Link
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={personalInfo.website}
            onChange={handleChange}
            className="input"
          />

          <div className="buttonContainer">
            <RequiredText />
            <button type="submit" className="button">
              Save
            </button>
            <Link href="/create/experience">
              <button
                type="submit"
                className="button"
                onClick={() => console.log(personalInfo)}
              >
                Next
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
