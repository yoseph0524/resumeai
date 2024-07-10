"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../nav";

export default function Project() {
  const storedProject = localStorage.getItem("project");
  const initialProject = storedProject
    ? JSON.parse(storedProject).map((proj) => ({
        ...proj,
        description: Array.isArray(proj.description)
          ? proj.description
          : [proj.description],
      }))
    : [
        {
          title: "",
          organization: "",
          start_date: "",
          end_date: "",
          url: "",
          description: [""],
        },
      ];

  const [project, setProject] = useState(initialProject);

  useEffect(() => {
    localStorage.setItem("project", JSON.stringify(project));
  }, [project]);

  const handleChange = (index, e) => {
    const updatedProject = [...project];
    updatedProject[index][e.target.name] = e.target.value;
    setProject(updatedProject);
  };

  const handleDescriptionChange = (projIndex, descIndex, e) => {
    const updatedProject = [...project];
    updatedProject[projIndex].description[descIndex] = e.target.value;
    setProject(updatedProject);
  };

  const addDescription = (projIndex) => {
    const updatedProject = [...project];
    updatedProject[projIndex].description.push("");
    setProject(updatedProject);
  };

  const deleteDescription = (projIndex, descIndex) => {
    const updatedProject = [...project];
    updatedProject[projIndex].description = updatedProject[
      projIndex
    ].description.filter((_, i) => i !== descIndex);
    if (updatedProject[projIndex].description.length === 0) {
      updatedProject[projIndex].description.push("");
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
        description: [""],
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
        description: [""],
      });
    }
    setProject(updatedProject);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("project", JSON.stringify(project));
    alert("Saved!");
  };

  return (
    <div>
      <Navbar activepath="/create/project" />
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
        <div className="container">
          <form onSubmit={handleSubmit} className="form">
            {project.map((proj, index) => (
              <div key={index}>
                <label htmlFor={`title-${index}`} className="label">
                  Title:
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
                  Organization:
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
                <label className="label">Description:</label>
                {proj.description.map((desc, descIndex) => (
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
              <button type="button" onClick={addProject} className="button">
                Add Project
              </button>
              <button type="submit" className="button">
                Save
              </button>
              <Link href="/create/education">
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
