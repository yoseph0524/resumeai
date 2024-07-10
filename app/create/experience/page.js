"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../nav";

export default function Experience() {
  const storedExperience = localStorage.getItem("experience");
  const initialExperience = storedExperience
    ? JSON.parse(storedExperience).map((exp) => ({
        ...exp,
        description: Array.isArray(exp.description) ? exp.description : [""],
      }))
    : [
        {
          position: "",
          company: "",
          location: "",
          start_date: "",
          end_date: "",
          description: [""],
        },
      ];

  const [experience, setExperience] = useState(initialExperience);

  useEffect(() => {
    localStorage.setItem("experience", JSON.stringify(experience));
  }, [experience]);

  const handleChange = (index, e) => {
    const updatedExperience = [...experience];
    updatedExperience[index][e.target.name] = e.target.value;
    setExperience(updatedExperience);
  };

  const handleDescriptionChange = (expIndex, descIndex, e) => {
    const updatedExperience = [...experience];
    updatedExperience[expIndex].description[descIndex] = e.target.value;
    setExperience(updatedExperience);
  };

  const addDescription = (expIndex) => {
    const updatedExperience = [...experience];
    updatedExperience[expIndex].description.push("");
    setExperience(updatedExperience);
  };

  const deleteDescription = (expIndex, descIndex) => {
    const updatedExperience = [...experience];
    updatedExperience[expIndex].description = updatedExperience[
      expIndex
    ].description.filter((_, i) => i !== descIndex);
    if (updatedExperience[expIndex].description.length === 0) {
      updatedExperience[expIndex].description.push("");
    }
    setExperience(updatedExperience);
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        position: "",
        company: "",
        location: "",
        start_date: "",
        end_date: "",
        description: [""],
      },
    ]);
  };

  const deleteExperience = (index) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    if (updatedExperience.length === 0) {
      updatedExperience.push({
        position: "",
        company: "",
        location: "",
        start_date: "",
        end_date: "",
        description: [""],
      });
    }
    setExperience(updatedExperience);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(experience);
    localStorage.setItem("experience", JSON.stringify(experience));
    alert("Saved!");
  };

  return (
    <div>
      <Navbar activepath="/create/experience" />
      <div style={{ display: "flex" }}>
        {experience.length > 0 && experience[0].position !== "" ? (
          <div className="container">
            {experience.map((exp, index) =>
              exp.position.length !== 0 ? (
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
                    {exp.position}
                  </label>
                  <button
                    type="button"
                    className="button"
                    onClick={() => deleteExperience(index)}
                  >
                    Delete Experience
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
            {experience.map((exp, expIndex) => (
              <div key={expIndex}>
                <label htmlFor={`position-${expIndex}`} className="label">
                  Position:
                </label>
                <input
                  type="text"
                  id={`position-${expIndex}`}
                  name="position"
                  value={exp.position}
                  onChange={(e) => handleChange(expIndex, e)}
                  className="input"
                />

                <label htmlFor={`company-${expIndex}`} className="label">
                  Company:
                </label>
                <input
                  type="text"
                  id={`company-${expIndex}`}
                  name="company"
                  value={exp.company}
                  onChange={(e) => handleChange(expIndex, e)}
                  className="input"
                />
                <label htmlFor={`location-${expIndex}`} className="label">
                  Location:
                </label>
                <input
                  type="text"
                  id={`location-${expIndex}`}
                  name="location"
                  value={exp.location}
                  onChange={(e) => handleChange(expIndex, e)}
                  className="input"
                />

                <label htmlFor={`start_date-${expIndex}`} className="label">
                  Start Date:
                </label>
                <input
                  type="text"
                  id={`start_date-${expIndex}`}
                  name="start_date"
                  value={exp.start_date}
                  onChange={(e) => handleChange(expIndex, e)}
                  className="input"
                />
                <label htmlFor={`end_date-${expIndex}`} className="label">
                  End Date:
                </label>
                <input
                  type="text"
                  id={`end_date-${expIndex}`}
                  name="end_date"
                  value={exp.end_date}
                  onChange={(e) => handleChange(expIndex, e)}
                  className="input"
                />

                <label className="label">Description:</label>
                {exp.description.map((desc, descIndex) => (
                  <div
                    key={descIndex}
                    style={{
                      display: "flex",
                    }}
                  >
                    <input
                      name={`description-${descIndex}`}
                      value={desc}
                      onChange={(e) =>
                        handleDescriptionChange(expIndex, descIndex, e)
                      }
                      className="input"
                    ></input>
                    <button
                      type="button"
                      className="button"
                      onClick={() => deleteDescription(expIndex, descIndex)}
                      style={{ height: "45px", marginTop: "8px" }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="button"
                  onClick={() => addDescription(expIndex)}
                  style={{ marginLeft: 0, marginBottom: "3rem" }}
                >
                  Add Description
                </button>
                <br />
              </div>
            ))}
            <div className="buttonContainer">
              <button type="button" onClick={addExperience} className="button">
                Add Experience
              </button>
              <button type="submit" className="button">
                Save
              </button>
              <Link href="/create/project">
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
