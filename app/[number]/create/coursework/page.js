"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../nav";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  updateDoc,
  doc,
  collection,
  query,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "@/app/firebase"; // Adjust the import based on your project structure
import getData, { getNumber } from "../script";
import { buttonStyle, marginStyle, topStyle } from "../component";

export default function Coursework() {
  const [coursework, setCoursework] = useState([
    {
      title: "",
      institution: "",
      date: "",
      skill: "",
      description: [""],
    },
  ]);
  const [loading, setLoading] = useState(true);

  const number = getNumber();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getData(number);
        if (data && data.coursework) {
          console.log(data.coursework);
          setCoursework(data.coursework);
        }
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        // Query to get the first document in the resume_data collection
        const collectionRef = collection(db, "users", user.uid, "resume_data");
        const querySnapshot = await getDocs(collectionRef);
        if (!querySnapshot.empty) {
          const docRef = doc(collectionRef, number);

          // Update the document with the coursework field
          await updateDoc(docRef, { coursework });
          alert("Saved!");
          console.log(coursework);
        } else {
          alert("No resume data found to update.");
        }
      } catch (error) {
        console.error("Error updating document: ", error);
        alert("Failed to update data.");
      }
    } else {
      alert("No user is signed in.");
    }
  };

  return (
    <div>
      <Navbar activepath="/create/coursework" />{" "}
      {loading ? (
        <div className="container">Loading...</div>
      ) : (
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
                      style={buttonStyle}
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
          <div className="container2">
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
                        style={{ ...buttonStyle, ...topStyle }}
                        type="button"
                        className="button"
                        onClick={() => deleteDescription(index, descIndex)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <button
                    style={{ ...buttonStyle, ...marginStyle }}
                    type="button"
                    className="button"
                    onClick={() => addDescription(index)}
                  >
                    Add Description
                  </button>
                  <br />
                </div>
              ))}
              <div className="buttonContainer">
                <button
                  style={buttonStyle}
                  type="button"
                  onClick={addCourse}
                  className="button"
                >
                  Add Course
                </button>
                <button style={buttonStyle} type="submit" className="button">
                  Save
                </button>
                <Link href={`/${number}/create/skill`}>
                  <button style={buttonStyle} type="submit" className="button">
                    Next
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 
import { buttonStyle, marginStyle, topStyle } from "../component";

style={{ ...buttonStyle, ...topStyle }}
style={{ ...buttonStyle, ...marginStyle }}
style={buttonStyle}
 */
