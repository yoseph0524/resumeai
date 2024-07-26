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

export default function Project() {
  const [project, setProject] = useState([
    {
      title: "",
      organization: "",
      start_date: "",
      end_date: "",
      url: "",
      used: "",
      description: "",
      accomplishment: [""],
    },
  ]);
  const [loading, setLoading] = useState(true);
  const number = getNumber();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getData(number);
        if (data && data.project) {
          console.log(data.project);
          setProject(data.project);
        }
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleChange = (index, e) => {
    const updatedProject = [...project];
    updatedProject[index][e.target.name] = e.target.value;
    setProject(updatedProject);
  };

  const handleAccomplishmentChange = (projIndex, descIndex, e) => {
    const updatedProject = [...project];
    updatedProject[projIndex].accomplishment[descIndex] = e.target.value;
    setProject(updatedProject);
  };

  const addAccomplishment = (projIndex) => {
    const updatedProject = [...project];
    updatedProject[projIndex].accomplishment.push("");
    setProject(updatedProject);
  };

  const deleteAccomplishment = (projIndex, descIndex) => {
    const updatedProject = [...project];
    updatedProject[projIndex].accomplishment = updatedProject[
      projIndex
    ].accomplishment.filter((_, i) => i !== descIndex);
    if (updatedProject[projIndex].accomplishment.length === 0) {
      updatedProject[projIndex].accomplishment.push("");
    }
    setProject(updatedProject);
  };

  const addProject = () => {
    setProject([
      ...project,
      {
        title: "",
        organization: "",
        start_date: "",
        end_date: "",
        url: "",
        used: "",
        description: "",
        accomplishment: [""],
      },
    ]);
  };

  const deleteProject = (index) => {
    const updatedProject = project.filter((_, i) => i !== index);
    if (updatedProject.length === 0) {
      updatedProject.push({
        title: "",
        organization: "",
        start_date: "",
        end_date: "",
        url: "",
        used: "",
        description: "",
        accomplishment: [""],
      });
    }
    setProject(updatedProject);
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

          // Update the document with the project field
          await updateDoc(docRef, { project });
          alert("Saved!");
          console.log(project);
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

          // Update the document with the project field
          await updateDoc(docRef, { project });
          router.push(`/${number}/create/education`);
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
      <Navbar activepath="/create/project" />
      {loading ? (
        <div className="container">Loading...</div>
      ) : (
        <div style={{ display: "flex" }}>
          {project.length > 0 && project[0].title !== "" ? (
            <div className="container">
              {project.map((proj, index) =>
                proj.title.length !== 0 ? (
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
                      {proj.title}
                    </label>
                    <button
                      style={buttonStyle}
                      type="button"
                      className="button"
                      onClick={() => deleteProject(index)}
                    >
                      Delete Project
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
              {project.map((proj, index) => (
                <div key={index}>
                  <label htmlFor={`title-${index}`} className="label">
                    Title Of The Project:
                  </label>
                  <input
                    type="text"
                    id={`title-${index}`}
                    name="title"
                    value={proj.title}
                    onChange={(e) => handleChange(index, e)}
                    className="input"
                  />

                  <label htmlFor={`organization-${index}`} className="label">
                    Organization Of The Project:
                  </label>
                  <input
                    type="text"
                    id={`organization-${index}`}
                    name="organization"
                    value={proj.organization}
                    onChange={(e) => handleChange(index, e)}
                    className="input"
                  />

                  <label htmlFor={`start_date-${index}`} className="label">
                    Start Date:
                  </label>
                  <input
                    type="text"
                    id={`start_date-${index}`}
                    name="start_date"
                    value={proj.start_date}
                    onChange={(e) => handleChange(index, e)}
                    className="input"
                  />
                  <label htmlFor={`end_date-${index}`} className="label">
                    End Date:
                  </label>
                  <input
                    type="text"
                    id={`end_date-${index}`}
                    name="end_date"
                    value={proj.end_date}
                    onChange={(e) => handleChange(index, e)}
                    className="input"
                  />
                  <label htmlFor={`url-${index}`} className="label">
                    Url:
                  </label>
                  <input
                    type="text"
                    id={`url-${index}`}
                    name="url"
                    value={proj.url}
                    onChange={(e) => handleChange(index, e)}
                    className="input"
                  />
                  <label htmlFor={`description-${index}`} className="label">
                    Description:
                  </label>
                  <input
                    type="text"
                    id={`description-${index}`}
                    name="description"
                    value={proj.description}
                    onChange={(e) => handleChange(index, e)}
                    className="input"
                  />
                  <label htmlFor={`used-${index}`} className="label">
                    Used Technologies:
                  </label>
                  <input
                    type="text"
                    id={`used-${index}`}
                    name="used"
                    value={proj.used}
                    onChange={(e) => handleChange(index, e)}
                    className="input"
                  />

                  <label className="label">Accomplishment:</label>
                  {proj.accomplishment.map((desc, descIndex) => (
                    <div
                      key={descIndex}
                      style={{
                        display: "flex",
                      }}
                    >
                      <input
                        name={`accomplishment-${descIndex}`}
                        value={desc}
                        onChange={(e) =>
                          handleAccomplishmentChange(index, descIndex, e)
                        }
                        className="input"
                        style={{ flex: 1, marginRight: "0.5rem" }}
                      />
                      <button
                        style={{ ...buttonStyle, ...topStyle }}
                        type="button"
                        className="button"
                        onClick={() => deleteAccomplishment(index, descIndex)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <button
                    style={{ ...buttonStyle, ...marginStyle }}
                    type="button"
                    className="button"
                    onClick={() => addAccomplishment(index)}
                  >
                    Add accomplishment
                  </button>
                  <br />
                </div>
              ))}
              <div className="buttonContainer">
                <button
                  style={buttonStyle}
                  type="button"
                  onClick={addProject}
                  className="button"
                >
                  Add Project
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
