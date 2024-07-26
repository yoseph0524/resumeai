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

export default function Certification() {
  const [certification, setCertification] = useState([
    {
      name: "",
      institution: "",
      date: "",
      relevant: [""],
    },
  ]);
  const [loading, setLoading] = useState(true);

  const number = getNumber();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getData(number);
        if (data && data.certification) {
          console.log(data.certification);
          setCertification(data.certification);
        }
      }

      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleChange = (index, e) => {
    const updatedCertification = [...certification];
    updatedCertification[index][e.target.name] = e.target.value;
    setCertification(updatedCertification);
  };

  const handleRelevantChange = (certIndex, relevantIndex, e) => {
    const updatedCertification = [...certification];
    updatedCertification[certIndex].relevant[relevantIndex] = e.target.value;
    setCertification(updatedCertification);
  };

  const addRelevant = (certIndex) => {
    const updatedCertification = [...certification];
    updatedCertification[certIndex].relevant.push("");
    setCertification(updatedCertification);
  };

  const deleteRelevant = (certIndex, relevantIndex) => {
    const updatedCertification = [...certification];
    updatedCertification[certIndex].relevant = updatedCertification[
      certIndex
    ].relevant.filter((_, i) => i !== relevantIndex);
    if (updatedCertification[certIndex].relevant.length === 0) {
      updatedCertification[certIndex].relevant.push("");
    }
    setCertification(updatedCertification);
  };

  const addCertification = () => {
    setCertification([
      ...certification,
      { name: "", institution: "", date: "", relevant: [""] },
    ]);
  };

  const deleteCertification = (index) => {
    const updatedCertification = certification.filter((_, i) => i !== index);
    if (updatedCertification.length === 0) {
      updatedCertification.push({
        name: "",
        institution: "",
        date: "",
        relevant: [""],
      });
    }
    setCertification(updatedCertification);
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

          // Update the document with the certification field
          await updateDoc(docRef, { certification });
          alert("Saved!");
          console.log(certification);
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

          // Update the document with the certification field
          await updateDoc(docRef, { certification });
          router.push(`/${number}/create/coursework`);
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
      <Navbar activepath="/create/certification" />{" "}
      {loading ? (
        <div className="container">Loading...</div>
      ) : (
        <div style={{ display: "flex" }}>
          {certification.length > 0 && certification[0].name !== "" ? (
            <div className="container">
              {certification.map((cert, index) =>
                cert.name.length !== 0 ? (
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
                      {cert.name}
                    </label>
                    <button
                      style={buttonStyle}
                      type="button"
                      className="button"
                      onClick={() => deleteCertification(index)}
                    >
                      Delete Certification
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
              {certification.map((cert, index) => (
                <div key={index}>
                  <label htmlFor={`name-${index}`}>Certification Name:</label>
                  <input
                    type="text"
                    id={`name-${index}`}
                    name="name"
                    value={cert.name}
                    onChange={(e) => handleChange(index, e)}
                  />

                  <label htmlFor={`institution-${index}`}>Institution:</label>
                  <input
                    type="text"
                    id={`institution-${index}`}
                    name="institution"
                    value={cert.institution}
                    onChange={(e) => handleChange(index, e)}
                  />

                  <label htmlFor={`date-${index}`}>Date:</label>
                  <input
                    type="text"
                    id={`date-${index}`}
                    name="date"
                    value={cert.date}
                    onChange={(e) => handleChange(index, e)}
                  />

                  <label className="label">Relevant Information:</label>
                  {cert.relevant.map((relevant, relevantIndex) => (
                    <div
                      key={relevantIndex}
                      style={{
                        display: "flex",
                      }}
                    >
                      <input
                        name={`relevant-${relevantIndex}`}
                        value={relevant}
                        onChange={(e) =>
                          handleRelevantChange(index, relevantIndex, e)
                        }
                        className="input"
                        style={{ flex: 1, marginRight: "0.5rem" }}
                      />
                      <button
                        style={{ ...buttonStyle, ...topStyle }}
                        type="button"
                        className="button"
                        onClick={() => deleteRelevant(index, relevantIndex)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <button
                    style={{ ...buttonStyle, ...marginStyle }}
                    type="button"
                    className="button"
                    onClick={() => addRelevant(index)}
                  >
                    Add Relevant
                  </button>
                  <br />
                </div>
              ))}
              <div className="buttonContainer">
                <button
                  style={buttonStyle}
                  type="button"
                  onClick={addCertification}
                  className="button"
                >
                  Add Certification
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
