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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@chakra-ui/react";
export default function Skill() {
  const [skill, setSkill] = useState([
    {
      type: "",
      list: [""],
    },
  ]);
  const [loading, setLoading] = useState(true);
  const number = getNumber();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getData(number);
        if (data && data.skill) {
          console.log(data.skill);
          setSkill(data.skill);
        }
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleChange = (index, e) => {
    const updatedSkill = [...skill];
    updatedSkill[index][e.target.name] = e.target.value;
    setSkill(updatedSkill);
  };

  const handleListChange = (skillIndex, listIndex, e) => {
    const updatedSkill = [...skill];
    updatedSkill[skillIndex].list[listIndex] = e.target.value;
    setSkill(updatedSkill);
  };

  const addList = (skillIndex) => {
    const updatedSkill = [...skill];
    updatedSkill[skillIndex].list.push("");
    setSkill(updatedSkill);
  };

  const deleteList = (skillIndex, listIndex) => {
    const updatedSkill = [...skill];
    updatedSkill[skillIndex].list = updatedSkill[skillIndex].list.filter(
      (_, i) => i !== listIndex
    );
    if (updatedSkill[skillIndex].list.length === 0) {
      updatedSkill[skillIndex].list.push("");
    }
    setSkill(updatedSkill);
  };

  const addSkill = () => {
    setSkill([...skill, { type: "", list: [""] }]);
  };

  const deleteSkill = (index) => {
    const updatedSkill = skill.filter((_, i) => i !== index);
    if (updatedSkill.length === 0) {
      updatedSkill.push({
        type: "",
        list: [""],
      });
    }
    setSkill(updatedSkill);
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

          // Update the document with the skill field
          await updateDoc(docRef, { skill });
          alert("Saved!");
          console.log(skill);
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

          // Update the document with the skill field
          await updateDoc(docRef, { skill });
          router.push(`/${number}/create/summary`);
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
      <Navbar activepath="/create/skill" />
      {loading ? (
        <div className="container">Loading...</div>
      ) : (
        <div style={{ display: "flex" }}>
          {skill.length > 0 && skill[0].type !== "" ? (
            <div className="container">
              {skill.map((ski, index) =>
                ski.type.length !== 0 ? (
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
                      {ski.type}
                    </label>
                    <Tooltip label="Delete" fontSize="md">
                      <button
                        style={buttonStyle}
                        type="button"
                        className="button"
                        onClick={() => deleteSkill(index)}
                      >
                        <FontAwesomeIcon icon={faTrash} className="icon" />
                      </button>
                    </Tooltip>
                  </div>
                ) : null
              )}
            </div>
          ) : (
            <></>
          )}
          <div className="container2">
            <form onSubmit={handleSubmit} style={{ minWidth: "600px" }}>
              {skill.map((ski, index) => (
                <div key={index}>
                  <label htmlFor={`type-${index}`}>Type:</label>
                  <input
                    type="text"
                    id={`type-${index}`}
                    name="type"
                    value={ski.type}
                    onChange={(e) => handleChange(index, e)}
                  />

                  <label className="label">List:</label>
                  {ski.list.map((item, listIndex) => (
                    <div
                      key={listIndex}
                      style={{
                        display: "flex",
                      }}
                    >
                      <input
                        name={`list-${listIndex}`}
                        value={item}
                        onChange={(e) => handleListChange(index, listIndex, e)}
                        className="input"
                        style={{ flex: 1, marginRight: "0.5rem" }}
                      />
                      <Tooltip label="Delete" fontSize="md">
                        <button
                          style={{ ...buttonStyle, ...topStyle }}
                          type="button"
                          className="button"
                          onClick={() => deleteList(index, listIndex)}
                        >
                          <FontAwesomeIcon icon={faTrash} className="icon" />
                        </button>
                      </Tooltip>
                    </div>
                  ))}
                  <button
                    style={{ ...buttonStyle, ...marginStyle }}
                    type="button"
                    className="button"
                    onClick={() => addList(index)}
                  >
                    Add List Item
                  </button>
                  <br />
                </div>
              ))}
              <div className="buttonContainer">
                <button
                  style={buttonStyle}
                  type="button"
                  onClick={addSkill}
                  className="button"
                >
                  Add Skill
                </button>
                <button style={buttonStyle} type="submit" className="button">
                  Save
                </button>

                <button
                  style={buttonStyle}
                  type="click"
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
