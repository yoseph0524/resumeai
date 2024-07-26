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
import { useRouter } from "next/navigation";

export default function Education() {
  const [education, setEducation] = useState([
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
  const [loading, setLoading] = useState(true);

  const number = getNumber();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getData(number);
        if (data && data.education) {
          console.log(data.education);
          setEducation(data.education);
        }
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

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

          // Update the document with the education field
          await updateDoc(docRef, { education });
          alert("Saved!");
          console.log(education);
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
  const router = useRouter();
  const handleClick = async (e) => {
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

          // Update the document with the education field
          await updateDoc(docRef, { education });
          router.push(`/${number}/create/certification`);
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
      <Navbar activepath="/create/education" />{" "}
      {loading ? (
        <div className="container">Loading...</div>
      ) : (
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
                      style={buttonStyle}
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
          <div className="container2">
            <form onSubmit={handleSubmit} className="form">
              {education.map((edu, index) => (
                <div key={index}>
                  <label htmlFor={`degree-${index}`} className="label">
                    Degree Or Qualification Or Major:
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
                    Location Of The Institution:
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
                    When Did You Earn Your Degree/Qualification:
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
                        onChange={(e) =>
                          handleExtraChange(index, extraIndex, e)
                        }
                        className="input"
                        style={{ flex: 1, marginRight: "0.5rem" }}
                      />
                      <button
                        style={{ ...buttonStyle, ...topStyle }}
                        type="button"
                        className="button"
                        onClick={() => deleteExtra(index, extraIndex)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <button
                    style={{ ...buttonStyle, ...marginStyle }}
                    type="button"
                    className="button"
                    onClick={() => addExtra(index)}
                  >
                    Add Extra
                  </button>
                  <br />
                </div>
              ))}
              <div className="buttonContainer">
                <button
                  style={buttonStyle}
                  type="button"
                  onClick={addEducation}
                  className="button"
                >
                  Add Education
                </button>
                <button style={buttonStyle} type="submit" className="button">
                  Save
                </button>

                <button
                  style={buttonStyle}
                  type="button"
                  onClick={handleClick}
                  className="button"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
