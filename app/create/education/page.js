"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../nav";

export default function Education() {
  const storedEducation = localStorage.getItem("education");
  const initialEducation = storedEducation
    ? JSON.parse(storedEducation).map((edu) => ({
        ...edu,
        extra: Array.isArray(edu.extra) ? edu.extra : [edu.extra],
      }))
    : [
        {
          degree: "",
          institution: "",
          location: "",
          date: "",
          minor: "",
          gpa: "",
          extra: [""],
        },
      ];

  const [education, setEducation] = useState(initialEducation);

  useEffect(() => {
    localStorage.setItem("education", JSON.stringify(education));
  }, [education]);

  const handleChange = (index, e) => {
    const updatedEducation = [...education];
    updatedEducation[index][e.target.name] = e.target.value;
    setEducation(updatedEducation);
  };

  const handleExtraChange = (eduIndex, extraIndex, e) => {
    const updatedEducation = [...education];
    updatedEducation[eduIndex].extra[extraIndex] = e.target.value;
    setEducation(updatedEducation);
  };

  const addExtra = (eduIndex) => {
    const updatedEducation = [...education];
    updatedEducation[eduIndex].extra.push("");
    setEducation(updatedEducation);
  };

  const deleteExtra = (eduIndex, extraIndex) => {
    const updatedEducation = [...education];
    updatedEducation[eduIndex].extra = updatedEducation[eduIndex].extra.filter(
      (_, i) => i !== extraIndex
    );
    if (updatedEducation[eduIndex].extra.length === 0) {
      updatedEducation[eduIndex].extra.push("");
    }
    setEducation(updatedEducation);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        degree: "",
        institution: "",
        location: "",
        date: "",
        minor: "",
        gpa: "",
        extra: [""],
      },
    ]);
  };

  const deleteEducation = (index) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    if (updatedEducation.length === 0) {
      updatedEducation.push({
        degree: "",
        institution: "",
        location: "",
        date: "",
        minor: "",
        gpa: "",
        extra: [""],
      });
    }
    setEducation(updatedEducation);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("education", JSON.stringify(education));
    alert("Saved!");
  };

  return (
    <div>
      <Navbar activepath="/create/education" />
      <div style={{ display: "flex" }}>
        {education.length > 0 && education[0].degree !== "" ? (
          <div className="container">
            {education.map((edu, index) =>
              edu.degree.length !== 0 ? (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "1rem",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      height: "100%",
                    }}
                  >
                    {edu.degree}
                  </label>
                  <button
                    type="button"
                    className="button"
                    onClick={() => deleteEducation(index)}
                  >
                    Delete Education
                  </button>
                </div>
              ) : null
            )}
          </div>
        ) : (
          <></>
        )}
        <div className="container">
          <form onSubmit={handleSubmit} className="form">
            {education.map((edu, index) => (
              <div key={index}>
                <label htmlFor={`degree-${index}`} className="label">
                  Degree:
                </label>
                <input
                  type="text"
                  id={`degree-${index}`}
                  name="degree"
                  value={edu.degree}
                  onChange={(e) => handleChange(index, e)}
                  className="input"
                />

                <label htmlFor={`institution-${index}`} className="label">
                  Institution:
                </label>
                <input
                  type="text"
                  id={`institution-${index}`}
                  name="institution"
                  value={edu.institution}
                  onChange={(e) => handleChange(index, e)}
                  className="input"
                />

                <label htmlFor={`location-${index}`} className="label">
                  Location:
                </label>
                <input
                  type="text"
                  id={`location-${index}`}
                  name="location"
                  value={edu.location}
                  onChange={(e) => handleChange(index, e)}
                  className="input"
                />
                <label htmlFor={`date-${index}`} className="label">
                  When:
                </label>
                <input
                  type="text"
                  id={`date-${index}`}
                  name="date"
                  value={edu.date}
                  onChange={(e) => handleChange(index, e)}
                  className="input"
                />
                <label htmlFor={`minor-${index}`} className="label">
                  Minor:
                </label>
                <input
                  type="text"
                  id={`minor-${index}`}
                  name="minor"
                  value={edu.minor}
                  onChange={(e) => handleChange(index, e)}
                  className="input"
                />
                <label htmlFor={`gpa-${index}`} className="label">
                  GPA:
                </label>
                <input
                  type="text"
                  id={`gpa-${index}`}
                  name="gpa"
                  value={edu.gpa}
                  onChange={(e) => handleChange(index, e)}
                  className="input"
                />

                <label className="label">Additional Information:</label>
                {edu.extra.map((extra, extraIndex) => (
                  <div
                    key={extraIndex}
                    style={{
                      display: "flex",
                    }}
                  >
                    <input
                      name={`extra-${extraIndex}`}
                      value={extra}
                      onChange={(e) => handleExtraChange(index, extraIndex, e)}
                      className="input"
                      style={{ flex: 1, marginRight: "0.5rem" }}
                    />
                    <button
                      type="button"
                      className="button"
                      onClick={() => deleteExtra(index, extraIndex)}
                      style={{ height: "45px", marginTop: "8px" }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="button"
                  onClick={() => addExtra(index)}
                  style={{ marginLeft: 0, marginBottom: "3rem" }}
                >
                  Add Extra
                </button>
                <br />
              </div>
            ))}
            <div className="buttonContainer">
              <button type="button" onClick={addEducation} className="button">
                Add Education
              </button>
              <button type="submit" className="button">
                Save
              </button>
              <Link href="/create/certification">
                <button type="submit" className="button">
                  Next
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
