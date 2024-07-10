"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../nav";

export default function Skill() {
  const storedSkill = localStorage.getItem("skill");
  const initialSkill = storedSkill
    ? JSON.parse(storedSkill).map((ski) => ({
        ...ski,
        list: Array.isArray(ski.list) ? ski.list : [ski.list],
      }))
    : [
        {
          type: "",
          list: [""],
        },
      ];

  const [skill, setSkill] = useState(initialSkill);

  useEffect(() => {
    localStorage.setItem("skill", JSON.stringify(skill));
  }, [skill]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("skill", JSON.stringify(skill));
    alert("Saved!");
    console.log(skill);
  };

  return (
    <div>
      <Navbar activepath="/create/skill" />
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
                  <button
                    type="button"
                    className="button"
                    onClick={() => deleteSkill(index)}
                  >
                    Delete Skill
                  </button>
                </div>
              ) : null
            )}
          </div>
        ) : (
          <></>
        )}
        <div className="container">
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
                    <button
                      type="button"
                      className="button"
                      onClick={() => deleteList(index, listIndex)}
                      style={{ height: "45px", marginTop: "8px" }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="button"
                  onClick={() => addList(index)}
                  style={{ marginLeft: 0, marginBottom: "3rem" }}
                >
                  Add List Item
                </button>
                <br />
              </div>
            ))}
            <div className="buttonContainer">
              <button type="button" onClick={addSkill} className="button">
                Add Skill
              </button>
              <button type="submit" className="button">
                Save
              </button>
              <Link href="/create/summary">
                <button
                  type="submit"
                  className="button"
                  onClick={() => console.log(skill)}
                >
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
