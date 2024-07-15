"use client";
import { useEffect, useState } from "react";
import Navbar from "../nav";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import { db } from "@/app/firebase"; // Adjust the import based on your project structure
import { getNumber } from "../script";

export default function Review() {
  const [personalInfo, setPersonalInfo] = useState({});
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [project, setProject] = useState([]);
  const [certification, setCertification] = useState([]);
  const [coursework, setCoursework] = useState([]);
  const [skill, setSkill] = useState([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  const number = getNumber();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const collectionRef = collection(
            db,
            "users",
            user.uid,
            "resume_data"
          );
          const querySnapshot = await getDocs(collectionRef);

          const targetDoc = querySnapshot.docs[number];
          const docRef = doc(
            db,
            "users",
            user.uid,
            "resume_data",
            targetDoc.id
          );

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.personalInfo) setPersonalInfo(data.personalInfo);
            if (data.experience) setExperience(data.experience);
            if (data.education) setEducation(data.education);
            if (data.project) setProject(data.project);
            if (data.certification) setCertification(data.certification);
            if (data.coursework) setCoursework(data.coursework);
            if (data.skill) setSkill(data.skill);
            if (data.summary) setSummary(data.summary);
          }
        } catch (error) {
          console.error("Error fetching data from Firestore: ", error);
        }
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar activepath="/create/review" />{" "}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="container2">
          <Link href={`/${number}/create/download`}>
            <button type="submit">Generate Resume</button>
          </Link>
          <form>
            <h2>Personal Info</h2>
            <div>
              <p>Name: {personalInfo.name}</p>
              <p>Email: {personalInfo.email}</p>
              <p>Phone: {personalInfo.phone}</p>
              {personalInfo.url && <p>URL: {personalInfo.url}</p>}
              {personalInfo.website && <p>Website: {personalInfo.website}</p>}
            </div>

            <h2>Experience</h2>
            {experience.length > 0 && experience[0].position !== "" ? (
              experience.map((exp, index) => (
                <div key={index}>
                  <p>Position: {exp.position}</p>
                  <p>Company: {exp.company}</p>
                  <p>Location: {exp.location}</p>
                  <p>Start Date: {exp.start_date}</p>
                  <p>End Date: {exp.end_date}</p>
                  <div>
                    <p>Description:</p>
                    {exp.description.map((desc, descIndex) => (
                      <p
                        key={descIndex}
                        style={{ paddingLeft: "2em", textIndent: "-2em" }}
                      >
                        &bull; {desc}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No experience added</p>
            )}

            <h2>Project</h2>
            {project.length > 0 && project[0].title !== "" ? (
              project.map((proj, index) => (
                <div key={index}>
                  <p>Title: {proj.title}</p>
                  <p>Organization: {proj.organization}</p>
                  <p>Start Date: {proj.start_date}</p>
                  <p>End Date: {proj.end_date}</p>
                  <p>URL: {proj.url}</p>
                  <p>Description: {proj.description}</p>
                  <p>Used: {proj.used}</p>
                  <div>
                    <p>Accomplishment:</p>
                    {proj.accomplishment.map((desc, descIndex) => (
                      <p key={descIndex} style={{ textIndent: "2em" }}>
                        &bull; {desc}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No project added</p>
            )}

            <h2>Education</h2>
            {education.length > 0 && education[0].degree !== "" ? (
              education.map((edu, index) => (
                <div key={index}>
                  <p>Degree: {edu.degree}</p>
                  <p>Institution: {edu.institution}</p>
                  <p>Location: {edu.location}</p>
                  <p>When: {edu.date}</p>
                  <p>Minor: {edu.minor}</p>
                  <p>GPA: {edu.gpa}</p>
                  <div>
                    <p>Additional Information:</p>
                    {edu.extra.map((desc, descIndex) => (
                      <p key={descIndex} style={{ textIndent: "2em" }}>
                        &bull; {desc}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No Education added</p>
            )}

            <h2>Certification</h2>
            {certification.length > 0 && certification[0].name !== "" ? (
              certification.map((cert, index) => (
                <div key={index}>
                  <p>Name: {cert.name}</p>
                  <p>Institution: {cert.institution}</p>
                  <p>Date: {cert.date}</p>
                  <div>
                    <p>Relevant Information:</p>
                    {cert.relevant.map((desc, descIndex) => (
                      <p key={descIndex} style={{ textIndent: "2em" }}>
                        &bull; {desc}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No certification added</p>
            )}

            <h2>Coursework</h2>
            {coursework.length > 0 && coursework[0].title !== "" ? (
              coursework.map((course, index) => (
                <div key={index}>
                  <p>Name: {course.title}</p>
                  <p>Institution: {course.institution}</p>
                  <p>Date: {course.date}</p>
                  <p>Skill: {course.skill}</p>
                  <div>
                    <p>Description:</p>
                    {course.description.map((desc, descIndex) => (
                      <p key={descIndex} style={{ textIndent: "2em" }}>
                        &bull; {desc}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No coursework added</p>
            )}

            <h2>Skill</h2>
            {skill.length > 0 && skill[0].type !== "" ? (
              skill.map((ski, index) => (
                <div key={index}>
                  <p>Type: {ski.type}</p>
                  <div>
                    <p>List:</p>
                    {ski.list.map((desc, descIndex) => (
                      <p key={descIndex} style={{ textIndent: "2em" }}>
                        &bull; {desc}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No skill added</p>
            )}

            <h2>Summary</h2>
            <p>{summary || "No summary added"}</p>
          </form>
        </div>
      )}
    </div>
  );
}
