"use client";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../nav";

export default function Summary() {
  const storedSummary = localStorage.getItem("summary");
  const initialSummary = storedSummary ? storedSummary : "";

  const [summary, setSummary] = useState(initialSummary);
  const handleChange = (e) => {
    setSummary(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(summary);
    localStorage.setItem("summary", summary);
    alert("Saved!");
  };

  return (
    <div>
      <Navbar activepath="/create/summary" />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="summary">Professional Summary:</label>
          <textarea
            id="summary"
            name="summary"
            value={summary}
            onChange={handleChange}
            required
          ></textarea>

          <div className="buttonContainer">
            <button type="submit">Save</button>
            <Link href="/create/review">
              <button type="submit">Next</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
