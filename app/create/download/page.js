"use client";
import { useEffect, useState } from "react";
import Navbar from "../nav";
import { CreateResume, Downloadpdf } from "./script";

export default function Download() {
  const [personalInfo, setPersonalInfo] = useState({});
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [project, setProject] = useState([]);
  const [certification, setCertification] = useState([]);
  const [coursework, setCoursework] = useState([]);
  const [skill, setSkill] = useState([]);
  const [summary, setSummary] = useState("");
  const [finalJson, setFinalJson] = useState({});

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

  const createFinalJson = (
    personalInfo,
    experience,
    education,
    project,
    certification,
    coursework,
    skill,
    summary
  ) => {
    return {
      personalInfo,
      experience,
      education,
      project,
      certification,
      coursework,
      skill,
      summary,
    };
  };

  useEffect(() => {
    const finalData = createFinalJson(
      personalInfo,
      experience,
      education,
      project,
      certification,
      coursework,
      skill,
      summary
    );
    setFinalJson(finalData);
  }, [
    personalInfo,
    experience,
    education,
    project,
    certification,
    coursework,
    skill,
    summary,
  ]);
  console.log(finalJson);

  return (
    <div>
      {" "}
      <Navbar activepath="/create/download" />
      <div>
        <div className="message">
          If the resume is cut off, it indicates that you have included more
          information than necessary. Please go back and condense the content.
        </div>
        <br />
        <CreateResume resumeData={finalJson} />
      </div>
    </div>
  );
}
