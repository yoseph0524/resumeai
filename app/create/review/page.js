"use client";
import { useEffect, useState } from "react";
import Navbar from "../nav";
import Link from "next/link";

export default function Review() {
  const [personalInfo, setPersonalInfo] = useState({});
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [project, setProject] = useState([]);
  const [certification, setCertification] = useState([]);
  const [coursework, setCoursework] = useState([]);
  const [skill, setSkill] = useState([]);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const storedPersonalInfo = localStorage.getItem("personalInfo");
    const storedExperience = localStorage.getItem("experience");
    const storedEducation = localStorage.getItem("education");
    const storedproject = localStorage.getItem("project");
    const storedCertification = localStorage.getItem("certification");
    const storedCoursework = localStorage.getItem("coursework");
    const storedSkill = localStorage.getItem("skill");
    const storedSummary = localStorage.getItem("summary");

    if (storedPersonalInfo) setPersonalInfo(JSON.parse(storedPersonalInfo));
    if (storedExperience) setExperience(JSON.parse(storedExperience));
    if (storedEducation) setEducation(JSON.parse(storedEducation));
    if (storedproject) setProject(JSON.parse(storedproject));
    if (storedCertification) setCertification(JSON.parse(storedCertification));
    if (storedCoursework) setCoursework(JSON.parse(storedCoursework));
    if (storedSkill) setSkill(JSON.parse(storedSkill));
    if (storedSummary) setSummary(storedSummary);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle final resume generation logic here
    console.log({
      personalInfo,
      experience,
      education,
      project,
      certification,
      coursework,
      skill,
      summary,
    });
  };

  return (
    <div>
      <Navbar activepath="/create/review" />
      <div className="container">
        <Link href="/create/download">
          <button type="submit">Generate Resume</button>
        </Link>
        <form onSubmit={handleSubmit}>
          <h2>Personal Info</h2>
          <div>
            <p>Name: {personalInfo.name}</p>
            <p>Email: {personalInfo.email}</p>
            <p>Phone: {personalInfo.phone}</p>
            {personalInfo.url !== "" ? <p>URL: {personalInfo.url}</p> : <></>}
            {personalInfo.website !== "" ? (
              <p>Website: {personalInfo.website}</p>
            ) : (
              <></>
            )}
          </div>

          <h2>Experience</h2>
          {experience.length > 0 && experience[0].position !== "" ? (
            experience.map((exp, index) =>
              exp.position === "" ? null : (
                <div key={index}>
                  <p>Position: {exp.position}</p>
                  <p>Company: {exp.company}</p>
                  <p>Location: {exp.location}</p>
                  <p>Start Date: {exp.start_date}</p>
                  <p>End Date: {exp.end_date}</p>
                  <div>
                    <p>Description:</p>
                    {exp.description.map((desc, descIndex) =>
                      desc === "" ? null : (
                        <p
                          key={descIndex}
                          style={{ paddingLeft: "2em", textIndent: "-2em" }}
                        >
                          &bull; {desc}
                        </p>
                      )
                    )}
                  </div>
                </div>
              )
            )
          ) : (
            <p>No experience added</p>
          )}

          <h2>Project</h2>
          {project.length > 0 && project[0].title !== "" ? (
            project.map((project, index) =>
              project.title === "" ? null : (
                <div key={index}>
                  <p>Title: {project.title}</p>
                  <p>Organization: {project.organization}</p>
                  <p>Start Date: {project.start_date}</p>
                  <p>End Date: {project.end_date}</p>
                  <p>URL: {project.url}</p>
                  <div>
                    <p>Description:</p>
                    {project.description.map((desc, descIndex) =>
                      desc === "" ? null : (
                        <p key={descIndex} style={{ textIndent: "2em" }}>
                          &bull; {desc}
                        </p>
                      )
                    )}
                  </div>
                </div>
              )
            )
          ) : (
            <p>No project added</p>
          )}

          <h2>Education</h2>
          {education.length > 0 && education[0].degree !== "" ? (
            education.map((edu, index) =>
              edu.degree === "" ? null : (
                <div key={index}>
                  <p>Degree: {edu.degree}</p>
                  <p>Institution: {edu.institution}</p>
                  <p>Location: {edu.location}</p>
                  <p>When: {edu.date}</p>
                  <p>Minor: {edu.minor}</p>
                  <p>GPA: {edu.url}</p>
                  <div>
                    <p>Additional Information:</p>
                    {edu.extra.map((desc, descIndex) =>
                      desc === "" ? null : (
                        <p key={descIndex} style={{ textIndent: "2em" }}>
                          &bull; {desc}
                        </p>
                      )
                    )}
                  </div>
                </div>
              )
            )
          ) : (
            <p>No Education added</p>
          )}

          <h2>Certification</h2>
          {certification.length > 0 && certification[0].name !== "" ? (
            certification.map((cert, index) =>
              cert.name === "" ? null : (
                <div key={index}>
                  <p>Name: {cert.name}</p>
                  <p>Institution: {cert.institution}</p>
                  <p>Date: {cert.date}</p>
                  <div>
                    <p>Relevant Information:</p>
                    {cert.relevant.map((desc, descIndex) =>
                      desc === "" ? null : (
                        <p key={descIndex} style={{ textIndent: "2em" }}>
                          &bull; {desc}
                        </p>
                      )
                    )}
                  </div>
                </div>
              )
            )
          ) : (
            <p>No certification added</p>
          )}

          <h2>Coursework</h2>
          {coursework.length > 0 && coursework[0].title !== "" ? (
            coursework.map((course, index) =>
              course.title === "" ? null : (
                <div key={index}>
                  <p>Name: {course.title}</p>
                  <p>Institution: {course.institution}</p>
                  <p>Date: {course.date}</p>
                  <p>Skill: {course.skill}</p>
                  <div>
                    <p>Description:</p>
                    {course.description.map((desc, descIndex) =>
                      desc === "" ? null : (
                        <p key={descIndex} style={{ textIndent: "2em" }}>
                          &bull; {desc}
                        </p>
                      )
                    )}
                  </div>
                </div>
              )
            )
          ) : (
            <p>No coursework added</p>
          )}
          <h2>Skill</h2>
          {skill.length > 0 && skill[0].type !== "" ? (
            skill.map((ski, index) =>
              ski.type === "" ? null : (
                <div key={index}>
                  <p>Type: {ski.type}</p>
                  <div>
                    <p>List:</p>
                    {ski.list.map((desc, descIndex) =>
                      desc === "" ? null : (
                        <p key={descIndex} style={{ textIndent: "2em" }}>
                          &bull; {desc}
                        </p>
                      )
                    )}
                  </div>
                </div>
              )
            )
          ) : (
            <p>No coursework added</p>
          )}
          <h2>Summary</h2>
          <p>{summary || "No summary added"}</p>
        </form>
      </div>
    </div>
  );
}
