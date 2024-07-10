"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../nav";

export default function Coursework() {
  const storedCoursework = localStorage.getItem("coursework");
  const initialCoursework = storedCoursework
    ? JSON.parse(storedCoursework).map((course) => ({
        ...course,
        description: Array.isArray(course.description)
          ? course.description
          : [course.description],
      }))
    : [
        {
          title: "",
          institution: "",
          date: "",
          skill: "",
          description: [""],
        },
      ];

  const [coursework, setCoursework] = useState(initialCoursework);

  useEffect(() => {
    localStorage.setItem("coursework", JSON.stringify(coursework));
  }, [coursework]);

  const handleChange = (index, e) => {
    const updatedCoursework = [...coursework];
    updatedCoursework[index][e.target.name] = e.target.value;
    setCoursework(updatedCoursework);
  };

  const handleDescriptionChange = (courseIndex, descIndex, e) => {
    const updatedCoursework = [...coursework];
    updatedCoursework[courseIndex].description[descIndex] = e.target.value;
    setCoursework(updatedCoursework);
  };

  const addDescription = (courseIndex) => {
    const updatedCoursework = [...coursework];
    updatedCoursework[courseIndex].description.push("");
    setCoursework(updatedCoursework);
  };

  const deleteDescription = (courseIndex, descIndex) => {
    const updatedCoursework = [...coursework];
    updatedCoursework[courseIndex].description = updatedCoursework[
      courseIndex
    ].description.filter((_, i) => i !== descIndex);
    if (updatedCoursework[courseIndex].description.length === 0) {
      updatedCoursework[courseIndex].description.push("");
    }
    setCoursework(updatedCoursework);
  };

  const addCourse = () => {
    setCoursework([
      ...coursework,
      { title: "", institution: "", date: "", skill: "", description: [""] },
    ]);
  };

  const deleteCoursework = (index) => {
    const updatedCoursework = coursework.filter((_, i) => i !== index);
    if (updatedCoursework.length === 0) {
      updatedCoursework.push({
        title: "",
        institution: "",
        date: "",
        skill: "",
        description: [""],
      });
    }
    setCoursework(updatedCoursework);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("coursework", JSON.stringify(coursework));
    alert("Saved!");
    console.log(coursework);
  };

  return (
    <div>
      <Navbar activepath="/create/coursework" />
      <div style={{ display: "flex" }}>
        {coursework.length > 0 && coursework[0].title !== "" ? (
          <div className="container">
            {coursework.map((course, index) =>
              course.title.length !== 0 ? (
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
                    {course.title}
                  </label>
                  <button
                    type="button"
                    className="button"
                    onClick={() => deleteCoursework(index)}
                  >
                    Delete Coursework
                  </button>
                </div>
              ) : null
            )}
          </div>
        ) : (
          <></>
        )}
        <div className="container">
          <form onSubmit={handleSubmit}>
            {coursework.map((course, index) => (
              <div key={index}>
                <label htmlFor={`title-${index}`}>Course Title:</label>
                <input
                  type="text"
                  id={`title-${index}`}
                  name="title"
                  value={course.title}
                  onChange={(e) => handleChange(index, e)}
                />
                <label htmlFor={`institution-${index}`}>Institution:</label>
                <input
                  type="text"
                  id={`institution-${index}`}
                  name="institution"
                  value={course.institution}
                  onChange={(e) => handleChange(index, e)}
                />
                <label htmlFor={`date-${index}`}>Date:</label>
                <input
                  type="text"
                  id={`date-${index}`}
                  name="date"
                  value={course.date}
                  onChange={(e) => handleChange(index, e)}
                />
                <label htmlFor={`skill-${index}`}>Skill:</label>
                <input
                  type="text"
                  id={`skill-${index}`}
                  name="skill"
                  value={course.skill}
                  onChange={(e) => handleChange(index, e)}
                />

                <label className="label">Course Description:</label>
                {course.description.map((desc, descIndex) => (
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
                        handleDescriptionChange(index, descIndex, e)
                      }
                      className="input"
                      style={{ flex: 1, marginRight: "0.5rem" }}
                    />
                    <button
                      type="button"
                      className="button"
                      onClick={() => deleteDescription(index, descIndex)}
                      style={{ height: "45px", marginTop: "8px" }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="button"
                  onClick={() => addDescription(index)}
                  style={{ marginLeft: 0, marginBottom: "3rem" }}
                >
                  Add Description
                </button>
                <br />
              </div>
            ))}
            <div className="buttonContainer">
              <button type="button" onClick={addCourse} className="button">
                Add Course
              </button>
              <button type="submit" className="button">
                Save
              </button>
              <Link href="/create/skill">
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
