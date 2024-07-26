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

export default function Experience() {
  const [experience, setExperience] = useState([
    {
      position: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
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
        if (data && data.experience) {
          console.log(data.experience);
          setExperience(data.experience);
        }
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

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

          // Update the document with the experience field
          await updateDoc(docRef, { experience });
          alert("Saved!");
          console.log(experience);
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

          // Update the document with the experience field
          await updateDoc(docRef, { experience });
          router.push(`/${number}/create/project`);
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
      <Navbar activepath="/create/experience" />
      {loading ? (
        <div className="container">Loading...</div>
      ) : (
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
                      style={buttonStyle}
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

          <div className="container2">
            <form onSubmit={handleSubmit} className="form">
              {experience.map((exp, expIndex) => (
                <div key={expIndex}>
                  <label htmlFor={`position-${expIndex}`} className="label">
                    Your Role At The Company:
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
                    Your Company Name:
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
                    Location Of The Company:
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
                        style={{ ...buttonStyle, ...topStyle }}
                        type="button"
                        className="button"
                        onClick={() => deleteDescription(expIndex, descIndex)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <button
                    style={{ ...buttonStyle, ...marginStyle }}
                    type="button"
                    className="button"
                    onClick={() => addDescription(expIndex)}
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
                  onClick={addExperience}
                  className="button"
                >
                  Add Experience
                </button>
                <button style={buttonStyle} type="submit" className="button">
                  Save
                </button>
                <button
                  style={buttonStyle}
                  type="button"
                  className="button"
                  onClick={handleClick}
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
